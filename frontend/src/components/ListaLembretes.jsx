import React from "react";

function ListaLembretes({ lembretes = [], onDelete = () => { } }) {
  if (!lembretes.length) {
    return (
      <div className="lista-lembrete">
        <h2 className="lista-cabecalho">LEMBRETES</h2>
        <p className="lista-vazia">Nenhum lembrete criado ainda</p>
      </div>
    );
  }

  const grupo = lembretes.reduce((acc, r) => {
    acc[r.data] = acc[r.data] || [];
    acc[r.data].push(r);
    return acc;
  }, {});

  const datasEmOrdem = Object.keys(grupo).sort();

  const formatDate = (iso) => {
    const date = new Date(iso);
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();
    return `DIA ${d}/${m}/${y}`;
  };

  return (
    <div className="lista-lembrete">
      <h2 className="lista-cabecalho">LEMBRETES</h2>

      {datasEmOrdem.map((date) => (
        <div key={date} className="lembrete-grupo">
          <h3 className="data-lembrete">{formatDate(date)}</h3>

          {grupo[date].map((rem, i) => (
            <div key={i} className="item-lembrete">
              <div className="lembrete-esquerda">
                <span className="lembrete-topico">•</span>
                <div className="textos-lembrete">
                  <strong className="titulo-lembrete">{rem.titulo}</strong>
                </div>
              </div>

              <button
                className="btn-deletar"
                aria-label="Excluir lembrete"
                title="Excluir"
                onClick={() => onDelete(rem.id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ListaLembretes;
