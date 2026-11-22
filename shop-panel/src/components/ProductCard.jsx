import { Link } from 'react-router-dom';

export const ProductCard = ({ product }) => {
  return (
    <div className="col-md-4 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={product.thumbnail}
          className="card-img-top p-3"
          alt={product.title}
          style={{ height: '180px', objectFit: 'contain' }}
        />
        <div className="card-body d-flex flex-column">
          <span className="badge bg-secondary align-self-start mb-2 text-capitalize">
            {product.category}
          </span>
          <h6 className="card-title fw-bold">{product.title}</h6>
          <p className="card-text text-muted small flex-grow-1">
            {product.description.slice(0, 70)}...
          </p>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <span className="fw-bold text-primary fs-5">${product.price}</span>
            <Link to={`/products/${product.id}`} className="btn btn-sm btn-outline-primary">
              Ver detalle
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};