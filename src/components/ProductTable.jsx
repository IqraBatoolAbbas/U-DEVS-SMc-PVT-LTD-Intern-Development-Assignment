function ProductTable({ 
  products, 
  onEdit, 
  onDelete,
  isLowStock,
  onDeliveryStatusChange,
}) {
  const formatCurrency = (value) => {
    return `Rs. ${Number(value || 0).toLocaleString('en-PK', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-box-seam fs-1 text-muted"></i>
        <p className="text-muted mt-3">No products found</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>Product</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Purchase Price</th>
            <th>Selling Price</th>
            <th>Status</th>
            <th>Profit</th>
            
            <th>Delivery Status</th>
            <th>Actions</th>
            
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const profit = product.sellingPrice - product.purchasePrice;
            return (
            <tr key={product.id}>
              <td>
                <div className="d-flex align-items-center">
                  <div className="product-icon me-2">
                    <i className="bi bi-box"></i>
                  </div>
                  <div>
                    <div className="fw-bold">{product.name}</div>
                    <small className="text-muted">{product.id}</small>
                  </div>
                </div>
              </td>
              <td>
                <span className="badge bg-light text-dark">
                  {product.sku}
                </span>
              </td>
              <td>{product.category}</td>
              <td>
                <div className="d-flex align-items-center">
                  <span className={`fw-bold ${isLowStock(product) ? 'text-danger' : 'text-success'}`}>
                    {product.currentStock}
                  </span>
                  
                  {isLowStock(product) && (
                    <i className="bi bi-exclamation-triangle-fill text-danger ms-2 small"></i>
                  )}
                </div>
                <small className="text-muted">Min: {product.lowStockLimit}</small>
              </td>
              <td>{formatCurrency(product.purchasePrice)}</td>
              <td>{formatCurrency(product.sellingPrice)}</td>
              
              <td>
                <span className={`badge ${
                  product.status === 'Active' ? 'bg-success' : 'bg-secondary'
                }`}>
                  {product.status}
                </span>
              </td>
              <td><span className={`fw-bold ${profit < 0 ? 'text-danger' : 'text-success'}`}>{formatCurrency(profit)}</span></td>
              
              <td>
                <select
                  className="form-select form-select-sm"
                  value={product.deliveryStatus}
                  onChange={(e) => onDeliveryStatusChange(product.id, e.target.value)}
                  style={{ minWidth: '120px' }}
                >
                  <option value="Pending">Pending</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Picked Up">Picked Up</option>
                </select>

              </td>
              <td>
                <div className="btn-group btn-group-sm">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => onEdit(product)}
                    title="Edit"
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => onDelete(product.id)}
                    title="Delete"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </td>
              
            </tr>
            );
}) }
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;