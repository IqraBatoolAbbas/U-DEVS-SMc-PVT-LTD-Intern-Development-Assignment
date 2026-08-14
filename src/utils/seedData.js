import { saveProducts, saveTransactions, saveUsers } from "./storage";
import { generateId } from "./idgenerator";

// Sample products for initial warehouse data
const sampleProducts = [
  {
    id: generateId("PROD"),
    name: "Laptop Dell XPS 15",
    sku: "LAP-DELL-001",
    category: "Electronics",
    purchasePrice: 120000,
    sellingPrice: 145000,
    currentStock: 15,
    lowStockLimit: 5,
    status: "Active",
    deliveryStatus: "pending",
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId("PROD"),
    name: "Wireless Mouse Logitech",
    sku: "ACC-MOUSE-001",
    category: "Electronics",
    purchasePrice: 2500,
    sellingPrice: 3500,
    currentStock: 45,
    lowStockLimit: 10,
    status: "Active",
    deliveryStatus: "pending",
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId("PROD"),
    name: "Mechanical Keyboard",
    sku: "ACC-KEY-001",
    category: "Electronics",
    purchasePrice: 8000,
    sellingPrice: 12000,
    currentStock: 8,
    lowStockLimit: 5,
    status: "Active",
    deliveryStatus: "pending",
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId("PROD"),
    name: "Office Chair Ergonomic",
    sku: "FURN-CHAIR-001",
    category: "Furniture",
    purchasePrice: 15000,
    sellingPrice: 22000,
    currentStock: 12,
    lowStockLimit: 3,
    status: "Active",
    deliveryStatus: "pending",
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId("PROD"),
    name: "Standing Desk",
    sku: "FURN-DESK-001",
    category: "Furniture",
    purchasePrice: 35000,
    sellingPrice: 45000,
    currentStock: 3,
    lowStockLimit: 2,
    status: "Active",
    deliveryStatus: "pending",
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId("PROD"),
    name: "27\" Monitor IPS",
    sku: "DISP-MON-001",
    category: "Electronics",
    purchasePrice: 28000,
    sellingPrice: 38000,
    currentStock: 20,
    lowStockLimit: 5,
    status: "Active",
    deliveryStatus: "pending",
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId("PROD"),
    name: "USB-C Hub",
    sku: "ACC-HUB-001",
    category: "Electronics",
    purchasePrice: 4500,
    sellingPrice: 6500,
    currentStock: 30,
    lowStockLimit: 8,
    status: "Active",
    deliveryStatus: "pending",
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId("PROD"),
    name: "Webcam HD 1080p",
    sku: "ACC-CAM-001",
    category: "Electronics",
    purchasePrice: 6000,
    sellingPrice: 8500,
    currentStock: 18,
    lowStockLimit: 5,
    status: "Active",
    deliveryStatus: "pending",
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId("PROD"),
    name: "Notebook A4 200 Pages",
    sku: "STAT-NOTE-001",
    category: "Stationery",
    purchasePrice: 150,
    sellingPrice: 250,
    currentStock: 100,
    lowStockLimit: 20,
    status: "Active",
    deliveryStatus: "pending",
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId("PROD"),
    name: "Ballpoint Pen Pack",
    sku: "STAT-PEN-001",
    category: "Stationery",
    purchasePrice: 300,
    sellingPrice: 500,
    currentStock: 150,
    lowStockLimit: 30,
    status: "Active",
    deliveryStatus: "pending",
    createdAt: new Date().toISOString(),
  },
];

