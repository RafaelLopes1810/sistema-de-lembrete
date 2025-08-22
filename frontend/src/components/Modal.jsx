import { useState } from "react";

function Modal({ onClose, onCreate }) {
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo || !data) {
      alert("Preencha todos os campos.");
      return;
    }

    const novoLembrete = { titulo, data };
    
    onCreate(novoLembrete);
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
