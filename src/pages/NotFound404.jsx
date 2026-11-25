import { useNavigate } from "react-router-dom";

export default function NotFound404() {

    const navigate = useNavigate()
  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div
        className="card shadow border-0 p-5 text-center"
        style={{ maxWidth: "500px" }}
      >
        <h1 className="display-1 fw-bold text-secondary mb-0">404</h1>
        <h3 className="fw-bold text-dark mt-2 mb-3">Page Introuvable</h3>
        <p className="text-muted mb-4">
          L'URL demandée n'existe pas ou a été déplacée.
        </p>
        <button type="button" className="btn btn-outline-primary" onClick={()=>navigate(-1)}>
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
}
