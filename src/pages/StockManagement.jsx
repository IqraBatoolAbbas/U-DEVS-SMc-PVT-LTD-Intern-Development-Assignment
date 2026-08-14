import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import {
  getProducts,
  saveProducts,
  getTransactions,
  saveTransactions,
} from "../utils/storage";

import { generateId } from "../utils/idgenerator";
import { calculateTotalCost } from "../utils/calculations";

import StockInForm from "../components/StockInForm";
import StockOutForm from "../components/StockOutForm";

const getToday = () => {
  const date = new Date();
  return date.toISOString().split("T")[0];
};

const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function StockManagement() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState(() => getProducts());
  const [transactions, setTransactions] = useState(() => getTransactions());
  const [activeTab, setActiveTab] = useState(() => {
    const tab = searchParams.get("tab");
    if (tab === "stock-in" ) {
      return "stock-in";
    } 
      return "stock-out";
  });
  

  // Stock In Form State
  const [stockInForm, setStockInForm] = useState({
    selectedSku: "",
    supplier: "",
    quantity: "",
    unitCost: "",
    batchLot: "",
    zone: "",
    receivedDate: getToday(),
    notes: "",
  });

  // Stock Out Form State
  const [stockOutForm, setStockOutForm] = useState({
    selectedProductId: "",
    quantity: "",
    sellingPrice: "",
    customer: "",
    reason: "Sale",
    reference: "",
    date: getToday(),
    notes: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  // Selected Products
  const selectedStockInProduct = useMemo(() => {
    return products.find((product) => product.sku === stockInForm.selectedSku);
  }, [products, stockInForm.selectedSku]);

  const selectedStockOutProduct = useMemo(() => {
    return products.find(
      (product) => String(product.id) === String(stockOutForm.selectedProductId)
    );
  }, [products, stockOutForm.selectedProductId]);

  // Calculations
  const stockInCost = useMemo(() => {
    const quantity = Number(stockInForm.quantity) || 0;
    const cost = Number(stockInForm.unitCost) || 0;
    return calculateTotalCost(quantity, cost);
  }, [stockInForm.quantity, stockInForm.unitCost]);

  const stockOutCalculations = useMemo(() => {
    const quantity = Number(stockOutForm.quantity) || 0;
    const sellingPrice = Number(stockOutForm.sellingPrice) || Number(selectedStockOutProduct?.sellingPrice) || 0;
    const purchasePrice = Number(selectedStockOutProduct?.purchasePrice) || 0;
    const currentStock = Number(selectedStockOutProduct?.currentStock) || 0;

    const revenue = quantity * sellingPrice;
    const cost = quantity * purchasePrice;
    const profit = revenue - cost;
    const remainingStock = currentStock - quantity;

    return { revenue, cost, profit, remainingStock };
  }, [stockOutForm.quantity, stockOutForm.sellingPrice, selectedStockOutProduct]);

  // Recent Transactions
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);

  // Form Handlers
  const handleStockInChange = (event) => {
    const { name, value } = event.target;
    setStockInForm((prev) => ({ ...prev, [name]: value }));
    setMessage({ type: "", text: "" });

    if (name === "selectedSku") {
      const product = products.find((p) => p.sku === value);
      if (product) {
        setStockInForm((prev) => ({
          ...prev,
          unitCost: Number(product.purchasePrice ?? 0).toFixed(2),
        }));
      }
    }
  };

  const handleStockOutChange = (event) => {
    const { name, value } = event.target;
    setStockOutForm((prev) => ({ ...prev, [name]: value }));
    setMessage({ type: "", text: "" });

    if (name === "selectedProductId") {
      const product = products.find((p) => String(p.id) === String(value));
      if (product) {
        setStockOutForm((prev) => ({
          ...prev,
          sellingPrice: product.sellingPrice ?? "",
        }));
      }
    }
  };

  const handleStockInSubmit = (event) => {
    event.preventDefault();
    setMessage({ type: "", text: "" });

    if (!selectedStockInProduct) {
      setMessage({ type: "danger", text: "Please select a product." });
      return;
    }

    if (selectedStockInProduct.status === "Inactive") {
      setMessage({ type: "danger", text: "This product is inactive." });
      return;
    }

    const quantity = Number(stockInForm.quantity);
    const cost = Number(stockInForm.unitCost);

    if (quantity <= 0) {
      setMessage({ type: "danger", text: "Quantity must be greater than 0." });
      return;
    }

    if (cost <= 0) {
      setMessage({ type: "danger", text: "Unit cost must be greater than 0." });
      return;
    }

    // Update Product Stock
    const updatedProducts = products.map((product) => {
      if (product.sku !== stockInForm.selectedSku) return product;
      return {
        ...product,
        currentStock: Number(product.currentStock) + quantity,
        purchasePrice: cost,
      };
    });

    // Create Transaction
    const newTransaction = {
      id: generateId("TXN"),
      type: "in",
      productId: selectedStockInProduct.id,
      productName: selectedStockInProduct.name,
      sku: selectedStockInProduct.sku,
      quantity,
      purchasePrice: cost,
      sellingPrice: Number(selectedStockInProduct.sellingPrice || 0),
      supplier: stockInForm.supplier,
      batchLot: stockInForm.batchLot,
      zone: stockInForm.zone,
      notes: stockInForm.notes,
      date: new Date(`${stockInForm.receivedDate}T12:00:00`).toISOString(),
      totalCost: stockInCost,
    };

    const updatedTransactions = [newTransaction, ...transactions];

    saveProducts(updatedProducts);
    saveTransactions(updatedTransactions);
    setProducts(updatedProducts);
    setTransactions(updatedTransactions);

    setMessage({
      type: "success",
      text: `${quantity} units of ${selectedStockInProduct.name} added successfully.`,
    });

    // Reset Form
    setStockInForm({
      selectedSku: "",
      supplier: "",
      quantity: "",
      unitCost: "",
      batchLot: "",
      zone: "",
      receivedDate: getToday(),
      notes: "",
    });
  };

  const handleStockOutSubmit = (event) => {
    event.preventDefault();
    setMessage({ type: "", text: "" });

    if (!selectedStockOutProduct) {
      setMessage({ type: "danger", text: "Please select a product." });
      return;
    }

    const quantity = Number(stockOutForm.quantity);
    const sellingPrice = Number(stockOutForm.sellingPrice);
    const currentStock = Number(selectedStockOutProduct.currentStock);

    if (quantity <= 0) {
      setMessage({ type: "danger", text: "Quantity must be greater than 0." });
      return;
    }

    if (quantity > currentStock) {
      setMessage({ type: "danger", text: `Insufficient stock. Only ${currentStock} available.` });
      return;
    }

    if (sellingPrice <= 0) {
      setMessage({ type: "danger", text: "Selling price must be greater than 0." });
      return;
    }

    // Update Product Stock
    const updatedProducts = products.map((product) => {
      if (String(product.id) !== String(selectedStockOutProduct.id)) return product;
      return {
        ...product,
        currentStock: currentStock - quantity,
      };
    });

    // Create Transaction
    const newTransaction = {
      id: generateId("TXN"),
      type: "out",
      productId: selectedStockOutProduct.id,
      productName: selectedStockOutProduct.name,
      sku: selectedStockOutProduct.sku,
      quantity,
      sellingPrice,
      purchasePrice: Number(selectedStockOutProduct.purchasePrice),
      revenue: stockOutCalculations.revenue,
      cost: stockOutCalculations.cost,
      profit: stockOutCalculations.profit,
      customer: stockOutForm.customer.trim(),
      reason: stockOutForm.reason,
      reference: stockOutForm.reference.trim(),
      notes: stockOutForm.notes.trim(),
      date: new Date(`${stockOutForm.date}T${new Date().toTimeString().slice(0, 8)}`).toISOString(),
    };

    const updatedTransactions = [newTransaction, ...transactions];

    saveProducts(updatedProducts);
    saveTransactions(updatedTransactions);
    setProducts(updatedProducts);
    setTransactions(updatedTransactions);

    setMessage({
      type: "success",
      text: `${quantity} units of ${selectedStockOutProduct.name} issued successfully.`,
    });

    // Reset Form
    setStockOutForm({
      selectedProductId: "",
      quantity: "",
      sellingPrice: "",
      customer: "",
      reason: "Sale",
      reference: "",
      date: getToday(),
      notes: "",
    });
  };

  const resetStockInForm = () => {
    setStockInForm({
      selectedSku: "",
      supplier: "",
      quantity: "",
      unitCost: "",
      batchLot: "",
      zone: "",
      receivedDate: getToday(),
      notes: "",
    });
    setMessage({ type: "", text: "" });
  };

  const resetStockOutForm = () => {
    setStockOutForm({
      selectedProductId: "",
      quantity: "",
      sellingPrice: "",
      customer: "",
      reason: "Sale",
      reference: "",
      date: getToday(),
      notes: "",
    });
    setMessage({ type: "", text: "" });
  };

  return (
    <div className="stock-management-page app-page">
      <div className="page-header">
        <div>
          <span className="page-label">INVENTORY OPERATIONS</span>
          <h1>Stock Management</h1>
          <p>Handle stock receipts and issues with tracking and validation.</p>
        </div>
      </div>

      {message.text && (
        <div className={`alert alert-${message.type} alert-dismissible fade show`}>
          {message.text}
          <button
            type="button"
            className="btn-close"
            onClick={() => setMessage({ type: "", text: "" })}
          ></button>
        </div>
      )}

      <div className="row">
        <div className="col-lg-8">
          <div className="card premium-card">
            <div className="card-header">
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === "stock-in" ? "active" : ""}`}
                    onClick={() => setActiveTab("stock-in")}
                  >
                    <i className="bi bi-box-arrow-in-down me-2"></i>
                    Stock In
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === "stock-out" ? "active" : ""}`}
                    onClick={() => setActiveTab("stock-out")}
                  >
                    <i className="bi bi-box-arrow-up me-2"></i>
                    Stock Out
                  </button>
                </li>
              </ul>
            </div>
            <div className="card-body">
              {activeTab === "stock-in" ? (
                <StockInForm
                  products={products}
                  formData={stockInForm}
                  onChange={handleStockInChange}
                  onSubmit={handleStockInSubmit}
                  onReset={resetStockInForm}
                  selectedProduct={selectedStockInProduct}
                  calculatedCost={stockInCost}
                />
              ) : (
                <StockOutForm
                  products={products}
                  formData={stockOutForm}
                  onChange={handleStockOutChange}
                  onSubmit={handleStockOutSubmit}
                  onReset={resetStockOutForm}
                  selectedProduct={selectedStockOutProduct}
                  calculations={stockOutCalculations}
                />
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card mb-3">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="bi bi-clock-history me-2"></i>
                Recent Transactions
              </h5>
            </div>
            <div className="card-body">
              {recentTransactions.length === 0 ? (
                <div className="text-center py-4 text-muted">
                  <i className="bi bi-inbox fs-1"></i>
                  <p className="mt-2">No transactions yet</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-sm table-hover">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((txn) => (
                        <tr key={txn.id}>
                          <td>
                            <span
                              className={`badge ${
                                txn.type === "in" ? "bg-success" : "bg-warning"
                              }`}
                            >
                              {txn.type === "in" ? "IN" : "OUT"}
                            </span>
                          </td>
                          <td>{txn.productName}</td>
                          <td>{txn.quantity}</td>
                          <td>{formatDate(txn.date)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          <div className="card premium-card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="bi bi-info-circle me-2"></i>
                Quick Stats
              </h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Total Products:</span>
                <strong>{products.length}</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Total Stock:</span>
                <strong>
                  {products.reduce((sum, p) => sum + Number(p.currentStock), 0)}
                </strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Active Products:</span>
                <strong>
                  {products.filter((p) => p.status === "Active").length}
                </strong>
              </div>
              <div className="d-flex justify-content-between">
                <span>Low Stock Items:</span>
                <strong className="text-danger">
                  {
                    products.filter(
                      (p) => Number(p.currentStock) <= Number(p.lowStockLimit)
                    ).length
                  }
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockManagement;