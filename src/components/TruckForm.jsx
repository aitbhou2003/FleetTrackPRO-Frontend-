import { useState } from "react";
import { createTruck } from "../api/trucks";

export default function TruckForm({ token, onTruckCreated, onClose }) {
  const [immatriculation, setImmatruculation] = useState("");
  const [marque, setMarque] = useState("");
  const [kilometrageTotal, setKilometrage] = useState("");
  const [erreur, setErreur] = useState("");
  const [loading, setLoading] = useState(false);

  async function hundelSubmit(e) {
    e.preventDefault();
    if (!marque.trim() || !immatriculation.trim() || !kilometrageTotal.trim()) {
      setErreur("Veuillez remplir tous les champs");
      return;
    }
    setErreur("");
    setLoading(true);

    try {
      const res = await createTruck(
        {
          immatriculation: immatriculation,
          marque: marque,
          kilometrageTotal: kilometrageTotal,
        },
        token,
      );

      if (onTruckCreated) {
        onTruckCreated(res.truck);
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
        <h5 className="fw-bold text-dark mb-0">Ajouter un nouveau camion</h5>
        {/* <!-- Bouton pour annuler/fermer le formulaire --> */}
        <button
          type="button"
          className="btn-close"
          aria-label="Fermer"
          onClick={onClose}
        ></button>
      </div>

      {/* <!-- Alerte message d'erreur si l'API renvoie une erreur (ex: 409 immatriculation existe déjà) --> */}
      {erreur && (
        <div className="alert alert-danger py-2 small" role="alert">
          {erreur}
        </div>
      )}

      <form onSubmit={hundelSubmit}>
        <div className="row g-3">
          {/* <!-- Champ Immatriculation --> */}
          <div className="col-12 col-md-4">
            <label className="form-label fw-semibold">Immatriculation</label>
            <input
              value={immatriculation}
              onChange={(e) => setImmatruculation(e.target.value)}
              type="text"
              className="form-control"
              placeholder="ex: 12345-A-26"
            />
          </div>

          {/* <!-- Champ Marque / Modèle --> */}
          <div className="col-12 col-md-4">
            <label className="form-label fw-semibold">Marque / Modèle</label>
            <input
              value={marque}
              onChange={(e) => setMarque(e.target.value)}
              type="text"
              className="form-control"
              placeholder="ex: Volvo FH16"
            />
          </div>

          {/* <!-- Champ Kilométrage initial --> */}
          <div className="col-12 col-md-4">
            <label className="form-label fw-semibold">
              Kilométrage initial
            </label>
            <input
              value={kilometrageTotal}
              onChange={(e) => setKilometrage(e.target.value)}
              type="number"
              className="form-control"
              placeholder="ex: 50000"
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
            {loading ? "Loading..." : "Enregistrer le camion"}
          </button>
        </div>
      </form>
    </div>
  );
}
