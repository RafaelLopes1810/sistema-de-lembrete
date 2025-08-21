import { useState } from "react";

function Modal({ onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date) return;
    onCreate({ title, date });
    setTitle("");
    setDate("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Novo Lembrete</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <textarea
            type="text"
            placeholder="Título (max 100 caracteres)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button type="submit" className="btn-criar">Criar</button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