// Sample transactions for initial warehouse data
const sampleTransactions = [
  {
    id: generateId("TXN"),
    type: "in",
    productId: sampleProducts[0].id,
    productName: sampleProducts[0].name,
    sku: sampleProducts[0].sku,
    quantity: 20,
    purchasePrice: sampleProducts[0].purchasePrice,
    sellingPrice: sampleProducts[0].sellingPrice,
    supplier: "Tech Distributors Ltd",
    batchLot: "BATCH-2024-001",
    zone: "Zone A",
    notes: "Initial stock",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    totalCost: 20 * sampleProducts[0].purchasePrice,
  },
  {
    id: generateId("TXN"),
    type: "out",
    productId: sampleProducts[0].id,
    productName: sampleProducts[0].name,
    sku: sampleProducts[0].sku,
    quantity: 5,
    purchasePrice: sampleProducts[0].purchasePrice,
    sellingPrice: sampleProducts[0].sellingPrice,
    revenue: 5 * sampleProducts[0].sellingPrice,
    cost: 5 * sampleProducts[0].purchasePrice,
    profit: 5 * (sampleProducts[0].sellingPrice - sampleProducts[0].purchasePrice),
    customer: "ABC Corporation",
    reason: "Sale",
    reference: "INV-2024-001",
    notes: "Bulk order",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: generateId("TXN"),
    type: "in",
    productId: sampleProducts[1].id,
    productName: sampleProducts[1].name,
    sku: sampleProducts[1].sku,
    quantity: 50,
    purchasePrice: sampleProducts[1].purchasePrice,
    sellingPrice: sampleProducts[1].sellingPrice,
    supplier: "Accessories World",
    batchLot: "BATCH-2024-002",
    zone: "Zone B",
    notes: "Monthly stock",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    totalCost: 50 * sampleProducts[1].purchasePrice,
  },
  {
    id: generateId("TXN"),
    type: "out",
    productId: sampleProducts[1].id,
    productName: sampleProducts[1].name,
    sku: sampleProducts[1].sku,
    quantity: 5,
    purchasePrice: sampleProducts[1].purchasePrice,
    sellingPrice: sampleProducts[1].sellingPrice,
    revenue: 5 * sampleProducts[1].sellingPrice,
    cost: 5 * sampleProducts[1].purchasePrice,
    profit: 5 * (sampleProducts[1].sellingPrice - sampleProducts[1].purchasePrice),
    customer: "XYZ Retail Store",
    reason: "Sale",
    reference: "INV-2024-002",
    notes: "Retail purchase",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: generateId("TXN"),
    type: "in",
    productId: sampleProducts[3].id,
    productName: sampleProducts[3].name,
    sku: sampleProducts[3].sku,
    quantity: 15,
    purchasePrice: sampleProducts[3].purchasePrice,
    sellingPrice: sampleProducts[3].sellingPrice,
    supplier: "Furniture Plus",
    batchLot: "BATCH-2024-003",
    zone: "Zone C",
    notes: "Office furniture stock",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    totalCost: 15 * sampleProducts[3].purchasePrice,
  },
];

// Function to initialize warehouse with sample data
export const initializeWarehouseData = () => {
  // Check if data already exists
  const existingProducts = localStorage.getItem("warehouse_products");
  const existingTransactions = localStorage.getItem("warehouse_transactions");

  if (!existingProducts && !existingTransactions) {
    console.log("Initializing warehouse with sample data...");
    saveProducts(sampleProducts);
    saveTransactions(sampleTransactions);
    saveUsers([
      {
        id: "USR-001",
        name: "Administrator",
        email: "admin@udevs.com",
        role: "Administrator",
        status: "Active",
        createdAt: new Date().toISOString(),
      },
    ]);
    console.log("Sample data initialized successfully!");
    return true;
  }

  console.log("Warehouse data already exists. Skipping initialization.");
  return false;
};

// Function to reset warehouse data (use with caution)
export const resetWarehouseData = () => {
  if (window.confirm("Are you sure you want to reset all warehouse data? This cannot be undone.")) {
    localStorage.removeItem("warehouse_products");
    localStorage.removeItem("warehouse_transactions");
    localStorage.removeItem("warehouse_users");
    initializeWarehouseData();
    window.location.reload();
  }
};

// Function to add sample products only
export const addSampleProducts = () => {
  const existingProducts = JSON.parse(localStorage.getItem("warehouse_products") || "[]");
  const newProducts = sampleProducts.filter(
    (sample) => !existingProducts.some((existing) => existing.sku === sample.sku)
  );
  
  if (newProducts.length > 0) {
    const updatedProducts = [...existingProducts, ...newProducts];
    saveProducts(updatedProducts);
    console.log(`Added ${newProducts.length} sample products.`);
    return newProducts.length;
  }
  
  console.log("All sample products already exist.");
  return 0;
};

// Function to add sample transactions only
export const addSampleTransactions = () => {
  const existingTransactions = JSON.parse(localStorage.getItem("warehouse_transactions") || "[]");
  const newTransactions = sampleTransactions.filter(
    (sample) => !existingTransactions.some((existing) => existing.id === sample.id)
  );
  
  if (newTransactions.length > 0) {
    const updatedTransactions = [...newTransactions, ...existingTransactions];
    saveTransactions(updatedTransactions);
    console.log(`Added ${newTransactions.length} sample transactions.`);
    return newTransactions.length;
  }
  
  console.log("All sample transactions already exist.");
  return 0;
};