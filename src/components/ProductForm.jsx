function ProductForm({ 
  formData, 
  onChange, 
  onSubmit, 
  onCancel, 
  isEditing = false,
  categories = []
}) {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="productName" className="form-label">
          Product Name *
        </label>
        <input
          type="text"
          className="form-control"
          id="productName"
          name="name"
          value={formData.name}
          onChange={onChange}
          required
          placeholder="Enter product name"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="productSku" className="form-label">
          SKU *
        </label>
        <input
          type="text"
          className="form-control"
          id="productSku"
          name="sku"
          value={formData.sku}
          onChange={onChange}
          required
          placeholder="Enter unique SKU"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="productCategory" className="form-label">
          Category *
        </label>
        <input
          type="text"
          className="form-control"
          id="productCategory"
          name="category"
          value={formData.category}
          onChange={onChange}
          required
          placeholder="Enter category"
          list="categoryList"
        />
        <datalist id="categoryList">
          {categories.map((category) => (
            <option key={category} value={category} />
          ))}
        </datalist>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="purchasePrice" className="form-label">
            Purchase Price *
          </label>
          <input
            type="number"
            className="form-control"
            id="purchasePrice"
            name="purchasePrice"
            value={formData.purchasePrice}
            onChange={onChange}
            required
            min="0"
            step="0.01"
            placeholder="0.00"
          />
        </div>

        <div className="col-md-6 mb-3">
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
            min="0"
            step="0.01"
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="currentStock" className="form-label">
            Current Stock
          </label>
          <input
            type="number"
            className="form-control"
            id="currentStock"
            name="currentStock"
            value={formData.currentStock}
            onChange={onChange}
            min="0"
            placeholder="0"
            disabled={isEditing}
          />
          {isEditing && (
            <small className="text-muted">
              Stock is updated through transactions
            </small>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="lowStockLimit" className="form-label">
            Low Stock Limit
          </label>
          <input
            type="number"
            className="form-control"
            id="lowStockLimit"
            name="lowStockLimit"
            value={formData.lowStockLimit}
            onChange={onChange}
            min="0"
            placeholder="10"
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="productStatus" className="form-label">
          Status *
        </label>
        <select
          className="form-select"
          id="productStatus"
          name="status"
          value={formData.status}
          onChange={onChange}
          required
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <div>
        <label htmlFor="deliveryStatus" className="form-label">
          Delivery Status
        </label>
        <select
          className="form-select"
          id="deliveryStatus"
          name="deliveryStatus"
          value={formData.deliveryStatus}
          onChange={onChange}
        >
          <option value="Pending">Pending</option>
          <option value="Delivered">Delivered</option>
          <option value="Picked Up">Picked Up</option>
        </select>
      </div>
      

      <div className="d-flex justify-content-end gap-2">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Update Product' : 'Add Product'}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;