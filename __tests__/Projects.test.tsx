import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Projects from "@/components/Projects/Projects";

describe("Projects", () => {
  it("renderiza el titulo correctamente", () => {
    render(<Projects />);
    expect(screen.getByText("My Projects")).toBeInTheDocument();
  });

  it("renderiza las project cards desde el JSON", () => {
    render(<Projects />);
    const heading = screen.getByText("My Projects");
    expect(heading).toBeInTheDocument();
    const grid = heading.nextElementSibling;
    expect(grid).toBeTruthy();
    expect(grid?.children.length).toBeGreaterThan(0);
  });
});
