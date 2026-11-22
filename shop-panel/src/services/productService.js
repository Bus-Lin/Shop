const API_URL = 'https://dummyjson.com/products';

export const getProducts = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Error al obtener el catálogo de productos.');
  }
  const data = await response.json();
  return data.products;
};

export const getProductById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('No se pudo cargar el detalle del producto.');
  }
  return await response.json();
};