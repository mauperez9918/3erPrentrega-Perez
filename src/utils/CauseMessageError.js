export const generateUserError = (data) => {
  return `Todos los campos son requeridos
Lista de campos requeridos:

-first_name: ${data.first_name},
-email: ${data.email},
`;
};

// export const generateUserIdError = (id) => {
//   return `Se debe enviar un identificador valido
//     -Valor recibido: ${id}
//     `;
// };
