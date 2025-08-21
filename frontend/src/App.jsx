import { useState } from "react";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import ListaLembretes from "./components/ListaLembretes";

function App() {
  const [lembretes, setLembretes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addLembrete = (lembrete) => {
    setLembretes([...lembretes, lembrete]);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <div className="container">
        <ListaLembretes lembretes={lembretes} />
      </div>

      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} onCreate={addLembrete} />}
    </div>
  );
}

export default App;
