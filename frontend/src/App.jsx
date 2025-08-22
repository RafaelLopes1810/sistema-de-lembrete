import { useState } from "react";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import ListaLembretes from "./components/ListaLembretes";
import Footer from "./components/Footer";
function App() {
  const [lembretes, setLembretes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addLembrete = (lembrete) => {
    setLembretes([...lembretes, lembrete]);
    setIsModalOpen(false);
  };

  return (
    <div className="app">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      <main className="container">
        <ListaLembretes lembretes={lembretes} />
      </main>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} onCreate={addLembrete} />
      )}

      <Footer />
    </div>
  );
}

export default App;
