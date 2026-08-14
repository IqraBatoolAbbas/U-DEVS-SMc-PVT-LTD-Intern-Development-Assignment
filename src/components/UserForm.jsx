function UserForm({
  name,
  email,
  role,
  status,
  setName,
  setEmail,
  setRole,
  setStatus,
}) {
  return (
    <>
      <div className="mb-3">
        <label htmlFor="userName" className="cb-label">
          Full Name <span className="req">*</span>
        </label>
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-person"></i>
          </span>
          <input
            id="userName"
            type="text"
            className="form-control"
            placeholder="e.g. Ali Khan"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="userEmail" className="cb-label">
          Email Address <span className="req">*</span>
        </label>
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-envelope"></i>
          </span>
          <input
            id="userEmail"
            type="email"
            className="form-control"
            placeholder="user@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor="userRole" className="cb-label">
            Role
          </label>
          <select
            id="userRole"
            className="form-select"
            value={role}
            onChange={(event) => setRole(event.target.value)}
          >
            <option value="Staff">Staff</option>
            <option value="Manager">Manager</option>
            <option value="Administrator">Administrator</option>
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="userStatus" className="cb-label">
            Status
          </label>
          <select
            id="userStatus"
            className="form-select"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default UserForm;
