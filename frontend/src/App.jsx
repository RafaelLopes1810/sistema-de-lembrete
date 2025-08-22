import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import ListaLembretes from "./components/ListaLembretes";
import Footer from "./components/Footer";

function App() {
  const [lembretes, setLembretes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Busca lembretes futuros no backend ao carregar a página
  useEffect(() => {
    const limparVencidos = async () => {
      try {
        await fetch("http://localhost:5157/api/lembrete/vencidos", {
          method: "DELETE",
        });
      } catch (err) {
        console.error("Erro ao limpar vencidos:", err);
      }
    };

    const carregarLembretes = async () => {
      try {
        const res = await fetch("http://localhost:5157/api/lembrete/ativos");
        const data = await res.json();
        setLembretes(data);
      } catch (err) {
        console.error("Erro ao carregar lembretes:", err);
      }
    };

    // Limpa os vencidos e depois busca os futuros
    const init = async () => {
      await limparVencidos();
      await carregarLembretes();
    };

    init();
  }, []);

  // Adiciona lembrete pelo modal
  const addLembrete = (lembrete) => {
    setLembretes([...lembretes, lembrete]);
    setIsModalOpen(false);
  };

  // Deleta lembrete ao clicar no btn-deletar
  const deletarLembrete = async (id) => {
    try {
      const resp = await fetch(`http://localhost:5157/api/lembrete/${id}`, {
        method: "DELETE",
      });

      if (resp.ok) {
        setLembretes((prev) => prev.filter((l) => l.id !== id));
      } else {
        console.error("Erro ao deletar:", resp.status);
      }
    } catch (error) {
      console.error("Erro na requisição DELETE:", error);
    }
  };

  return (
    <div className="app">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      <main className="container">
        <ListaLembretes lembretes={lembretes} onDelete={deletarLembrete} />
      </main>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} onCreate={addLembrete} />
      )}

      <Footer />
    </div>
  );
}

export default App;
