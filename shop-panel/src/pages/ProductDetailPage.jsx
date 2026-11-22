import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { useOrders } from '../context/OrdersContext';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addOrder } = useOrders();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    const qty = Number(quantity);
    if (!qty || qty <= 0 || !Number.isInteger(qty)) {
      setValidationError('La cantidad debe ser un número entero mayor a 0.');
      return;
    }
    if (qty > product.stock) {
      setValidationError(`Stock insuficiente. Solo hay ${product.stock} unidades disponibles.`);
      return;
    }

    addOrder({ product, quantity: qty });
    setOrderSuccess(true);
    setTimeout(() => navigate('/orders'), 1200);
  };

  if (loading) {
    return (
      <div className="container text-center my-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container">
        <div className="alert alert-danger">{error || 'Producto no encontrado'}</div>
        <Link to="/products" className="btn btn-secondary">Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <Link to="/products" className="btn btn-outline-secondary btn-sm mb-3">
        &larr; Volver al catálogo
      </Link>

      <div className="card shadow-sm p-4">
        <div className="row g-4 align-items-center">
          <div className="col-md-5 text-center">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="img-fluid rounded"
              style={{ maxHeight: '300px' }}
            />
          </div>
          <div className="col-md-7">
            <span className="badge bg-secondary text-capitalize mb-2">
              {product.category}
            </span>
            <h2 className="fw-bold">{product.title}</h2>
            <p className="text-muted">{product.description}</p>
            <h3 className="text-primary fw-bold mb-2">${product.price}</h3>
            <p className="small text-muted">
              Stock disponible: <strong>{product.stock} unidades</strong> | Marca: {product.brand || 'Genérica'}
            </p>

            <hr />

            {validationError && (
              <div className="alert alert-danger py-2">{validationError}</div>
            )}
            {orderSuccess && (
              <div className="alert alert-success py-2">
                ¡Pedido registrado exitosamente! Redirigiendo a Mis Pedidos...
              </div>
            )}

            <form onSubmit={handleOrderSubmit} className="row g-2 align-items-end" noValidate>
              <div className="col-sm-4">
                <label className="form-label fw-semibold">Cantidad</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="col-sm-8">
                <button type="submit" className="btn btn-success w-100 fw-semibold">
                  Registrar Pedido (${(product.price * (quantity || 0)).toFixed(2)})
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};