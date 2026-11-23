export default function Forbidden403() {
  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div
        className="card shadow border-0 p-5 text-center"
        style={{ maxWidth: "500px" }}
      >
        <h1 className="display-1 fw-bold text-danger mb-0">403</h1>
        <h3 className="fw-bold text-dark mt-2 mb-3">Accès Refusé</h3>
        <p className="text-muted mb-4">
          Vous n'avez pas les autorisations nécessaires pour accéder à cette
          page.
        </p>
        <button type="button" className="btn btn-primary">
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
}
