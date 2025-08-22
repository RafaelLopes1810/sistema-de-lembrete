import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "../src/components/Footer";

describe("Footer component", () => {
  it("renderiza o elemento footer", () => {
    render(<Footer />);
    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toBeInTheDocument();
  });

  it("possui a classe CSS correta", () => {
    render(<Footer />);
    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toHaveClass("footer");
  });
});
