import { useState } from "react";
import AppShell from "./components/AppShell";
import LoginForm from "./components/LoginForm";

export default function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  function handelLoginSuccess(user, token) {
    setUser(user);
    setToken(token);
  }

  function handelLogOut() {
    setUser(null);
    setToken(null);
  }
  if (!user) {
    return <LoginForm onLoginSuccess={handelLoginSuccess} />;
  }
  return (
    <>
      <AppShell user={user} onLogout={handelLogOut}>
        <div className="card shadow-sm p-4">
          <h3>Bienvenue {user.role} !</h3>
          <p className="text-muted">
            Vous êtes bien connecté avec le token en mémoire.
          </p>
        </div>{" "}
      </AppShell>
    </>
  );
}
