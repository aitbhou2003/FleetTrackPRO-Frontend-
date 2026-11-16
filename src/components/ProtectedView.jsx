export default function ProtectedView({ user, allowedRoles, children }) {
  const isAllowed = user && allowedRoles.includes(user.userRole);

  if (!isAllowed) {
    return (
      <div
        className="alert alert-danger my-4 p-4 shadow-sm text-center"
        role="alert"
      >
        <h4 className="alert-heading fw-bold mb-2">Accès refusé (403)</h4>
        <p className="mb-0 text-muted">
          Votre compte (<strong>{user?.userRole || "inconnu"}</strong>) ne
          possède pas les permissions nécessaires pour accéder à cette vue.
        </p>
      </div>
    );
  }

  return children;
}
