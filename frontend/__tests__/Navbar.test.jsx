import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "../src/components/Navbar";

describe("Navbar", () => {
  test("renderiza o título corretamente", () => {
    render(<Navbar onOpenModal={() => {}} />);
    expect(screen.getByText("Lembretes.com")).toBeInTheDocument();
  });

  test("renderiza o botão Criar Lembrete", () => {
    render(<Navbar onOpenModal={() => {}} />);
    expect(screen.getByText("Criar Lembrete")).toBeInTheDocument();
  });

  test("chama a função onOpenModal quando o botão é clicado", () => {
    const mockFn = jest.fn();
    render(<Navbar onOpenModal={mockFn} />);
    
    const botao = screen.getByText("Criar Lembrete");
    fireEvent.click(botao);

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
