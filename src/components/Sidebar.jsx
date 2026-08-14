
import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: "bi-grid-1x2-fill",
    },
    {
      name: "Products",
      path: "/products",
      icon: "bi-box-seam-fill",
    },
    {
      name: "Stock Management",
      path: "/stock",
      icon: "bi-box-seam",
    },
    {
      name: "Users",
      path: "/users",
      icon: "bi-people-fill",
    },
  ];

  return (
    <aside className="sidebar">

      {/* BRAND */}
      <div className="sidebar-brand">

        <div className="brand-icon">
          <i className="bi bi-boxes"></i>
        </div>

        <div className="brand-text">
          <h5>UDEVS</h5>
          <span>Warehouse</span>
        </div>

      </div>


      {/* MENU */}
      <div className="sidebar-menu">

        <p className="menu-title">
          MAIN MENU
        </p>

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            title={item.name}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >

            <i className={`bi ${item.icon}`}></i>

            <span className="sidebar-link-text">
              {item.name}
            </span>

          </NavLink>
        ))}

      </div>


      {/* FOOTER */}
      <div className="sidebar-footer">

        <div className="admin-avatar">
          A
        </div>

        <div className="admin-info">
          <strong>Administrator</strong>
          <small>Warehouse Admin</small>
        </div>

      </div>

    </aside>
  );
}

export default Sidebar;
