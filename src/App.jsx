import { useEffect, useState } from "react";
import "./styles.css";
import InvitePage from "./components/InvitePage";
import Organizer from "./components/Organizer";
import { hasSupabase, supabase } from "./supabaseClient";

function App() {
  const [guests, setGuests] = useState([]);
  const [view, setView] = useState("invite");
  const [askPassword, setAskPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const ADMIN_PASSWORD =
    process.env.REACT_APP_ADMIN_PASSWORD?.trim();

  useEffect(() => {
    const loadGuests = async () => {
      if (hasSupabase) {
        const { data, error } = await supabase
          .from("guests")
          .select("id, name, created_at")
          .order("created_at", { ascending: true });

        if (!error) {
          setGuests(data.map((row) => row.name));
        }
      } else {
        const stored = localStorage.getItem("confirmedGuests");
        if (stored) {
          try {
            setGuests(JSON.parse(stored));
          } catch {
            // ignore invalid JSON
          }
        }
      }
    };

    loadGuests();
  }, []);

  useEffect(() => {
    if (!hasSupabase) {
      localStorage.setItem("confirmedGuests", JSON.stringify(guests));
    }
  }, [guests]);

  const handleConfirm = async (name) => {
    if (hasSupabase) {
      const { error } = await supabase.from("guests").insert({ name });
      if (error) {
        throw new Error(error.message);
      }
      setGuests((prev) => [...prev, name]);
    } else {
      setGuests((prev) => [...prev, name]);
    }
  };

  const handleOrganizerClick = () => {
    setPassword("");
    setAuthError("");
    setAskPassword(true);
  };

  const handleCheckPassword = () => {
    if (password === ADMIN_PASSWORD) {
      setAskPassword(false);
      setView("organizer");
      setPassword("");
      setAuthError("");
    } else {
      setAuthError("Senha incorreta. Tente novamente.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {view === "invite" ? (
          <>
            <InvitePage
              onConfirm={handleConfirm}
              onShowOrganizer={handleOrganizerClick}
            />

            {askPassword && (
              <div className="modal-overlay">
                <div className="modal">
                  <h2>Entrar como organizador</h2>
                  <p>Digite a senha para acessar a lista de convidados.</p>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha do organizador"
                    autoFocus
                  />
                  {authError && <p className="modal-error">{authError}</p>}
                  <div className="modal-actions">
                    <button
                      className="secondary-btn"
                      onClick={() => setAskPassword(false)}
                    >
                      Cancelar
                    </button>
                    <button className="primary-btn" onClick={handleCheckPassword}>
                      Acessar lista
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <Organizer
            guests={guests}
            onBack={() => setView("invite")}
          />
        )}
      </header>
    </div>
  );
}

export default App;
