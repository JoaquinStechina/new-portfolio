# Performance Analysis — new-portfolio

## 🔴 Alta Prioridad

---

### 1. Uso innecesario de `"use client"` en `Projects.tsx`, `Experiences.tsx` y `Skills.tsx`

**Problema:**
Estos tres componentes están marcados como Client Components cuando no lo necesitan. El patrón `useReducer + useEffect + dynamic import` para cargar JSON local fuerza JavaScript del lado del cliente, genera un spinner de carga innecesario y retrasa la visualización del contenido.

```ts
// ❌ Actualmente — carga el JSON en el cliente después del mount
useEffect(() => {
  import("./projects.json").then((data) => {
    dispatch({ type: "FETCH_SUCCESS", payload: data.default || data });
  });
}, []);
```

**Solución:**
Convertirlos a Server Components importando el JSON directamente. El JSON es estático, no cambia en runtime, y Next.js lo incluye en el bundle del servidor.

```ts
// ✅ Server Component — sin "use client", sin useEffect, sin spinner
import projectsData from "./projects.json";

const Projects = () => {
  return (
    <div id="projects" className="...">
      <h1 className="text-4xl mb-8">My Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};
```

**Archivos afectados:**
- `components/Projects/Projects.tsx`
- `components/Experiences/Experiences.tsx`
- `components/Skills/Skills.tsx`

**Beneficios:**
- Elimina los spinners de carga visibles al usuario
- Reduce el JavaScript enviado al cliente
- El contenido se renderiza en el servidor y llega listo al navegador
- Se pueden eliminar los archivos `ProjectsReducer.ts` y `ExperiencesReducer.ts`

---

### 2. Animación de `MainTitle` de 7.5 segundos

**Problema:**
La animación de fade-in del hero dura 7.5 segundos, lo cual es excesivamente largo. El usuario percibe la página como lenta o rota durante ese tiempo.

```css
/* ❌ Actualmente — components/MainTitle/MainTitle.css */
.animate-fade-in {
  animation: fade-in 7.5s ease forwards;
}
```

**Solución:**
Reducir la duración a 1–1.5 segundos. El efecto visual es el mismo pero la percepción de carga mejora drásticamente.

```css
/* ✅ Recomendado */
.animate-fade-in {
  animation: fade-in 1s ease forwards;
}
```

**Archivo afectado:** `components/MainTitle/MainTitle.css:8`

---

## 🟡 Prioridad Media

---

### 3. `getIconStyle` en `SideBar.tsx` — estilos inline en cada render

**Problema:**
La función `getIconStyle` se llama 3 veces por render y genera objetos de estilos inline. Los estilos inline no se benefician de la caché de CSS del navegador y fuerzan al motor de layout a recalcular estilos en cada interacción.

```ts
// ❌ Actualmente — components/SideBar/SideBar.tsx
const getIconStyle = (iconName: string) => {
  const isHovered = hoveredIcon === iconName;
  const otherHovered = hoveredIcon && hoveredIcon !== iconName;
  return {
    transform: isHovered ? "scale(1)" : otherHovered ? "scale(0.75)" : "scale(1)",
    opacity: isHovered ? 1 : otherHovered ? 0.5 : 1,
    transition: "all 400ms",
  };
};
```

**Solución:**
Reemplazar con clases de Tailwind usando `data-*` attributes o la variante `group` para que el navegador maneje las transiciones vía CSS puro.

```tsx
// ✅ Recomendado — usando data attributes y Tailwind
<div
  className="max-lg:m-2 lg:m-4 transition-all duration-400 data-[other-hovered=true]:opacity-50 data-[other-hovered=true]:scale-75"
  data-other-hovered={hoveredIcon !== null && hoveredIcon !== "instagram"}
  onMouseEnter={() => setHoveredIcon("instagram")}
  onMouseLeave={() => setHoveredIcon(null)}
>
```

**Archivo afectado:** `components/SideBar/SideBar.tsx:16-29`

---

### 4. Imágenes en `ProjectCard.tsx` — `alt` vacío y sin lazy loading explícito

**Problema:**
Las imágenes de los proyectos tienen `alt=""` (problema de accesibilidad y SEO) y no tienen `loading="lazy"` explícito. Además, `fill={false}` con `height` y `width` fijos no aplica `object-fit`, por lo que la imagen puede deformarse.

```tsx
// ❌ Actualmente — components/Projects/ProjectCard/ProjectCard.tsx
<Image
  src={project.imageLink || ""}
  fill={false}
  height={200}
  width={430}
  sizes="(max-width: 768px) 100vw, 50vw"
  className="h-[200px] pb-2"
  alt=""
/>
```

**Solución:**

