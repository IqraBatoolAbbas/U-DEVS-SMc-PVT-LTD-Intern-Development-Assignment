function StatCard({ icon, title, value, color = "default" }) {
  const colorClasses = {
    default: "stat-default",
    green: "stat-green",
    orange: "stat-orange",
    blue: "stat-blue",
    red: "stat-red",
    purple: "stat-purple",
    warning: "stat-warning",
  };

  return (
    <div className={`stat-card ${colorClasses[color] || colorClasses.default}`}>
      <div className="stat-icon">
        <i className={`bi ${icon}`}></i>
      </div>
      <div className="stat-content">
        <span className="stat-label">{title}</span>
        <span className="stat-value">{value}</span>
      </div>
    </div>
  );
}

export default StatCard;