function ListaLembretes({ lembretes }) {
  // agrupar por data
  const grouped = lembretes.reduce((acc, lembrete) => {
    acc[lembrete.date] = acc[lembrete.date] || [];
    acc[lembrete.date].push(lembrete);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort();

  return (
    <div className="lembrete-list">
      {sortedDates.map((date) => (
        <div key={date} className="lembrete-group">
          <h3>{date}</h3>
          {grouped[date].map((rem, i) => (
            <div key={i} className="lembrete-item">
              <strong>{rem.title}</strong>
              <p>{rem.desc}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ListaLembretes;
