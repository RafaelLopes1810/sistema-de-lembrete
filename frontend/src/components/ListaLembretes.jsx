import React from "react";

function ListaLembretes({ lembretes = [], onDelete = () => {} }) {

  if (!lembretes.length) {
    return (
      <div className="lista-lembrete">
        <h2 className="lista-cabecalho">LEMBRETES</h2>
        <p className="lista-vazia">Nenhum lembrete criado ainda</p>
      </div>
    );
  }

  const grupo = lembretes.reduce((acc, r) => {
    acc[r.date] = acc[r.date] || [];
    acc[r.date].push(r);
    return acc;
  }, {});

  const datasEmOrdem = Object.keys(grupo).sort();

  const formatDate = (iso) => {
    const [y, m, d] = iso.split("-");
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
                  <strong className="titulo-lembrete">{rem.title}</strong>
                  {rem.desc && <p className="desc-lembrete">{rem.desc}</p>}
                </div>
              </div>

              <button
                className="btn-deletar"
                aria-label="Excluir lembrete"
                title="Excluir"
                onClick={() => onDelete(date, i)}
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
