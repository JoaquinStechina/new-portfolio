import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Contact from "@/components/Contact/Contact";

vi.mock("@emailjs/browser", () => ({
  default: {
    send: vi.fn(),
  },
}));

import emailjs from "@emailjs/browser";

describe("Contact", () => {
  beforeEach(() => {
    vi.mocked(emailjs.send).mockReset();
  });

  it("renderiza el título y la descripción", () => {
    render(<Contact />);
    expect(screen.getByRole("heading", { name: /my contact/i })).toBeInTheDocument();
    expect(screen.getByText(/do you have a project in mind/i)).toBeInTheDocument();
  });

  it("renderiza los enlaces de contacto (email y whatsapp)", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: /joaquinstechina12@gmail.com/i })).toHaveAttribute(
      "href",
      "mailto:joaquinstechina12@gmail.com"
    );
    expect(screen.getByRole("link", { name: /\+54 9 3482-204125/i })).toHaveAttribute(
      "href",
      "https://wa.me/+543482204125"
    );
  });

  it("renderiza el formulario con nombre, email, mensaje y botón enviar", () => {
    render(<Contact />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
  });

  it("actualiza los campos al escribir", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByPlaceholderText(/your name here/i), "Ana");
    await user.type(screen.getByPlaceholderText(/your email@here.com/i), "ana@test.com");
    await user.type(screen.getByPlaceholderText(/how can i help you/i), "Hola");

    expect(screen.getByDisplayValue("Ana")).toBeInTheDocument();
    expect(screen.getByDisplayValue("ana@test.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Hola")).toBeInTheDocument();
  });

  it("muestra error al enviar con campos vacíos", async () => {
    render(<Contact />);
    const form = screen.getByRole("button", { name: /send message/i }).closest("form");
    expect(form).toBeInTheDocument();
    fireEvent.submit(form!);

    await waitFor(() => {
      expect(screen.getByText(/por favor completa todos los campos/i)).toBeInTheDocument();
    });
    expect(emailjs.send).not.toHaveBeenCalled();
  });

  it("envía el formulario y muestra éxito cuando EmailJS responde bien", async () => {
    vi.mocked(emailjs.send).mockResolvedValue({ status: 200, text: "OK" } as never);
    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByPlaceholderText(/your name here/i), "Ana");
    await user.type(screen.getByPlaceholderText(/your email@here.com/i), "ana@test.com");
    await user.type(screen.getByPlaceholderText(/how can i help you/i), "Hola");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument();
    });

    expect(emailjs.send).toHaveBeenCalled();
    expect(screen.getByPlaceholderText(/your name here/i)).toHaveValue("");
    expect(screen.getByPlaceholderText(/your email@here.com/i)).toHaveValue("");
    expect(screen.getByPlaceholderText(/how can i help you/i)).toHaveValue("");
  });

  it("muestra error cuando el envío falla", async () => {
    vi.mocked(emailjs.send).mockRejectedValue(new Error("Service error"));
    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByPlaceholderText(/your name here/i), "Ana");
    await user.type(screen.getByPlaceholderText(/your email@here.com/i), "ana@test.com");
    await user.type(screen.getByPlaceholderText(/how can i help you/i), "Hola");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/there was an error sending the message/i)).toBeInTheDocument();
    });
  });

  it("muestra mensaje de error de conexión cuando falla por Network Error", async () => {
    vi.mocked(emailjs.send).mockRejectedValue(new Error("Network Error"));
    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByPlaceholderText(/your name here/i), "Ana");
    await user.type(screen.getByPlaceholderText(/your email@here.com/i), "ana@test.com");
    await user.type(screen.getByPlaceholderText(/how can i help you/i), "Hola");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/connection error. check your internet network/i)).toBeInTheDocument();
    });
  });

  it("deshabilita el botón y muestra Sending... mientras se envía", async () => {
    let resolveSend: () => void;
    vi.mocked(emailjs.send).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveSend = () => resolve({ status: 200, text: "OK" } as never);
        })
    );
    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByPlaceholderText(/your name here/i), "Ana");
    await user.type(screen.getByPlaceholderText(/your email@here.com/i), "ana@test.com");
    await user.type(screen.getByPlaceholderText(/how can i help you/i), "Hola");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(screen.getByRole("button", { name: /sending/i })).toBeDisabled();
    resolveSend!();
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
    });
  });
});
