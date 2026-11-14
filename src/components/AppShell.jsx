export default function AppShell({ user, onLogout, children }) {
  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      {/* 1. La barre de navigation en haut */}
      <header className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm">
        <div className="container-fluid">
          {/* Logo / Nom de l'app */}
          <span className="navbar-brand fw-bold fs-4">FleetTrackPRO</span>

          <div className="d-flex align-items-center gap-3">
            {/* Si un utilisateur est connecté, on affiche son nom et son rôle */}
            {user && (
              <div className="text-light text-end">
                <div className="fw-semibold">{user.nom}</div>
                <span className="badge bg-primary text-uppercase">
                  {user.role}
                </span>
              </div>
            )}

            {/* Bouton Déconnexion qui déclenche la fonction onLogout */}
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={onLogout}
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* 2. La zone centrale qui affiche la page active (children) */}
      <main className="container my-4 flex-grow-1">{children}</main>

      {/* 3. Le pied de page */}
      <footer className="bg-white text-center py-3 border-top text-muted small">
        FleetTrackPRO &copy; 2026 - Tous droits réservés
      </footer>
    </div>
  );
}
