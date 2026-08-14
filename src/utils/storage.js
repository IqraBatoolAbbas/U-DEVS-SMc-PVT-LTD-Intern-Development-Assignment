const PRODUCTS_KEY = "warehouse_products";
const TRANSACTIONS_KEY = "warehouse_transactions";
const USERS_KEY = "warehouse_users";

/* ================================
   PRODUCTS
================================ */

export const getProducts = () => {
  try {
    const data = localStorage.getItem(PRODUCTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading products:", error);
    return [];
  }
};

export const saveProducts = (products) => {
  localStorage.setItem(
    PRODUCTS_KEY,
    JSON.stringify(products)
  );
};

export const addProduct = (product) => {
  const products = getProducts();

  const updatedProducts = [
    ...products,
    product,
  ];

  saveProducts(updatedProducts);

  return updatedProducts;
};

export const updateProduct = (productId, updates) => {
  const products = getProducts();

  const updatedProducts = products.map((product) =>
    String(product.id) === String(productId)
      ? {
          ...product,
          ...updates,
        }
      : product
  );

  saveProducts(updatedProducts);

  return updatedProducts;
};
export const deleteProduct = (productId) => {
  const products = getProducts();

  const updatedProducts = products.filter(
    (product) =>
      String(product.id) !== String(productId)
  );

  saveProducts(updatedProducts);

  return updatedProducts;
};
/* ================================
   TRANSACTIONS
================================ */

export const getTransactions = () => {
  try {
    const data = localStorage.getItem(TRANSACTIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading transactions:", error);
    return [];
  }
};

export const saveTransactions = (transactions) => {
  localStorage.setItem(
    TRANSACTIONS_KEY,
    JSON.stringify(transactions)
  );
};

export const addTransaction = (transaction) => {
  const transactions = getTransactions();

  const updatedTransactions = [
    ...transactions,
    transaction,
  ];

  saveTransactions(updatedTransactions);

  return updatedTransactions;
};

/* ================================
   CLEAR DATA
================================ */

export const clearWarehouseData = () => {
  localStorage.removeItem(PRODUCTS_KEY);
  localStorage.removeItem(TRANSACTIONS_KEY);
  localStorage.removeItem(USERS_KEY);
};

/* ================================
   USERS
================================ */

const defaultAdmin = {
  id: "USR-001",
  name: "Administrator",
  email: "admin@udevs.com",
  role: "Administrator",
  status: "Active",
  createdAt: new Date().toISOString(),
};

export const getUsers = () => {
  try {
    const data = localStorage.getItem(USERS_KEY);
    const users = data ? JSON.parse(data) : [];

    if (Array.isArray(users) && users.length > 0) {
      return users;
    }

    return [defaultAdmin];
  } catch (error) {
    console.error("Error loading users:", error);
    return [defaultAdmin];
  }
};

export const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const addUser = (user) => {
  const users = getUsers();
  const updatedUsers = [...users, user];
  saveUsers(updatedUsers);
  return updatedUsers;
};

export const updateUser = (userId, updates) => {
  const users = getUsers();
  const updatedUsers = users.map((user) =>
    String(user.id) === String(userId)
      ? { ...user, ...updates }
      : user
  );
  saveUsers(updatedUsers);
  return updatedUsers;
};

export const deleteUser = (userId) => {
  const users = getUsers();
  const updatedUsers = users.filter(
    (user) => String(user.id) !== String(userId)
  );
  saveUsers(updatedUsers);
  return updatedUsers;
};