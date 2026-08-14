# 📦 UDevs Warehouse Management System

A professional and responsive frontend Warehouse Management System built with **React.js**, **Bootstrap 5**, and **LocalStorage**.

This project is designed for small warehouse and inventory operations and provides product management, stock transactions, user management, inventory tracking, and financial calculations without requiring a backend, API, or database.

---

## 🚀 Project Overview

The UDevs Warehouse Management System allows an administrator to efficiently manage warehouse operations through a modern and responsive dashboard.

The application provides:

- Product CRUD management
- User/Admin CRUD management
- Stock In management
- Stock Out management
- Automatic stock calculations
- Purchase and selling price management
- Revenue and profit calculations
- Low-stock monitoring
- Delivery status tracking
- Dashboard statistics
- Recent transaction activity
- Search and filtering
- Persistent browser storage using LocalStorage
- Responsive interface for desktop, tablet, and mobile devices

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend application development |
| JavaScript ES6+ | Application logic and calculations |
| Bootstrap 5 | Responsive UI and components |
| Bootstrap Icons | Interface icons |
| CSS3 | Custom styling and visual design |
| React Router DOM | Client-side routing |
| LocalStorage | Persistent browser-only data storage |
| Vite | Development and build tool |
| Git & GitHub | Version control |

---

## 📋 Assignment Requirements

This project was developed according to the provided Warehouse Management System assignment requirements.

### Core Requirements

- ✅ Product Create, Read, Update and Delete
- ✅ User/Admin Create, Read, Update and Delete
- ✅ Stock In transactions
- ✅ Stock Out transactions
- ✅ Automatic current-stock calculation
- ✅ Purchase cost calculation
- ✅ Selling price management
- ✅ Revenue calculation
- ✅ Profit calculation
- ✅ Dashboard statistics
- ✅ Recent stock activity
- ✅ Low-stock monitoring
- ✅ LocalStorage persistence
- ✅ React Router navigation
- ✅ Responsive layout
- ✅ Form validation
- ✅ Search and filtering

---

## 📄 Main Pages

The application contains four main assignment pages:

### 1. Dashboard

Provides an overview of warehouse performance.

Includes:

- Total Products
- Total Stock
- Stock In
- Stock Out
- Total Revenue
- Total Cost
- Total Profit
- Low Stock Items
- Recent Stock Activity
- Low-stock Products
- Quick Actions

---

### 2. Products

Provides complete product management functionality.

Features:

- Add new products
- Edit existing products
- Delete products with confirmation
- Search products by name or SKU
- Filter by category
- Filter by status
- Current stock visibility
- Low-stock indicators
- Purchase price
- Selling price
- Per-unit profit
- Delivery status

Supported delivery statuses:

- Pending
- Delivered
- Picked Up

---

### 3. Stock Management

Handles warehouse inventory movement.

#### Stock In

Allows the administrator to:

- Select a product
- Enter supplier information
- Enter quantity
- Enter unit cost
- Track batch/lot
- Track warehouse zone
- Record received date
- Add notes

Stock quantity is automatically increased after a successful Stock In transaction.

#### Stock Out

Allows the administrator to:

- Select a product
- Enter quantity
- Enter selling price
- Enter customer
- Select transaction reason
- Add reference
- Record date
- Add notes

The system automatically calculates:

```text
Revenue = Quantity × Selling Price

Cost = Quantity × Purchase Price

Profit = Revenue − Cost
```
Stock quantity is automatically decreased after a successful Stock Out transaction.

### 4. Users

Provides user and administrator management.

Features include:

- Add users
- Edit users
- Delete users
- User roles
- User status
- Search/filter functionality
-- CRUD operations
💰 Inventory & Financial Calculations

The system automatically calculates important inventory and financial metrics.

