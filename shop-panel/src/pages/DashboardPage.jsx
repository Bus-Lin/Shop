import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrdersContext';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { orders } = useOrders();

  const pendingCount = orders.filter((o) => o.status === 'Pendiente').length;
  const deliveredCount = orders.filter((o) => o.status === 'Entregado').length;

  return (
    <div className="container">
      <div className="p-4 mb-4 bg-light rounded-3 border">
        <h2 className="fw-bold">Bienvenido a ShopPanel</h2>
        <p className="text-muted mb-0">
          Sesión activa como: <strong>{user?.email}</strong>
        </p>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-primary h-100">
            <div className="card-body">
              <h6 className="text-muted">Total de Pedidos</h6>
              <h2 className="fw-bold text-primary">{orders.length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-warning h-100">
            <div className="card-body">
              <h6 className="text-muted">Pedidos Pendientes</h6>
              <h2 className="fw-bold text-warning">{pendingCount}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-success h-100">
            <div className="card-body">
              <h6 className="text-muted">Pedidos Entregados</h6>
              <h2 className="fw-bold text-success">{deliveredCount}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex gap-3">
        <Link to="/products" className="btn btn-primary">
          Explorar Catálogo de Productos
        </Link>
        <Link to="/orders" className="btn btn-outline-secondary">
          Gestionar Mis Pedidos
        </Link>
      </div>
    </div>
  );
};