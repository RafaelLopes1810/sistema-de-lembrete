import { useState } from "react";

function Modal({ onClose, onCreate }) {
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo || !data) return;

    const novoLembrete = { titulo, data };

    try {
      const response = await fetch("http://localhost:5157/api/lembrete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoLembrete),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar no servidor");
      }

      const savedReminder = await response.json();
      
      // Atualiza a lista no frontend
      onCreate(savedReminder);

      // Limpa os campos
      setTitulo("");
      setData("");
      onClose();
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="fechar-modal" onClick={onClose}>×</button>
        <h2>Novo Lembrete</h2>
        <form onSubmit={handleSubmit} className="form-modal">
          <textarea
            type="text"
            placeholder="Título (max 100 caracteres)"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            maxLength={100}
          />
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          <button type="submit" className="btn-criar">Criar</button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
