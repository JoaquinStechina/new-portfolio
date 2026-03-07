import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MainTitle from "@/components/MainTitle/MainTitle";

describe("MainTitle", () => {
  it("renderiza el contenedor principal con id main", () => {
    render(<MainTitle />);
    expect(document.getElementById("main")).toBeInTheDocument();
  });

  it("renderiza el título con el nombre correcto", () => {
    render(<MainTitle />);
    expect(
      screen.getByRole("heading", { name: "</ JOAQUÍN STECHINA >", level: 1 })
    ).toBeInTheDocument();
  });

  it("renderiza el subtítulo rotatorio con una de las opciones visibles", () => {
    render(<MainTitle />);
    const rotatingOptions = [
      "Full-Stack Developer",
      "Designer",
      "Gamer",
      "Full time human",
    ];
    const visible = rotatingOptions.some((text) =>
      screen.queryByText(text) !== null
    );
    expect(visible).toBe(true);
  });

  it("aplica la clase de animación al contenedor", () => {
    render(<MainTitle />);
    const main = document.getElementById("main");
    expect(main).toHaveClass("animate-fade-in");
  });
});
