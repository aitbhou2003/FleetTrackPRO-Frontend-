import { Link } from "react-router-dom";

export default function RemorqueCard({ remorque }) {
  return (
      <div className="card shadow-sm h-100 border-0">
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <div className="d-flex justify-content-between align-items-start mb-2">
              <h5 className="card-title fw-bold text-dark mb-0">
                Immatriculation ({remorque.immatriculation})
              </h5>
              {/* <!-- Badge statut (bg-success si disponible, bg-warning si en_trajet, bg-danger si en_maintenance) --> */}
              <span className="badge bg-success">{remorque.statut}</span>
            </div>

            <p className="text-muted small mb-1">
              <strong>Type :</strong> {remorque.type}
            </p>

            <p className="text-muted small mb-1">
              <strong>Kilométrage :</strong> {remorque.kilometrageTotal} km
            </p>
          </div>

          {/* <!-- Bouton vers la page de détail URL : /admin/remorques/:id --> */}
          <div className="mt-3 pt-2 border-top">
            <Link
              to="/admin/remorques/ID"
              className="btn btn-sm btn-outline-primary w-100"
            >
              Voir détails & modifier &rarr;
            </Link>
          </div>
        </div>
      </div>
      );
}
