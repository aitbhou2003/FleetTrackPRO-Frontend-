import {useState } from "react";
import { loginUser } from "../api/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erorr, setErorr] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [user ,setUser] = useState(null)
  const [token,setToken] = useState(null)

  async function handelLogin(e) {
    e.preventDefault();

    if (!email.trim() || !password.trim) {
      setErorr("Veuillez remplir tous les champs");
      return;
    }

    setLoading(true);
    setErorr("");
    setMessage("");
    try {
      const res = await loginUser(email, password);
      setMessage(res.message);
      console.log("this is the response",res);
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


        {message && (
            <div className="alert alert-warning py-2 small mt-2 " role="alert">
              {message}
            </div>
          )}

        </form>
      </div>
    </div>
  );
}
