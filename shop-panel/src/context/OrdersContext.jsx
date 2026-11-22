/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const OrdersContext = createContext();
const STORAGE_KEY = 'shoppanel_orders';

export const OrdersProvider = ({ children }) => {
  const { user } = useAuth();

  // Inicialización directa desde localStorage
  const [allOrders, setAllOrders] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error al leer pedidos de localStorage:', error);
      return [];
    }
  });

  const saveToStorage = (updatedOrders) => {
    setAllOrders(updatedOrders);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));
  };

  const userOrders = user
    ? allOrders.filter((order) => order.userId === user.id)
    : [];

  const addOrder = ({ product, quantity }) => {
    if (!user) throw new Error('Debes iniciar sesión para realizar un pedido.');

    const newOrder = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      userId: user.id,
      userEmail: user.email,
      productId: product.id,
      productTitle: product.title,
      productThumbnail: product.thumbnail,
      unitPrice: product.price,
      quantity: Number(quantity),
      total: Number((product.price * quantity).toFixed(2)),
      status: 'Pendiente',
      createdAt: new Date().toLocaleString(),
    };

    const updated = [newOrder, ...allOrders];
    saveToStorage(updated);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updated = allOrders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    saveToStorage(updated);
  };

  return (
    <OrdersContext.Provider value={{ orders: userOrders, addOrder, updateOrderStatus }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);