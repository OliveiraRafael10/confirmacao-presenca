import { useEffect, useState } from "react";

export default function ConfirmForm({ onConfirm }) {
  const [name, setName] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(timer);
  }, [toast]);

  const sanitizeName = (value) => {
    // permite letras, acentos, espaços, hífens e apóstrofo
    return value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s'-]/g, "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let trimmed = name.trim().replace(/\s{2,}/g, " ");
    if (!trimmed) {
      setToast({ type: "error", message: "Informe seu nome para confirmar presença." });
      return;
    }

    if (trimmed.length < 2 || trimmed.length > 40) {
      setToast({
        type: "error",
        message: "Escolha um nome com entre 2 e 40 caracteres.",
      });
      return;
    }

    const validName = /^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ\s'-]{1,39}$/;
    if (!validName.test(trimmed)) {
      setToast({
        type: "error",
        message: "Use apenas letras, espaços, hífens ou apostrofos no nome.",
      });
      return;
    }

    try {
      await onConfirm(trimmed);
      setName("");
      setToast({
        type: "success",
        message: `Presença confirmada! 🎉 Obrigado, ${trimmed}.`,
      });
    } catch (error) {
      setToast({
        type: "error",
        message: error?.message || "Erro ao confirmar presença. Tente novamente.",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-header">
          <div>
            <h3>Confirmar presença</h3>
            <p className="form-sub">Digite seu nome ou apelido para confirmar sua presença.</p>
          </div>
        </div>

        <input
          placeholder="Seu nome ou apelido"
          value={name}
          maxLength={40}
          onChange={(e) => setName(sanitizeName(e.target.value))}
        />

        <button type="submit" className="primary-btn">
          Confirmar presença
        </button>
      </form>

      {toast && <div className={`toast ${toast.type}`}>{toast.message}</div>}
    </>
  );
}
