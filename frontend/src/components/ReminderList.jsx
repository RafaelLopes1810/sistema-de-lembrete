import React from "react";

function ReminderList({ reminders = [], onDelete = () => {} }) {

  if (!reminders.length) {
    return (
      <div className="reminder-list">
        <h2 className="reminder-heading">LEMBRETES</h2>
        <p className="reminder-empty">Nenhum lembrete criado ainda</p>
      </div>
    );
  }

  const grouped = reminders.reduce((acc, r) => {
    acc[r.date] = acc[r.date] || [];
    acc[r.date].push(r);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort();

  const formatDate = (iso) => {
    const [y, m, d] = iso.split("-");
    return `DIA ${d}/${m}/${y}`;
  };

  return (
    <div className="reminder-list">
      <h2 className="reminder-heading">LEMBRETES</h2>

      {sortedDates.map((date) => (
        <div key={date} className="reminder-group">
          <h3 className="reminder-date">{formatDate(date)}</h3>

          {grouped[date].map((rem, i) => (
            <div key={i} className="reminder-item">
              <div className="reminder-left">
                <span className="reminder-bullet">•</span>
                <div className="reminder-texts">
                  <strong className="reminder-title">{rem.title}</strong>
                  {rem.desc && <p className="reminder-desc">{rem.desc}</p>}
                </div>
              </div>

              <button
                className="delete-btn"
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
export default ReminderList;
