function StockOutForm({
  products,
  formData,
  onChange,
  onSubmit,
  onReset,
  selectedProduct,
  calculations
}) {
  const formatCurrency = (value) => {
    return `Rs. ${Number(value || 0).toLocaleString('en-PK', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="productSelect" className="form-label">
            Product *
          </label>
          <select
            className="form-select"
            id="productSelect"
            name="selectedProductId"
            value={formData.selectedProductId}
            onChange={onChange}
            required
          >
            <option value="">Select a product</option>
            {products
              .filter(p => p.status === 'Active' && p.currentStock > 0)
              .map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} ({product.sku}) - Stock: {product.currentStock}
                </option>
              ))}
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="customer" className="form-label">
            Customer
          </label>
          <input
            type="text"
            className="form-control"
            id="customer"
            name="customer"
            value={formData.customer}
            onChange={onChange}
            placeholder="Enter customer name"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity *
          </label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={onChange}
            required
            min="1"
            max={selectedProduct?.currentStock || 0}
            placeholder="0"
          />
        </div>

        <div className="col-md-4 mb-3">
          <label htmlFor="sellingPrice" className="form-label">
            Selling Price *
          </label>
          <input
            type="number"
            className="form-control"
            id="sellingPrice"
            name="sellingPrice"
            value={formData.sellingPrice}
            onChange={onChange}
            required
            min="0.01"
            step="0.01"
            placeholder="0.00"
          />
        </div>

        <div className="col-md-4 mb-3">
          <label htmlFor="date" className="form-label">
            Date *
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={formData.date}
            onChange={onChange}
            required
          />
        </div>
      </div>

      {selectedProduct && (
        <div className="alert alert-info mb-3">
          <div className="d-flex justify-content-between">
            <span><strong>Product:</strong> {selectedProduct.name}</span>
            <span><strong>Available Stock:</strong> {selectedProduct.currentStock}</span>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <span><strong>Quantity:</strong> {formData.quantity || 0}</span>
            <span><strong>Selling Price:</strong> {formatCurrency(formData.sellingPrice)}</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <span><strong>Revenue:</strong> {formatCurrency(calculations.revenue)}</span>
            <span><strong>Cost:</strong> {formatCurrency(calculations.cost)}</span>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <strong>Profit:</strong>
            <strong className={calculations.profit >= 0 ? 'text-success' : 'text-danger'}>
              {formatCurrency(calculations.profit)}
            </strong>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <span><strong>Remaining Stock:</strong></span>
            <span className={calculations.remainingStock < selectedProduct.lowStockLimit ? 'text-danger' : 'text-success'}>
              {calculations.remainingStock}
            </span>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="reason" className="form-label">
            Reason *
          </label>
          <select
            className="form-select"
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={onChange}
            required
          >
            <option value="Sale">Sale</option>
            <option value="Return">Return</option>
            <option value="Damage">Damage</option>
            <option value="Loss">Loss</option>
            <option value="Transfer">Transfer</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="reference" className="form-label">
            Reference
          </label>
          <input
            type="text"
            className="form-control"
            id="reference"
            name="reference"
            value={formData.reference}
            onChange={onChange}
            placeholder="Invoice #, Order #, etc."
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="notes" className="form-label">
          Notes
        </label>
        <textarea
          className="form-control"
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={onChange}
          rows="3"
          placeholder="Optional notes..."
        />
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onReset}
        >
          Reset
        </button>
        <button type="submit" className="btn btn-warning">
          <i className="bi bi-box-arrow-up me-2"></i>
          Stock Out
        </button>
      </div>
    </form>
  );
}

export default StockOutForm;