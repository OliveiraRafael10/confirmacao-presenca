import ConfirmForm from "./ConfirmForm";

export default function InvitePage({ onConfirm, onShowOrganizer }) {
  return (
    <div className="invite-container">
      <div className="title-with-icons">
        <img src="/angel.png" alt="Ícone" className="title-icon" />
        <h1 className="invite-header">Maria Alice</h1>
        <img src="/angel.png" alt="Ícone" className="title-icon" />
      </div>
      <p className="invite-sub">3 anos</p>

      <p>
        Você está convidado a celebrar esse dia especial com a gente.
      </p>

      <div className="details">
        <p>
          <span className="detail-label">Data:</span> 19 de Abril
        </p>
        <p>
          <span className="detail-label">Horário:</span> 12:00
        </p>
        <p>
          <span className="detail-label">Local:</span> Rua Benedito Hernani Dias Pacheco - Chácaras Bela Vista, Capivari - SP
        </p>
      </div>

      <ConfirmForm onConfirm={onConfirm} />

      <button className="secondary-btn" onClick={onShowOrganizer}>
        Ver lista de confirmados
      </button>
    </div>
  );
}
