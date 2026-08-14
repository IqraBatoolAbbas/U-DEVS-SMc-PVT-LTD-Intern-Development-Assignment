import { useState } from "react";

import {
  getUsers,
  saveUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../utils/storage";

import { generateId } from "../utils/idgenerator";

import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";
import ConfirmModal from "../components/ConfirmModal";

function Users() {
  const [users, setUsers] = useState(() => getUsers());

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Staff");
  const [status, setStatus] = useState("Active");

  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const filteredUsers = users.filter((user) => {
    const searchText = search.trim().toLowerCase();

    return (
      user.name.toLowerCase().includes(searchText) ||
      user.email.toLowerCase().includes(searchText) ||
      user.role.toLowerCase().includes(searchText) ||
      user.status.toLowerCase().includes(searchText)
    );
  });

  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === "Active").length;
  const adminUsers = users.filter(
    (user) => user.role === "Administrator"
  ).length;

  const resetForm = () => {
    setName("");
    setEmail("");
    setRole("Staff");
    setStatus("Active");
    setEditingUser(null);
  };

  const clearMessage = () => {
    setMessage({ type: "", text: "" });
  };

  const openAddModal = () => {
    resetForm();
    clearMessage();
    setShowModal(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setStatus(user.status);
    clearMessage();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const persistUsers = (updatedUsers) => {
    setUsers(updatedUsers);
    saveUsers(updatedUsers);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!trimmedName || !normalizedEmail) {
      setMessage({
        type: "danger",
        text: "Please enter user name and email.",
      });
      return;
    }

    if (trimmedName.length < 2) {
      setMessage({
        type: "danger",
        text: "User name must contain at least 2 characters.",
      });
      return;
    }

    if (editingUser) {
      const duplicateEmail = users.some(
        (user) =>
          user.id !== editingUser.id &&
          user.email.trim().toLowerCase() === normalizedEmail
      );

      if (duplicateEmail) {
        setMessage({
          type: "danger",
          text: "A user with this email already exists.",
        });
        return;
      }

      if (
        editingUser.role === "Administrator" &&
        editingUser.status === "Active" &&
        status === "Inactive"
      ) {
        const activeAdminCount = users.filter(
          (user) =>
            user.role === "Administrator" && user.status === "Active"
        ).length;

        if (activeAdminCount <= 1) {
          setMessage({
            type: "danger",
            text: "The last active administrator cannot be deactivated.",
          });
          return;
        }
      }

      const updatedUsers = updateUser(editingUser.id, {
        name: trimmedName,
        email: normalizedEmail,
        role,
        status,
      });

      persistUsers(updatedUsers);

      setMessage({
        type: "success",
        text: `${trimmedName} has been updated successfully.`,
      });

      closeModal();
      return;
    }

    const emailExists = users.some(
      (user) => user.email.trim().toLowerCase() === normalizedEmail
    );

    if (emailExists) {
      setMessage({
        type: "danger",
        text: "A user with this email already exists.",
      });
      return;
    }

    const newUser = {
      id: generateId("USR"),
      name: trimmedName,
      email: normalizedEmail,
      role,
      status,
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = addUser(newUser);
    persistUsers(updatedUsers);

    setMessage({
      type: "success",
      text: `${trimmedName} has been added successfully.`,
    });

    closeModal();
  };

  const requestDelete = (user) => {
    setDeleteTarget(user);
  };

  const confirmDelete = () => {
    if (!deleteTarget) {
      return;
    }

    if (
      deleteTarget.role === "Administrator" &&
      users.filter((user) => user.role === "Administrator").length <= 1
    ) {
      setMessage({
        type: "danger",
        text: "Cannot delete the last administrator.",
      });
      setDeleteTarget(null);
      return;
    }

    const updatedUsers = deleteUser(deleteTarget.id);
    persistUsers(updatedUsers);

    setMessage({
      type: "success",
      text: `${deleteTarget.name} has been deleted successfully.`,
    });

    setDeleteTarget(null);
  };

  const handleToggleStatus = (user) => {
    if (
      user.role === "Administrator" &&
      user.status === "Active" &&
      users.filter(
        (item) =>
          item.role === "Administrator" && item.status === "Active"
      ).length <= 1
    ) {
      setMessage({
        type: "danger",
        text: "The last active administrator cannot be deactivated.",
      });
      return;
    }

    const updatedUsers = users.map((item) =>
      item.id === user.id
        ? {
            ...item,
            status: item.status === "Active" ? "Inactive" : "Active",
          }
        : item
    );

    persistUsers(updatedUsers);

    setMessage({
      type: "success",
      text: `${user.name}'s status has been updated.`,
    });
  };

  const getRoleIcon = (userRole) => {
    switch (userRole) {
      case "Administrator":
        return "bi-shield-fill-check";
      case "Manager":
        return "bi-person-workspace";
      case "Staff":
        return "bi-person-badge";
      default:
        return "bi-person";
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-PK", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="users-page app-page">
      <div className="page-header">
        <div>
          <span className="page-label">ADMINISTRATION</span>
          <h1>User Management</h1>
          <p>Manage warehouse administrators and staff accounts.</p>
        </div>
        <button
          className="btn btn-primary"
          type="button"
          onClick={openAddModal}
        >
          <i className="bi bi-person-plus me-2"></i>
          Add User
        </button>
      </div>

      {message.text && (
        <div
          className={`alert alert-${message.type} alert-dismissible fade show`}
          role="alert"
        >
          {message.text}
          <button
            type="button"
            className="btn-close"
            onClick={clearMessage}
          ></button>
        </div>
      )}

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card summary-card">
            <div className="card-body">
              <div className="summary-icon user">
                <i className="bi bi-people"></i>
              </div>
              <div className="summary-content">
                <span className="summary-label">Total Users</span>
                <strong className="summary-value">{totalUsers}</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card summary-card">
            <div className="card-body">
              <div className="summary-icon success">
                <i className="bi bi-person-check"></i>
              </div>
              <div className="summary-content">
                <span className="summary-label">Active Users</span>
                <strong className="summary-value">{activeUsers}</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card summary-card">
            <div className="card-body">
              <div className="summary-icon info">
                <i className="bi bi-shield-check"></i>
              </div>
              <div className="summary-content">
                <span className="summary-label">Administrators</span>
                <strong className="summary-value">{adminUsers}</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card summary-card">
            <div className="card-body">
              <div className="summary-icon warning">
                <i className="bi bi-person-x"></i>
              </div>
              <div className="summary-content">
                <span className="summary-label">Inactive</span>
                <strong className="summary-value">
                  {totalUsers - activeUsers}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card premium-card">
        <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-3">
          <h5 className="mb-0">User Directory</h5>
          <div className="input-group" style={{ maxWidth: "320px" }}>
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="search"
              className="form-control"
              placeholder="Filter users..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>
        <div className="card-body">
          <UserTable
            filteredUsers={filteredUsers}
            getRoleIcon={getRoleIcon}
            formatDate={formatDate}
            onEdit={openEditModal}
            onDelete={requestDelete}
            handleToggleStatus={handleToggleStatus}
          />
        </div>
      </div>

      {showModal && (
        <div
          className="modal fade show premium-modal"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editingUser ? "Edit User" : "Add New User"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <UserForm
                    name={name}
                    email={email}
                    role={role}
                    status={status}
                    setName={setName}
                    setEmail={setEmail}
                    setRole={setRole}
                    setStatus={setStatus}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingUser ? "Update User" : "Add User"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        show={!!deleteTarget}
        onHide={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete User"
        message={
          deleteTarget
            ? `Are you sure you want to delete "${deleteTarget.name}"?`
            : ""
        }
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
}

export default Users;
