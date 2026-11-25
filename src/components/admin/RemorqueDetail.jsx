import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  deleteRemorque,
  getRemorqueById,
  updateRemorque,
} from "../../api/remorques";
import { useNavigate } from "react-router-dom";

export default function RemorqueDetail({ token }) {
  const { id } = useParams();
  const [remorque, setRemorque] = useState({});
  const [erreur, setErreur] = useState("");
  const [immatriculation, setImmatruculation] = useState("");
  const [type, setType] = useState("");
  const [statut, setStatut] = useState("");
  const [kilometrageTotal, setKilometrage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(id);

    async function remorqueDetail() {
      try {
        const res = await getRemorqueById(token, id);
        setRemorque(res.remorque);
        setImmatruculation(res.remorque.immatriculation || "");
        setType(res.remorque.type || "");
        setKilometrage(res.remorque.kilometrageTotal || "");
        setStatut(res.remorque.statut || "disponible");
      } catch (error) {
        console.error(error);
      }
    }

    remorqueDetail();
  }, [token, id]);

  async function handelDelete() {
    try {
      await deleteRemorque(token, remorque._id);
      navigate("/admin/remorques");
    } catch (error) {
      console.error(error);
      setErreur(error.message);
    }
  }

  async function handelUpdate(e) {
    e.preventDefault();
    try {
      await updateRemorque(
        {
          immatriculation: immatriculation,
          kilometrageTotal: Number(kilometrageTotal),
          type: type,
          statut: statut,
        },
        token,
        id,
      );
      navigate(-1)
    } catch (error) {
      console.error(error);
      setErreur(error.message);
    }
  }

  return (
    <div className="card shadow-sm border-0 p-4">
      {/* <!-- En-tête : Titre + Bouton Retour --> */}
      <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
        <div>
          <h5 className="fw-bold text-dark mb-0">
            Fiche Détail de la Remorque
          </h5>
          <span className="text-muted small">Identifiant : {id}</span>
        </div>
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

      <form onSubmit={handelUpdate}>
        <div className="row g-3">
          {/* <!-- Immatriculation --> */}
          <div className="col-12 col-md-4">
            <label className="form-label fw-semibold">Immatriculation</label>
            <input
              type="text"
              className="form-control"
              value={immatriculation}
              onChange={(e) => setImmatruculation(e.target.value)}
            />
          </div>

          {/* <!-- Type --> */}
          <div className="col-12 col-md-4">
            <label className="form-label fw-semibold">Type</label>
            <input
              type="text"
              className="form-control"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>

          {/* <!-- Kilométrage --> */}
          <div className="col-12 col-md-4">
            <label className="form-label fw-semibold">Kilométrage total</label>
            <input
              type="number"
              className="form-control"
              value={kilometrageTotal}
              onChange={(e) => setKilometrage(e.target.value)}
            />
          </div>

          {/* <!-- Statut (disponible, en_trajet, en_maintenance) --> */}
          <div className="col-12 col-md-4">
            <label className="form-label fw-semibold">Statut</label>
            <select
              className="form-select"
              value={statut}
              onChange={(e) => setStatut(e.target.value)}
            >
              <option value="disponible">Disponible</option>
              <option value="en_trajet">En trajet</option>
              <option value="en_maintenance">En maintenance</option>
            </select>
          </div>
        </div>

        {/* <!-- Actions : Supprimer à gauche, Enregistrer à droite --> */}
        <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={handelDelete}
          >
            Supprimer cette remorque
          </button>

          <button type="submit" className="btn btn-primary">
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
}
