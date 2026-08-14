function UserTable({
  filteredUsers,
  getRoleIcon,
  formatDate,
  onEdit,
  onDelete,
  handleToggleStatus,
}) {
  return (
    <div className="cb-table-wrap">
      {filteredUsers.length === 0 ? (
        <div className="text-center py-5">
          <div className="mb-3">
            <i className="bi bi-people fs-1 text-muted"></i>
          </div>
          <strong>No users found</strong>
          <p className="text-muted mb-0">
            Try another search or add a new user.
          </p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="cb-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Created</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <div className="admin-avatar">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <strong>{user.name}</strong>
                        <div className="small text-muted">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="pill pill-teal">
                      <i className={`bi ${getRoleIcon(user.role)}`}></i>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={`pill ${
                        user.status === "Active" ? "pill-teal" : "pill-amber"
                      } border-0`}
                      onClick={() => handleToggleStatus(user)}
                      title="Click to change status"
                    >
                      <i className="bi bi-circle-fill"></i>
                      {user.status}
                    </button>
                  </td>
                  <td className="mono">{formatDate(user.createdAt)}</td>
                  <td>
                    <div className="d-flex justify-content-end gap-2">
                      <button
                        type="button"
                        className="btn btn-sm btn-cb-outline"
                        onClick={() => onEdit(user)}
                        title="Edit user"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onDelete(user)}
                        title="Delete user"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserTable;
