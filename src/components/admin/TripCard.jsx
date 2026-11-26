import { Link } from "react-router-dom";

export default function TripCard({ trip }) {
  return (
    <div className="card shadow-sm h-100 border-0">
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title fw-bold text-dark mb-0">
              {trip.siteDepart} &rarr; {trip.siteArrivee}
            </h5>
            {/* <!-- Badges : a_faire (secondary), en_cours (warning text-dark), termine (success) --> */}

            <span
              className={
                trip.statut == "a_faire"
                  ? `badge bg-warning text-dark`
                  : trip.statut == "en_cours"
                    ? `badge bg-info text-dark`
                    : `badge bg-success`
              }
            >
              {trip.statut}
            </span>
          </div>

          <p className="text-muted small mb-1">
            <strong>Marchandise :</strong> {trip.marchandise}
          </p>

          <div className="row text-muted small mt-2 pt-2 border-top">
            <div className="col-6 mb-1">
              <strong>Chauffeur :</strong> {trip.chauffeur.firstName}{" "}
              {trip.chauffeur.lastName}
            </div>
            <div className="col-6 mb-1">
              <strong>Camion :</strong> {trip.camion.marque}
            </div>
            <div className="col-6">
              <strong>Remorque :</strong> {trip.remorque.type}
            </div>
            <div className="col-6">
              <strong>Départ :</strong>{" "}
              {new Date(trip.dateDebutPrevue).toLocaleDateString()}
            </div>
          </div>

          <div className="mt-3 pt-2 border-top">
            {/* <!-- Lien vers le détail : /admin/trajets/ID --> */}
            <Link
              to={`/admin/trajets/${trip._id}`}
              className="btn btn-sm btn-outline-primary w-100"
            >
              Voir détails & ressources assignées &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
