import { useMemo, useState } from "react";

import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  saveProducts,
} from "../utils/storage";

import { generateId } from "../utils/idgenerator";

import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import ConfirmModal from "../components/ConfirmModal";

const emptyForm = {
  name: "",
  sku: "",
  category: "",
  purchasePrice: "",
  sellingPrice: "",
  currentStock: 0,
  lowStockLimit: 10,
  status: "Active",
  deliveryStatus: "pending",
};

function Products() {
  /* =========================================
     PRODUCTS STATE
  ========================================= */
const [products, setProducts] = useState(() => getProducts());

  /* =========================================
     FORM STATE
  ========================================= */

  const [formData, setFormData] = useState(emptyForm);

  const [editingId, setEditingId] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);

  /* =========================================
     SEARCH / FILTER STATE
  ========================================= */

  const [searchTerm, setSearchTerm] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("All");

  const [statusFilter, setStatusFilter] = useState("All");


  /* =========================================
     UNIQUE CATEGORIES
  ========================================= */

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
      ),
    ];

    return uniqueCategories.sort();
  }, [products]);

  /* =========================================
     FILTER PRODUCTS
  ========================================= */

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        product.name.toLowerCase().includes(search) ||
        product.sku.toLowerCase().includes(search);

      const matchesCategory =
        categoryFilter === "All" ||
        product.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All" ||
        product.status === statusFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [
    products,
    searchTerm,
    categoryFilter,
    statusFilter,
  ]);

  /* =========================================
     FORM INPUT HANDLER
  ========================================= */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =========================================
     OPEN ADD MODAL
  ========================================= */

  const openAddModal = () => {
    setEditingId(null);

    setFormData({
      ...emptyForm,
      currentStock: 0,
      lowStockLimit: 10,
      status: "Active",
    });

    setShowModal(true);
  };

  /* =========================================
     OPEN EDIT MODAL
  ========================================= */

  const openEditModal = (product) => {
    setEditingId(product.id);

    setFormData({
      name: product.name,
      sku: product.sku,
      category: product.category,
      purchasePrice: product.purchasePrice,
      sellingPrice: product.sellingPrice,
      currentStock: product.currentStock,
      lowStockLimit: product.lowStockLimit,
      status: product.status,
      deliveryStatus: product.deliveryStatus || "pending",
    });

    setShowModal(true);
  };

  /* =========================================
     CLOSE MODAL
  ========================================= */

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData(emptyForm);
  };

  /* =========================================
     VALIDATE FORM
  ========================================= */

  const validateForm = () => {
    if (!formData.name.trim()) {
      alert("Product name is required.");
      return false;
    }

    if (!formData.sku.trim()) {
      alert("SKU is required.");
      return false;
    }

    if (!formData.category.trim()) {
      alert("Category is required.");
      return false;
    }

    const purchasePrice = Number(
      formData.purchasePrice
    );

    const sellingPrice = Number(
      formData.sellingPrice
    );

    const currentStock = Number(
      formData.currentStock
    );

    const lowStockLimit = Number(
      formData.lowStockLimit
    );

    if (
      !Number.isFinite(purchasePrice) ||
      purchasePrice <= 0
    ) {
      alert(
        "Purchase price must be greater than 0."
      );
      return false;
    }

    if (
      !Number.isFinite(sellingPrice) ||
      sellingPrice <= 0
    ) {
      alert(
        "Selling price must be greater than 0."
      );
      return false;
    }

    if (sellingPrice < purchasePrice) {
      alert(
        "Selling price should be greater than or equal to purchase price."
      );
      return false;
    }

    if (
      !Number.isFinite(currentStock) ||
      currentStock < 0
    ) {
      alert(
        "Current stock cannot be negative."
      );
      return false;
    }

    if (
      !Number.isFinite(lowStockLimit) ||
      lowStockLimit < 0
    ) {
      alert(
        "Low stock limit cannot be negative."
      );
      return false;
    }

    /* =========================================
       SKU UNIQUENESS
    ========================================= */

    const duplicateSKU = products.some(
      (product) =>
        product.sku.toLowerCase() ===
          formData.sku.trim().toLowerCase() &&
        product.id !== editingId
    );

    if (duplicateSKU) {
      alert(
        "This SKU already exists. Please use a unique SKU."
      );
      return false;
    }

    return true;
  };

  /* =========================================
     ADD / UPDATE PRODUCT
  ========================================= */

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const productData = {
      name: formData.name.trim(),
      sku: formData.sku.trim(),
      category: formData.category.trim(),
      purchasePrice: Number(
        formData.purchasePrice
      ),
      sellingPrice: Number(
        formData.sellingPrice
      ),
      currentStock: Number(
        formData.currentStock
      ),
      lowStockLimit: Number(
        formData.lowStockLimit
      ),
      status: formData.status,
    };

    /* =========================================
       UPDATE
    ========================================= */

    if (editingId) {
      const updatedProducts = updateProduct(
  editingId,
  productData
);

setProducts(updatedProducts);

      closeModal();

      return;
    }

    /* =========================================
       CREATE
    ========================================= */
    const newProduct = {
      id: generateId("PROD"),
      ...productData,
      deliveryStatus: productData.deliveryStatus || "pending",
      createdAt: new Date().toISOString(),
    };

    const updatedProducts = addProduct(newProduct);

    setProducts(updatedProducts);
    closeModal();
  };

  /* =========================================
     DELETE PRODUCT
  ========================================= */

  const requestDelete = (id) => {
    const product = products.find((item) => item.id === id);

    if (!product) {
      return;
    }

    setDeleteTarget(product);
  };

  const confirmDelete = () => {
    if (!deleteTarget) {
      return;
    }

    const updatedProducts = deleteProduct(deleteTarget.id);
    setProducts(updatedProducts);
    setDeleteTarget(null);
  };

  /* =========================================
     CLEAR FILTERS
  ========================================= */

  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("All");
    setStatusFilter("All");
  };

  const isLowStock = (product) => {
    return (
      Number(product.currentStock) <=
      Number(product.lowStockLimit)
    );
  };

  /* =========================================
     DELIVERY STATUS CHANGE
  ========================================= */

  const handleDeliveryStatusChange = (productId, newStatus) => {
    const updatedProducts = products.map((product) =>
      product.id === productId
        ? { ...product, deliveryStatus: newStatus }
        : product
    );
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
  };

  return (
    <div className="products-page app-page">

      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <div className="page-header">

        <div>
          <span className="page-label">
            INVENTORY MANAGEMENT
          </span>

          <h1>Products</h1>

          <p>
            Manage your warehouse products,
            pricing and stock information.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={openAddModal}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Add Product
        </button>

      </div>


      {/* =====================================
          SUMMARY CARDS
      ===================================== */}

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card summary-card">
            <div className="card-body">
              <div className="summary-icon product">
                <i className="bi bi-box-seam"></i>
              </div>
              <div className="summary-content">
                <span className="summary-label">Total Products</span>
                <strong className="summary-value">{products.length}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card summary-card">
            <div className="card-body">
              <div className="summary-icon success">
                <i className="bi bi-check-circle"></i>
              </div>
              <div className="summary-content">
                <span className="summary-label">Active Products</span>
                <strong className="summary-value">
                  {products.filter((product) => product.status === "Active").length}
                </strong>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card summary-card">
            <div className="card-body">
              <div className="summary-icon warning">
                <i className="bi bi-exclamation-triangle"></i>
              </div>
              <div className="summary-content">
                <span className="summary-label">Low Stock</span>
                <strong className="summary-value">
                  {products.filter((product) => isLowStock(product)).length}
                </strong>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card summary-card">
            <div className="card-body">
              <div className="summary-icon info">
                <i className="bi bi-tags"></i>
              </div>
              <div className="summary-content">
                <span className="summary-label">Categories</span>
                <strong className="summary-value">{categories.length}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* =====================================
          SEARCH & FILTERS
      ===================================== */}

      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by product name or SKU..."
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                />
              </div>
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={categoryFilter}
                onChange={(event) =>
                  setCategoryFilter(event.target.value)
                }
              >
                <option value="All">
                  All Categories
                </option>

                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
              >
                <option value="All">
                  All Status
                </option>

                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>
            </div>

            <div className="col-md-2">
              {(searchTerm ||
                categoryFilter !== "All" ||
                statusFilter !== "All") && (
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100"
                  onClick={clearFilters}
                >
                  <i className="bi bi-x-lg me-1"></i>
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>


      {/* =====================================
          PRODUCT TABLE
      ===================================== */}

      <div className="card premium-card">

        <div className="card-header d-flex justify-content-between align-items-center">

          <div>
            <span className="page-label">PRODUCT CATALOG</span>
            <h2 className="h5 mb-0">All Products</h2>
          </div>

          <span className="product-count-badge">
            {filteredProducts.length} products
          </span>

        </div>

        <div className="card-body">

          {filteredProducts.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                <i className="bi bi-box-seam"></i>
              </div>

              <h3>
                {products.length === 0
                  ? "No products yet"
                  : "No products found"}
              </h3>

              <p>
                {products.length === 0
                  ? "Start by adding your first warehouse product."
                  : "Try changing your search or filters."}
              </p>

              {products.length === 0 ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={openAddModal}
                >
                  <i className="bi bi-plus-lg me-2"></i>
                  Add First Product
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              )}

            </div>

          ) : (
            <ProductTable
              products={filteredProducts}
              onEdit={openEditModal}
              onDelete={requestDelete}
              isLowStock={isLowStock}
              onDeliveryStatusChange={handleDeliveryStatusChange}
            />
          )}

        </div>

      </div>


      {/* =====================================
          ADD / EDIT MODAL
      ===================================== */}

      {showModal && (

        <div
          className="modal fade show premium-modal"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >

          <div className="modal-dialog modal-dialog-centered modal-lg">

            <div className="modal-content">

              <div className="modal-header">

                <h5 className="modal-title">
                  {editingId
                    ? "Edit Product"
                    : "Add New Product"}
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  aria-label="Close"
                ></button>

              </div>

              <div className="modal-body">
                <ProductForm
                  formData={formData}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  onCancel={closeModal}
                  isEditing={!!editingId}
                  categories={categories}
                />
              </div>

            </div>

          </div>

        </div>
      )}

      <ConfirmModal
        show={!!deleteTarget}
        onHide={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete Product"
        message={
          deleteTarget
            ? `Are you sure you want to delete "${deleteTarget.name}"? This action cannot be undone.`
            : ""
        }
        confirmText="Delete"
        variant="danger"
      />

    </div>
  );
}

export default Products;