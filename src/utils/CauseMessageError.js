export const generateProductError = (data) => {
  return `Todos los campos son requeridos
Lista de campos requeridos:

-title: ${data.title},
-description: ${data.description},
-price: ${data.price},
-thumbnail: ${data.thumbnail},
-code: ${data.code},
-stock: ${data.stock},
-category: ${data.category},
`;
};

export const generateUserError = (data) => {
  return `Todos los campos son requeridos
Lista de campos requeridos:

-first_name: ${data.first_name},
-email: ${data.email},
`;
};
