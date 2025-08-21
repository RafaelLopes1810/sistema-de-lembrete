// Modal.jsx
import { useState } from "react";

function Modal({ onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date) return;
    onCreate({ title, desc, date });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Novo Lembrete</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea placeholder="Descrição" value={desc} onChange={(e) => setDesc(e.target.value)} />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <div className="modal-actions">
            <button type="submit">Criar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
