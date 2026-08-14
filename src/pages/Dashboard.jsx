import { useState } from "react";
import { Link } from "react-router-dom";

import {
  getProducts,
  getTransactions,
} from "../utils/storage";

import {
  getTotalStock,
  getStockIn,
  getStockOut,
  getRevenue,
  getCost,
  getProfit,
  getLowStockProducts,
} from "../utils/calculations";

import StatCard from "../components/StatCard";
import EmptyState from "../components/EmptyState";

function Dashboard() {

  const [products] = useState(() => getProducts());

  const [transactions] = useState(() => getTransactions());

  const totalProducts = products.length;

  const totalStock = getTotalStock(products);

  const stockIn = getStockIn(transactions);

  const stockOut = getStockOut(transactions);

  const totalRevenue = getRevenue(transactions);

  const totalCost = getCost(transactions);

  const totalProfit = getProfit(transactions);

  const lowStockProducts =
    getLowStockProducts(products);

  const recentTransactions = [...transactions]
    .sort(
      (a, b) =>
        new Date(b.date) - new Date(a.date)
    )
    .slice(0, 6);

  const formatCurrency = (value) => {
    return `Rs. ${Number(value).toLocaleString()}`;
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-PK",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <div className="dashboard-page app-page">

      {/* HEADER */}

      <div className="dashboard-header">

        <div>
          <span className="dashboard-label">
            WAREHOUSE OVERVIEW
          </span>

          <h1>Dashboard</h1>

          <p>
            Monitor your inventory and warehouse
            performance at a glance.
          </p>
        </div>

        <div className="dashboard-date">
          <i className="bi bi-calendar3"></i>

          {new Date().toLocaleDateString(
            "en-PK",
            {
              weekday: "long",
              day: "2-digit",
              month: "long",
              year: "numeric",
            }
          )}
        </div>

      </div>


      {/* STATISTICS */}

      <div className="stats-grid">

        <StatCard
          icon="bi-box-seam"
          title="Total Products"
          value={totalProducts}
        />

        <StatCard
          icon="bi-stack"
          title="Total Stock"
          value={totalStock}
        />

        <StatCard
          icon="bi-box-arrow-in-down"
          title="Stock In"
          value={stockIn}
          color="green"
        />

        <StatCard
          icon="bi-box-arrow-up"
          title="Stock Out"
          value={stockOut}
          color="orange"
        />

        <StatCard
          icon="bi-cash-stack"
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          color="blue"
        />

        <StatCard
          icon="bi-wallet2"
          title="Total Cost"
          value={formatCurrency(totalCost)}
          color="red"
        />

        <StatCard
          icon="bi-graph-up-arrow"
          title="Total Profit"
          value={formatCurrency(totalProfit)}
          color="purple"
        />

        <StatCard
          icon="bi-exclamation-triangle"
          title="Low Stock Items"
          value={lowStockProducts.length}
          color="warning"
        />

      </div>


      {/* MAIN CONTENT */}

      <div className="dashboard-main-grid">

        {/* RECENT ACTIVITY */}

        <section className="dashboard-panel">

          <div className="panel-header">

            <div>
              <span className="panel-kicker">
                TRANSACTIONS
              </span>

              <h2>Recent Stock Activity</h2>
            </div>

            <Link
              to="/stock"
              className="panel-action"
            >
              View All
              <i className="bi bi-arrow-up-right"></i>
            </Link>

          </div>

          {recentTransactions.length === 0 ? (

            <EmptyState
              icon="bi-clock-history"
              title="No recent activity"
              text="Stock transactions will appear here."
            />

          ) : (

            <div className="activity-table-wrapper">

              <table className="dashboard-table">

                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Type</th>
                    <th>Quantity</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>

                  {recentTransactions.map(
                    (transaction) => (

                      <tr key={transaction.id}>

                        <td>
                          <div className="product-cell">

                            <div className="product-mini-icon">
                              <i className="bi bi-box"></i>
                            </div>

                            <span>
                              {transaction.productName ||
                                "Unknown Product"}
                            </span>

                          </div>
                        </td>

                        <td>

                          <span
                            className={`transaction-badge ${
                              transaction.type === "in"
                                ? "in"
                                : "out"
                            }`}
                          >
                            {transaction.type === "in"
                              ? "Stock In"
                              : "Stock Out"}
                          </span>

                        </td>

                        <td>
                          <strong>
                            {transaction.quantity}
                          </strong>
                        </td>

                        <td>
                          {formatDate(transaction.date)}
                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </section>


        {/* LOW STOCK */}

        <section className="dashboard-panel">

          <div className="panel-header">

            <div>
              <span className="panel-kicker">
                INVENTORY ALERT
              </span>

              <h2>Low Stock</h2>
            </div>

            <span className="low-count">
              {lowStockProducts.length}
            </span>

          </div>

          {lowStockProducts.length === 0 ? (

            <EmptyState
              icon="bi-check2-circle"
              title="Inventory looks good"
              text="No products are currently low on stock."
            />

          ) : (

            <div className="low-stock-list">

              {lowStockProducts
                .slice(0, 5)
                .map((product) => (

                  <div
                    className="low-stock-item"
                    key={product.id}
                  >

                    <div className="low-product-icon">
                      <i className="bi bi-box-seam"></i>
                    </div>

                    <div className="low-product-info">

                      <strong>
                        {product.name}
                      </strong>

                      <span>
                        SKU: {product.sku}
                      </span>

                    </div>

                    <div className="stock-number">

                      <strong>
                        {product.currentStock}
                      </strong>

                      <span>
                        left
                      </span>

                    </div>

                  </div>

                ))}

            </div>

          )}

        </section>

      </div>


      {/* QUICK ACTIONS */}

      <section className="quick-actions">

        <div className="quick-title">

          <span>QUICK ACTIONS</span>

          <h2>Warehouse Operations</h2>

        </div>

        <div className="quick-buttons">

          <Link
            to="/products"
            className="quick-button"
          >
            <i className="bi bi-plus-circle"></i>

            <div>
              <strong>Add Product</strong>
              <span>Create new inventory item</span>
            </div>

            <i className="bi bi-arrow-up-right arrow"></i>
          </Link>

          <Link
            to="/stock?tab=in"
            className="quick-button"
          >
            <i className="bi bi-box-arrow-in-down"></i>

            <div>
              <strong>Stock In</strong>
              <span>Receive incoming inventory</span>
            </div>

            <i className="bi bi-arrow-up-right arrow"></i>
          </Link>

          <Link
            to="/stock?tab=out"
            className="quick-button"
          >
            <i className="bi bi-box-arrow-up"></i>

            <div>
              <strong>Stock Out</strong>
              <span>Issue or sell stock</span>
            </div>

            <i className="bi bi-arrow-up-right arrow"></i>
          </Link>

          <Link
            to="/users"
            className="quick-button"
          >
            <i className="bi bi-person-plus"></i>

            <div>
              <strong>Add User</strong>
              <span>Create administrator account</span>
            </div>

            <i className="bi bi-arrow-up-right arrow"></i>
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;