```tsx
// ✅ Recomendado
<Image
  src={project.imageLink}
  height={200}
  width={430}
  sizes="(max-width: 768px) 100vw, 50vw"
  className="h-[200px] w-full object-cover pb-2"
  alt={`Screenshot of ${project.name}`}
  loading="lazy"
/>
```

**Archivo afectado:** `components/Projects/ProjectCard/ProjectCard.tsx:23-31`

---

### 5. `next.config.ts` vacío — sin optimizaciones configuradas

**Problema:**
El archivo de configuración de Next.js está prácticamente vacío, dejando fuera optimizaciones importantes para el bundle size y el formato de imágenes.

```ts
// ❌ Actualmente — next.config.ts
const nextConfig: NextConfig = {
  /* config options here */
};
```

**Solución:**

```ts
// ✅ Recomendado
const nextConfig: NextConfig = {
  images: {
    // Sirve imágenes en formatos modernos y más livianos automáticamente
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Tree-shaking más agresivo para librerías grandes
    optimizePackageImports: ["motion", "lucide-react"],
  },
};
```

**Archivo afectado:** `next.config.ts`

**Beneficios:**
- `image/avif` y `image/webp` reducen el tamaño de imágenes hasta un 50% vs JPEG/PNG
- `optimizePackageImports` aplica barrel-import optimization a `motion` (Framer Motion), que es la dependencia más grande del proyecto

---

### 6. `techLogos` en `Skills.tsx` — JSX instanciado a nivel de módulo

**Problema:**
El array `techLogos` crea instancias de componentes JSX (`<NextJS color="white" />`, `<React />`, etc.) a nivel de módulo. Si `Skills` permanece como Client Component, React recreará estos elementos en cada render.

```ts
// ❌ Actualmente — components/Skills/Skills.tsx
const techLogos = [
  { node: <NextJS color="white" />, title: "Next.js", href: "..." },
  { node: <React />, title: "React", href: "..." },
  // ...
];
```

**Solución:**
Si `Skills` se convierte a Server Component (ver punto 1), esto deja de ser un problema. Si permanece como Client Component, usar `useMemo`:

```ts
// ✅ Como Server Component — simplemente funciona sin useMemo
// ✅ Como Client Component
const techLogos = useMemo(() => [
  { node: <NextJS color="white" />, title: "Next.js", href: "..." },
  // ...
], []);
```

**Archivo afectado:** `components/Skills/Skills.tsx:21-58`

---

## 🟢 Baja Prioridad

---

### 7. Font sin `display: "swap"` en `layout.tsx`

**Problema:**
La fuente local Outfit no tiene configurado `display`, lo que puede causar FOIT (Flash of Invisible Text) mientras la fuente carga.

```ts
// ❌ Actualmente — src/app/layout.tsx
const myFont = localFont({
  src: "./Outfit-VariableFont_wght.ttf",
  variable: "--font-outfit",
});
```

**Solución:**

```ts
// ✅ Recomendado
const myFont = localFont({
  src: "./Outfit-VariableFont_wght.ttf",
  variable: "--font-outfit",
  display: "swap", // muestra la fuente del sistema hasta que cargue la custom
});
```

**Archivo afectado:** `src/app/layout.tsx:7-10`

---

### 8. `SideBar.tsx` — `setTimeout` de 1 segundo artificial

**Problema:**
La sidebar aparece con 1 segundo de delay intencional. Durante ese tiempo el usuario ve la página sin navegación.

```ts
// ❌ Actualmente — components/SideBar/SideBar.tsx
useEffect(() => {
  const timer = setTimeout(() => {
    setIsLoaded(true);
  }, 1000);
  return () => clearTimeout(timer);
}, []);
```

**Solución:**
Reducir el delay a 200-300ms o eliminarlo y usar una animación CSS que se dispare automáticamente al montar el componente.

```ts
// ✅ Opción A — reducir el delay
const timer = setTimeout(() => setIsLoaded(true), 200);

// ✅ Opción B — eliminar el state y usar CSS animation-delay
// En el JSX: className="animate-slide-in" (con @keyframes en CSS)
```

**Archivo afectado:** `components/SideBar/SideBar.tsx:9-14`

---

### 9. Links externos sin `rel="noopener noreferrer"` en `SideBar.tsx`

**Problema:**
Los links de Instagram y GitHub usan `target="_blank"` pero no tienen `rel="noopener noreferrer"`. Solo el link de LinkedIn lo tiene. Sin `noopener`, la pestaña nueva puede acceder a `window.opener` del sitio original, lo que es una vulnerabilidad de seguridad y permite que la página destino consuma recursos del tab padre.

