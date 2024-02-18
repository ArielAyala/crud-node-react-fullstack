export const formatCurrency = (value) => {
  return parseFloat(value).toLocaleString("es-ES", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

