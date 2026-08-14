function EmptyState({ icon, title, text }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <i className={`bi ${icon}`}></i>
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

export default EmptyState;