export const getTotalStock = (products = []) => {
  return products.reduce(
    (total, product) =>
      total + Number(product.currentStock || 0),
    0
  );
};

export const getStockIn = (transactions = []) => {
  return transactions
    .filter(
      (transaction) => transaction.type === "in"
    )
    .reduce(
      (total, transaction) =>
        total + Number(transaction.quantity || 0),
      0
    );
};

export const getStockOut = (transactions = []) => {
  return transactions
    .filter(
      (transaction) => transaction.type === "out"
    )
    .reduce(
      (total, transaction) =>
        total + Number(transaction.quantity || 0),
      0
    );
};

export const getRevenue = (transactions = []) => {
  return transactions
    .filter(
      (transaction) => transaction.type === "out"
    )
    .reduce(
      (total, transaction) =>
        total +
        Number(transaction.quantity || 0) *
          Number(transaction.sellingPrice || 0),
      0
    );
};

export const getCost = (transactions = []) => {
  return transactions
    .filter(
      (transaction) => transaction.type === "out"
    )
    .reduce(
      (total, transaction) =>
        total +
        Number(transaction.quantity || 0) *
          Number(transaction.purchasePrice || 0),
      0
    );
};

export const getProfit = (transactions = []) => {
  return getRevenue(transactions) - getCost(transactions);
};

export const getLowStockProducts = (
  products = []
) => {
  return products.filter(
    (product) =>
      Number(product.currentStock || 0) <=
      Number(product.lowStockLimit || 0)
  );
};

export const getRemainingStock = (
  currentStock,
  quantity
) => {
  return (
    Number(currentStock || 0) -
    Number(quantity || 0)
  );
};

export const calculateRevenue = (
  quantity,
  sellingPrice
) => {
  return (
    Number(quantity || 0) *
    Number(sellingPrice || 0)
  );
};

export const calculateCost = (
  quantity,
  purchasePrice
) => {
  return (
    Number(quantity || 0) *
    Number(purchasePrice || 0)
  );
};

export const calculateProfit = (
  quantity,
  sellingPrice,
  purchasePrice
) => {
  return (
    calculateRevenue(quantity, sellingPrice) -
    calculateCost(quantity, purchasePrice)
  );
};

export const calculateTotalCost = (quantity, unitCost) => {
  return Number(quantity || 0) * Number(unitCost || 0);
};