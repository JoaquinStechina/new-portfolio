import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renderiza con el texto pasado", () => {
    render(<Button>Enviar</Button>);
    expect(screen.getByRole("button", { name: /enviar/i })).toBeInTheDocument();
  });

  it("ejecuta onClick al hacer clic", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole("button", { name: /click me/i }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("aplica data-variant y data-size según props", () => {
    render(
      <Button variant="destructive" size="lg">
        Delete
      </Button>
    );

    const button = screen.getByRole("button", { name: /delete/i });
    expect(button).toHaveAttribute("data-variant", "destructive");
    expect(button).toHaveAttribute("data-size", "lg");
  });

  it("está deshabilitado cuando disabled es true", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button", { name: /disabled/i })).toBeDisabled();
  });
});
