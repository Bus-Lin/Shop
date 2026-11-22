import { Link } from 'react-router-dom';
import { useOrders } from '../context/OrdersContext';

export const OrdersPage = () => {
  const { orders, updateOrderStatus } = useOrders();

  const getBadgeColor = (status) => {
    switch (status) {
      case 'Pendiente':
        return 'bg-warning text-dark';
      case 'En proceso':
        return 'bg-info text-dark';
      case 'Entregado':
        return 'bg-success';
      case 'Cancelado':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0">Mis Pedidos</h3>
        <Link to="/products" className="btn btn-primary btn-sm">
          + Nuevo Pedido
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="alert alert-info">
          Aún no tienes pedidos registrados. Ve al <Link to="/products">catálogo</Link> para crear uno.
        </div>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle mb-0 bg-white">
            <thead className="table-dark">
              <tr>
                <th>ID Pedido</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th>Fecha</th>
                <th>Estado Actual</th>
                <th>Cambiar Estado</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="fw-bold">{order.id}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={order.productThumbnail}
                        alt={order.productTitle}
                        style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                      />
                      <span>{order.productTitle}</span>
                    </div>
                  </td>
                  <td>{order.quantity}</td>
                  <td className="fw-semibold">${order.total}</td>
                  <td className="small text-muted">{order.createdAt}</td>
                  <td>
                    <span className={`badge ${getBadgeColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="En proceso">En proceso</option>
                      <option value="Entregado">Entregado</option>
                      <option value="Cancelado">Cancelado</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};