```tsx
// ❌ Actualmente — components/SideBar/SideBar.tsx (Instagram, línea 46)
<a
  href="https://www.instagram.com/joaquin_stechina"
  target="_blank"
  className="block"
>

// ❌ Actualmente — (GitHub, línea 60)
<a
  href="https://github.com/JoaquinStechina"
  target="_blank"
  className="block"
>

// ✅ LinkedIn ya lo tiene correctamente (línea 74)
<a
  href="https://www.linkedin.com/in/joaquinstechina/"
  target="_blank"
  rel="noopener noreferrer"
>
```

**Solución:**
Agregar `rel="noopener noreferrer"` a todos los links con `target="_blank"`.

**Archivo afectado:** `components/SideBar/SideBar.tsx:46-52, 60-66`

---

### 10. `evolucion-medica.png` pesa 292KB — 6x más que el resto de imágenes

**Problema:**
La imagen `evolucion-medica.png` pesa 292KB mientras que las demás imágenes del proyecto están entre 15KB y 56KB. Esto impacta directamente el LCP (Largest Contentful Paint) si esta imagen es visible en el viewport inicial.

```
compound-interest-rate.png:  38KB
evolucion-medica.png:       292KB  ❌ 6-8x más pesada
secret-friend.png:           56KB
stock-management-app.png:    28KB
old-portfolio.png:           15KB
```

**Solución:**
Re-comprimir la imagen o convertirla a WebP/AVIF manualmente para reducir su tamaño a ~40-60KB sin pérdida visual perceptible.

```bash
# Ejemplo con sharp-cli o squoosh
npx @squoosh/cli --webp '{"quality": 80}' public/ProjectImages/evolucion-medica.png
```

**Archivo afectado:** `public/ProjectImages/evolucion-medica.png`

---

### 11. Falta metadata de Open Graph y theme-color en `layout.tsx`

**Problema:**
El layout solo exporta `title` y `description` básicos. Faltan Open Graph tags (para compartir en redes sociales), `themeColor` (para el chrome del navegador móvil) y una descripción más completa. Esto no afecta la performance directamente pero sí el SEO y la percepción al compartir links.

```ts
// ❌ Actualmente — src/app/layout.tsx
export const metadata: Metadata = {
  title: "Portfolio - Joaquin Stechina",
  description: "Portfolio de Joaquin Stechina",
};
```

**Solución:**

```ts
// ✅ Recomendado
export const metadata: Metadata = {
  title: "Portfolio - Joaquin Stechina",
  description: "Full-Stack Developer — React, Next.js, Java, Spring Boot",
  openGraph: {
    title: "Joaquin Stechina — Portfolio",
    description: "Full-Stack Developer — React, Next.js, Java, Spring Boot",
    type: "website",
  },
};
```

**Archivo afectado:** `src/app/layout.tsx:12-15`

---

### 12. `console.error()` en código de producción — `Contact.tsx`

**Problema:**
El handler de error del formulario de contacto tiene un `console.error()` que se ejecuta en producción. Esto no es un problema grave, pero en producción los errores deberían loguearse vía un servicio de monitoreo o simplemente manejarse en el UI sin log en consola.

```ts
// ❌ Actualmente — components/Contact/Contact.tsx:110
console.error("Error al enviar el email:", error);
```

**Solución:**
Eliminar el `console.error()` ya que el error se muestra al usuario en el UI con `setStatus`.

**Archivo afectado:** `components/Contact/Contact.tsx:110`

---

## Resumen

| # | Problema | Impacto | Esfuerzo |
|---|---|---|---|
| 1 | Server Components en Projects/Experiences/Skills | 🔴 Alto | Medio |
| 2 | Animación MainTitle de 7.5s | 🔴 Alto | Muy bajo |
| 3 | `getIconStyle` → Tailwind CSS | 🟡 Medio | Bajo |
| 4 | `alt` vacío + `loading="lazy"` en imágenes | 🟡 Medio | Muy bajo |
| 5 | `next.config.ts` con optimizaciones | 🟡 Medio | Muy bajo |
| 6 | `techLogos` con `useMemo` o Server Component | 🟡 Medio | Bajo |
| 7 | Font `display: "swap"` | 🟢 Bajo | Muy bajo |
| 8 | `setTimeout` de 1s en SideBar | 🟢 Bajo | Muy bajo |
| 9 | Links sin `rel="noopener noreferrer"` en SideBar | 🟡 Medio | Muy bajo |
| 10 | `evolucion-medica.png` pesa 292KB (6x más que el resto) | 🟡 Medio | Bajo |
| 11 | Falta metadata Open Graph y theme-color | 🟢 Bajo | Bajo |
| 12 | `console.error()` en producción en Contact | 🟢 Bajo | Muy bajo |
