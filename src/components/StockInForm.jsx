function StockInForm({
  products,
  formData,
  onChange,
  onSubmit,
  onReset,
  selectedProduct,
  calculatedCost
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
            name="selectedSku"
            value={formData.selectedSku}
            onChange={onChange}
            required
          >
            <option value="">Select a product</option>
            {products
              .filter(p => p.status === 'Active')
              .map(product => (
                <option key={product.sku} value={product.sku}>
                  {product.name} ({product.sku}) - Stock: {product.currentStock}
                </option>
              ))}
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="supplier" className="form-label">
            Supplier *
          </label>
          <input
            type="text"
            className="form-control"
            id="supplier"
            name="supplier"
            value={formData.supplier}
            onChange={onChange}
            required
            placeholder="Enter supplier name"
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
            placeholder="0"
          />
        </div>

        <div className="col-md-4 mb-3">
          <label htmlFor="unitCost" className="form-label">
            Unit Cost *
          </label>
          <input
            type="number"
            className="form-control"
            id="unitCost"
            name="unitCost"
            value={formData.unitCost}
            onChange={onChange}
            required
            min="0.01"
            step="0.01"
            placeholder="0.00"
          />
        </div>

        <div className="col-md-4 mb-3">
          <label htmlFor="receivedDate" className="form-label">
            Received Date *
          </label>
          <input
            type="date"
            className="form-control"
            id="receivedDate"
            name="receivedDate"
            value={formData.receivedDate}
            onChange={onChange}
            required
          />
        </div>
      </div>

      {selectedProduct && (
        <div className="alert alert-info mb-3">
          <div className="d-flex justify-content-between">
            <span><strong>Product:</strong> {selectedProduct.name}</span>
            <span><strong>Current Stock:</strong> {selectedProduct.currentStock}</span>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <span><strong>Quantity:</strong> {formData.quantity || 0}</span>
            <span><strong>Unit Cost:</strong> {formatCurrency(formData.unitCost)}</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <strong>Total Cost:</strong>
            <strong>{formatCurrency(calculatedCost)}</strong>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="batchLot" className="form-label">
            Batch/Lot Number
          </label>
          <input
            type="text"
            className="form-control"
            id="batchLot"
            name="batchLot"
            value={formData.batchLot}
            onChange={onChange}
            placeholder="Optional"
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="zone" className="form-label">
            Warehouse Zone *
          </label>
          <select
            className="form-select"
            id="zone"
            name="zone"
            value={formData.zone}
            onChange={onChange}
            required
          >
            <option value="">Select zone</option>
            <option value="Zone A">Zone A</option>
            <option value="Zone B">Zone B</option>
            <option value="Zone C">Zone C</option>
            <option value="Zone D">Zone D</option>
          </select>
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
        <button type="submit" className="btn btn-success">
          <i className="bi bi-box-arrow-in-down me-2"></i>
          Stock In
        </button>
      </div>
    </form>
  );
}

export default StockInForm;