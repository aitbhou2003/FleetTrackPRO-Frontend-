export default function DriverLayout({user,token}) {
  return (
    <div className="w-100">
      {/* <!-- Carte de bienvenue pour le chauffeur --> */}
      <div className="card shadow-sm border-0 mb-4 bg-primary text-white p-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h3 className="fw-bold mb-1">Espace Chauffeur</h3>
            <p className="mb-0 text-white-50">
              Bienvenue sur votre tableau de bord de mission
            </p>
          </div>
          <span className="badge bg-light text-primary fs-6 px-3 py-2">
            Chauffeur
          </span>
        </div>
      </div>

      {/* <!-- Section "Mes Trajets" --> */}
      <div className="card shadow-sm border-0 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold text-dark mb-0">Mes Trajets</h4>
          <span className="badge bg-secondary">0 mission(s)</span>
        </div>

        {/* <!-- Message état vide --> */}
        <div className="alert alert-info text-center my-3" role="alert">
          Aucun trajet assigné pour le moment.
        </div>
      </div>
    </div>
  );
}
