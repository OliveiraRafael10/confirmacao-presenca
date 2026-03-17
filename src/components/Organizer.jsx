export default function Organizer({ guests, onBack }) {
  return (
    <div className="organizer-container">
      <h1>Lista de Confirmados</h1>
      <p>
        Total de convidados confirmados: <strong>{guests.length}</strong>
      </p>

      {guests.length === 0 ? (
        <p>Ainda não há confirmações nesta lista.</p>
      ) : (
        <ul className="guest-list">
          {guests.map((name, index) => (
            <li key={`${name}-${index}`}>{name}</li>
          ))}
        </ul>
      )}

      <div className="organizer-actions">
        <button onClick={onBack}>Voltar ao convite</button>
      </div>
    </div>
  );
}
