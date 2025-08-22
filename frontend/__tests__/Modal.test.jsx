import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "../src/components/Modal";

describe("Modal", () => {
    test("renderiza título e campos corretamente", () => {
        render(<Modal onClose={() => { }} onCreate={() => { }} />);

        expect(screen.getByText("Novo Lembrete")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Título (max 100 caracteres)")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Criar/i })).toBeInTheDocument();
    });

    test("chama onClose quando o botão fechar é clicado", () => {
        const mockClose = jest.fn();
        render(<Modal onClose={mockClose} onCreate={() => { }} />);

        fireEvent.click(screen.getByText("×"));
        expect(mockClose).toHaveBeenCalledTimes(1);
    });

    test("exibe alert se tentar enviar vazio", () => {
        const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => { });
        const mockCreate = jest.fn();

        render(<Modal onClose={() => { }} onCreate={mockCreate} />);

        fireEvent.click(screen.getByRole("button", { name: /Criar/i }));

        expect(mockAlert).toHaveBeenCalledWith("Preencha todos os campos.");
        expect(mockCreate).not.toHaveBeenCalled();

        mockAlert.mockRestore();
    });
});
