import { useState } from "react";
import { loginUser } from "../api/auth";
import { jwtDecode } from "jwt-decode";

export default function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erorr, setErorr] = useState("");
  const [loading, setLoading] = useState(false);

  async function handelLogin(e) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setErorr("Veuillez remplir tous les champs");
      return;
    }

    setLoading(true);
    setErorr("");
    try {
      const res = await loginUser(email, password);
      const decodeUder = jwtDecode(res.token);
      if (onLoginSuccess) {
        onLoginSuccess(decodeUder, res.token);
      }
    } catch (error) {
      setErorr(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">FleetTrackPRO</h2>
          <p className="text-muted small">Connectez-vous à votre espace</p>
        </div>

        {/* <!-- Message d'erreur éventuel --> */}
        {erorr && (
          <div className="alert alert-danger py-2 small" role="alert">
            {erorr}
          </div>
        )}

        {/* <!-- Le formulaire --> */}
        <form onSubmit={handelLogin}>
          {/* <!-- Champ Identifiant / Email --> */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="ex: admin@fleet.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* <!-- Champ Mot de passe --> */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* <!-- Bouton de soumission --> */}
          <button
            type="submit"
            className="btn btn-primary w-100 py-2 mt-2"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>


        </form>
      </div>
    </div>
  );
}
