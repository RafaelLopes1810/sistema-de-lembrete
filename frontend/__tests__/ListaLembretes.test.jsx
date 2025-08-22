import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ListaLembretes from "../src/components/ListaLembretes";

describe("ListaLembretes", () => {
    test("mostra mensagem quando não há lembretes", () => {
        render(<ListaLembretes lembretes={[]} />);

        expect(screen.getByText("LEMBRETES")).toBeInTheDocument();
        expect(screen.getByText("Nenhum lembrete criado ainda")).toBeInTheDocument();
    });

    test("chama onDelete ao clicar no botão de excluir", () => {
        const mockDelete = jest.fn();
        const lembretes = [
            { id: 10, titulo: "Estudar Jest", data: "2025-08-22" }
        ];

        render(<ListaLembretes lembretes={lembretes} onDelete={mockDelete} />);

        const botao = screen.getByRole("button", { name: /Excluir lembrete/i });
        fireEvent.click(botao);

        expect(mockDelete).toHaveBeenCalledWith(10);
        expect(mockDelete).toHaveBeenCalledTimes(1);
    });
});
