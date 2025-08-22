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

  // Cria lembrete no backend
  const criarLembrete = async (lembrete) => {
    try {
      const resp = await fetch("http://localhost:5157/api/lembrete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lembrete),
      });

      if (resp.ok) {
        const novo = await resp.json();
        setLembretes((prev) => [...prev, novo]);
        setIsModalOpen(false);
      } else if (resp.status === 400) {
        const erro = await resp.json();

        if (erro.errors) {
          const mensagens = Object.values(erro.errors).flat();
          alert(mensagens.join("\n")); // mostra todas as validações
        } else {
          alert("Erro ao criar lembrete.");
        }
      } else {
        alert("Erro inesperado ao criar lembrete.");
      }
    } catch (err) {
      console.error("Erro na requisição POST:", err);
      alert("Erro de comunicação com o servidor.");
    }
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
        <Modal
          onClose={() => setIsModalOpen(false)}
          onCreate={criarLembrete} // agora usa a função com validação
        />
      )}

      <Footer />
    </div>
  );
}

export default App;
