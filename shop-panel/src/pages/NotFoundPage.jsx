import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="container text-center my-5">
      <h1 className="display-1 fw-bold text-primary">404</h1>
      <p className="fs-4 text-muted">La página que buscas no existe.</p>
      <Link to="/dashboard" className="btn btn-primary">
        Volver al inicio
      </Link>
    </div>
  );
};