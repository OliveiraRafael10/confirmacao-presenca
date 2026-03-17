import { useState } from "react";

export default function SecretScreen({ onEnter }) {
  return (
    <div className="secret-screen">
      <h2>🎈 Você recebeu um convite secreto...</h2>

      <button onClick={onEnter}>
        Entrar no convite
      </button>
    </div>
  );
}