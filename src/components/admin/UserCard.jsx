import { suspendUser, activateUser } from "../../api/users";

export default function UserCard({ user, token, onStatueChange }) {
  async function hundelSuspend(userId, token) {
    const res = await suspendUser(userId, token);
    if (onStatueChange) {
      onStatueChange(res.user);
    }
  }

  async function hundelActive(userId, token) {
    const res = await activateUser(userId, token);
    if (onStatueChange) {
      onStatueChange(res.user);
    }
  }

  return (
    <div className="card shadow-sm h-100 border-0">
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          {/* <!-- En-tête : Nom complet + Badge Rôle --> */}
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title fw-bold text-dark mb-0">
              {user.firstName} {user.lastName}
            </h5>
            {/* <!-- Badge de rôle (admin ou chauffeur) --> */}
            <span className="badge bg-secondary text-uppercase">
              {user.role}
            </span>
          </div>

          {/* <!-- Email --> */}
          <p className="text-muted small mb-2">{user.email}</p>

          {/* <!-- Statut --> */}
          <p className="card-text mb-2">
            <strong>Statut : </strong>
            {/* <!-- Badge statut : bg-success si actif, bg-danger si suspendu --> */}
            <span className={`badge ${user.statue === 'actif' ? "bg-success" : "bg-danger"}`}>{user.statue}</span>
          </p>
        </div>

        {/* <!-- Actions (Boutons Suspendre / Activer) --> */}
        <div className="mt-3 pt-2 border-top d-flex gap-2">
          {/* <!-- Si l'utilisateur est 'actif' : afficher ce bouton rouge pour le suspendre --> */}
          {user.statue == "actif" ? (
            <button
              type="button"
              className="btn btn-sm btn-outline-danger w-100"
              onClick={()=>hundelSuspend(user._id, token)}
            >
              Suspendre
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-sm btn-outline-success w-100"
              onClick={()=>hundelActive(user._id, token)}
            >
              Activer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
