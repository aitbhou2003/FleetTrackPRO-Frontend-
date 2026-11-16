export default function TruckCared({ truck }) {
  return (
    <div className="card shadow-sm h-100 border-0">
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title fw-bold text-dark mb-0">
              ({truck.immatriculation})
            </h5>
            {/* <!-- Badge de statut : vert si disponible, jaune si en_mission, rouge si en_maintenance --> */}
            <span className="badge bg-success">{truck.statut}</span>
          </div>

          <p className="text-muted small mb-1">
            <strong>Modèle :</strong> {truck.marque}
          </p>

          <p className="text-muted small mb-1">
            <strong>Kilométrage :</strong> {truck.kilometrageTotal} km
          </p>
        </div>

        {/* <!-- Actions sur le camion --> */}
        <div className="mt-3 pt-2 border-top d-flex gap-2">
          <button
            type="button"
            className="btn btn-sm btn-outline-primary flex-grow-1"
          >
            Voir détails
          </button>
          <button type="button" className="btn btn-sm btn-outline-danger">
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