- Current Stock
Current Stock = Stock In − Stock Out
- Revenue
Revenue = Stock Out Quantity × Selling Price
- Cost
Cost = Stock Out Quantity × Purchase Price
- Profit
Profit = Revenue − Cost
- Product-Level Profit
Profit Per Unit = Selling Price − Purchase Price
### Data Storage

This application does not require:
- Backend
- REST API
- Database
- Server
All application data is stored in the browser using LocalStorage.

The stored data includes:

Products
Users
Stock transactions
Product stock quantities
Pricing information
Delivery status

Data remains available after refreshing the browser.

Note: Clearing the browser's LocalStorage will remove the application's locally stored data.
### Project Structure
udevs-warehouse-management/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── ConfirmModal.jsx
│   │   ├── Layout.jsx
│   │   ├── ProductForm.jsx
│   │   ├── ProductTable.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StockInForm.jsx
│   │   ├── StockOutForm.jsx
│   │   ├── UserForm.jsx
│   │   └── UserTable.jsx
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Products.jsx
│   │   ├── StockManagement.jsx
│   │   └── Users.jsx
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │
│   ├── utils/
│   │   ├── calculations.js
│   │   ├── idgenerator.js
│   │   └── storage.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── README.md
### Application Routes

The four main assignment routes are:

- Route	Page
/	Dashboard
/products	Products
/stock	Stock Management
/users	Users

Additional supporting routes may also be available for the application's welcome/authentication flow.

###  Installation & Setup
1. Clone the repository
```text
git clone <your-github-repository-url>
 ```
3. Navigate to the project directory
cd udevs-warehouse-management
4. Install dependencies
```text
npm install
 ```
6. Start the development server
```text
npm run dev
 ```
8. Open the application

Vite will provide a local development URL, usually:

http://localhost:5173
### Required Packages
The project uses the following main frontend packages:
 ```text
 npm install react-router-dom bootstrap bootstrap-icons
 ```
No unnecessary backend or database packages are required.
### UI & Design

The application uses a modern warehouse dashboard interface with:

- Responsive Bootstrap grid
- Cards
- Tables
- Forms
- Modals
- Alerts
- Badges
- Responsive navigation
- Sidebar navigation
- Hover effects
- Custom CSS styling
- Responsive layouts
- Inventory status indicators

The interface is designed to provide a clean and professional warehouse management experience.

###Responsive Design
The application is designed to work across:

- 🖥️ Desktop
- 💻 Laptop
- 📱 Tablet
- 📱 Mobile

Bootstrap's responsive grid and utility classes are used together with custom CSS media queries.

### Validation & Data Safety

The application includes client-side validation for important operations.

Examples include:

- Required product fields
- Unique SKU validation
- Positive purchase price
- Positive selling price
- Valid stock quantity
- Prevention of negative stock
- Prevention of Stock Out greater than available stock
- Confirmation before deleting products/users
  ##  Example Stock Transaction

Suppose a product has:

Purchase Price = Rs. 1,500
Selling Price  = Rs. 2,200
Quantity       = 10

The system calculates:

Revenue = 10 × 2,200
        = Rs. 22,000


Cost = 10 × 1,500
     = Rs. 15,000


Profit = 22,000 − 15,000
       = Rs. 7,000
### Development

Run the project in development mode:
 ```text
npm run dev
 ```
Create a production build:
 ```text
npm run build
 ```
Preview the production build:
 ```text
npm run preview
 ```
### Learning Outcomes

Through this project, the following React and frontend development concepts are demonstrated:

- React functional components
- useState
- useEffect
- useMemo
- React Router
- Component-based architecture
- Reusable components
- Form handling
- Form validation
- CRUD operations
- Array methods
- LocalStorage
- Inventory calculations
- Financial calculations
- Responsive Bootstrap layouts
- Custom CSS styling
- Git/GitHub workflow
###  Project Information

Project: UDevs Warehouse Management System
Type: Frontend Internship Assignment
Framework: React.js
Build Tool: Vite
Storage: Browser LocalStorage
Backend: None
Database: None
