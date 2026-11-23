import { useState } from "react";
import { createUser } from "../../api/users";

export default function UserForm({ token, onUserCreated, onClose }) {
  const [firstName, setFisrtName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [erreur, setErreur] = useState("");
  const [loading, setLoading] = useState(false);

  async function hundelSubmit(e) {
    e.preventDefault();
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !role.trim()
    ) {
      setErreur("Veuillez remplir tous les champs");
      return;
    }

    setErreur("");
    setLoading(true);

    try {
      const res = await createUser(
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          role: role,
        },
        token,
      );

      if (onUserCreated) {
        onUserCreated(res.user);
      }
    } catch (error) {
      setErreur(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card shadow-sm border-0 p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
        <h5 className="fw-bold text-dark mb-0">Créer un nouveau Chauffeur</h5>
        <button
          type="button"
          className="btn-close"
          aria-label="Fermer"
          onClick={onClose}
        ></button>
      </div>

      {/* <!-- Alerte message d'erreur éventuel --> */}
      {erreur && (
        <div className="alert alert-danger py-2 small" role="alert">
          {erreur}
        </div>
      )}

      <form onSubmit={hundelSubmit}>
        <div className="row g-3">
          {/* <!-- Prénom --> */}
          <div className="col-12 col-md-6">
            <label className="form-label fw-semibold">Prénom</label>
            <input
              value={firstName}
              onChange={(e) => setFisrtName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="ex: Mohammed"
            />
          </div>

          {/* <!-- Nom --> */}
          <div className="col-12 col-md-6">
            <label className="form-label fw-semibold">Nom</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="ex: Alami"
            />
          </div>

          {/* <!-- role --> */}
          <div className="col-12 col-md-6">
            <label className="form-label fw-semibold">Role</label>
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              type="text"
              className="form-control"
              placeholder="admin / chauffeur"
            />
          </div>

          {/* <!-- Email --> */}
          <div className="col-12 col-md-6">
            <label className="form-label fw-semibold">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              placeholder="ex: m.alami@fleet.com"
            />
          </div>

          {/* <!-- Mot de passe --> */}
          <div className="col-12 col-md-6">
            <label className="form-label fw-semibold">Mot de passe</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              placeholder="••••••••"
            />
          </div>
        </div>

        {/* <!-- Boutons d'action --> */}
        <div className="d-flex justify-content-end gap-2 mt-4">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onClose}
          >
            Annuler
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Loading..." : "Créer le compte"}
          </button>
        </div>
      </form>
    </div>
  );
}
