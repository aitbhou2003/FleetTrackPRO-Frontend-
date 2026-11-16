export function TripCard({trip}) {
  return (
    <div className="card shadow-sm border-0 mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="fw-bold mb-0 text-dark">
            {trip.siteDepart} &rarr; {trip.siteArrivee}
          </h5>
          {/* <!-- Badge statut du trajet : à faire, en cours, terminé --> */}
          <span className="badge bg-warning text-dark">{trip.statut}</span>
        </div>

        <div className="row text-muted small mt-3">
          <div className="col-6">
            <strong>Date départ :</strong> {new Date(trip.dateDebutPrevue).toLocaleDateString('en-GB')}
          </div>
          <div className="col-6">
            <strong>Camion :</strong> {`${trip.camion.marque} (${trip.camion.immatriculation})`}
          </div>
        </div>
      </div>
    </div>
  );
}
