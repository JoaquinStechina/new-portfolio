import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn (utils)", () => {
  it("combina clases con clsx y tailwind-merge", () => {
    expect(cn("px-2", "py-1")).toBe("px-2 py-1");
  });

  it("fusiona clases de Tailwind conflictivas (última gana)", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("ignora valores falsy", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });
});
