import { useState } from "react";
import { createRemorque } from "../../api/remorques";
import { Link, useNavigate } from "react-router-dom";

export default function RemorqueForm({ token }) {
  const [immatriculation, setImmatruculation] = useState("");
  const [type, setType] = useState("");
  const [kilometrageTotal, setKilometrage] = useState("");
  const [erreur, setErreur] = useState("");
  const navigate = useNavigate();

  async function handelSubmit(e) {
    e.preventDefault();
    if (!immatriculation.trim() || !type.trim() || !kilometrageTotal.trim()) {
      setErreur("Veuillez remplir tous les champs");
      return;
    }
    setErreur("");
    try {
      const res = await createRemorque(
        {
          immatriculation: immatriculation,
          type: type,
          kilometrageTotal: kilometrageTotal,
        },
        token,
      );

      navigate("/admin/remorques");
    } catch (error) {
      setErreur(error.message);
      console.log(error);
    }
  }

  return (
    <div className="card shadow-sm border-0 p-4">
      <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
        <h5 className="fw-bold text-dark mb-0">
          Ajouter une nouvelle remorque
        </h5>
        <Link
          to="/admin/remorques"
          className="btn btn-sm btn-outline-secondary"
        >
          &larr; Retour à la liste
        </Link>
      </div>

      {/* <!-- Message d'erreur éventuel --> */}
      {erreur && (
        <div className="alert alert-danger py-2 small" role="alert">
          {erreur}
        </div>
      )}

      <form onSubmit={handelSubmit}>
        <div className="row g-3">
          {/* <!-- Immatriculation --> */}
          <div className="col-12 col-md-4">
            <label className="form-label fw-semibold">Immatriculation</label>
            <input
              value={immatriculation}
              onChange={(e) => setImmatruculation(e.target.value)}
              type="text"
              className="form-control"
              placeholder="ex: REM-1029"
            />
          </div>

          {/* <!-- Type --> */}
          <div className="col-12 col-md-4">
            <label className="form-label fw-semibold">Type de remorque</label>
            <input
              value={type}
              onChange={(e) => setType(e.target.value)}
              type="text"
              className="form-control"
              placeholder="ex: Frigorifique, Citerne, Plateau..."
            />
          </div>

          {/* <!-- Kilométrage --> */}
          <div className="col-12 col-md-4">
            <label className="form-label fw-semibold">
              Kilométrage initial
            </label>
            <input
              value={kilometrageTotal}
              onChange={(e) => setKilometrage(e.target.value)}
              type="number"
              className="form-control"
              placeholder="ex: 0"
            />
          </div>
        </div>

        {/* <!-- Boutons d'action --> */}
        <div className="d-flex justify-content-end gap-2 mt-4">
          <Link to="/admin/remorques" className="btn btn-outline-secondary">
            Annuler
          </Link>
          <button type="submit" className="btn btn-primary">
            Enregistrer la remorque
          </button>
        </div>
      </form>
    </div>
  );
}
