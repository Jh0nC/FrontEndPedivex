/* eslint-disable no-unused-vars */
/* style */
import "../public/css/index.css";
import "../public/css/datatableStyles.css";
import "../public/css/authRegister.css";
import "../public/css/authLogin.css";
import "../public/css/authPasswordRecovery.css";
/* React utils */
import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
/* partials */
import Navbar from "./partials/Navbar";
/* pages */
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PasswordRecovery from "./pages/auth/PasswordRecovery";
import About from "./pages/client/About";
import Catalogue from "./pages/client/Catalogue";
import AdminPage from "./pages/admin/AdminPage";
import Dashboard from "./pages/admin/modules/Dashboard";
import Products from "./pages/admin/modules/production/products/Products";
import SuppliesCreate from "./pages/admin/modules/boughts/supplies/SuppliesCreate";
import SuppliesUpdate from "./pages/admin/modules/boughts/supplies/SuppliesUpdate";
import Supplies from "./pages/admin/modules/boughts/supplies/Supplies";
import Boughts from "./pages/admin/modules/boughts/bought/Boughts";
import BoughtCreate from "./pages/admin/modules/boughts/bought/boughtCreate";
import Roles from "./pages/admin/modules/users/role/roles";
import RoleCreate from './pages/admin/modules/users/role/roleCreate';
import RoleEdit from './pages/admin/modules/users/role/roleEdit';
import Users from "./pages/admin/modules/users/user/users";
import UsersCreate from "./pages/admin/modules/users/user/userCreate";
import UsersEdit from "./pages/admin/modules/users/user/userEdit";
import Devolutions from "./pages/admin/modules/sales/Devolutions";
import ProductionOrder from "./pages/admin/modules/production/ProductionOrders/ProductionOrder";
import ProductionOrderCreate from "./pages/admin/modules/production/ProductionOrders/ProductionOrderCreate";
import ProductionOrderUpdate from "./pages/admin/modules/production/ProductionOrders/ProductionOrderUpdate";
import Request from "./pages/admin/modules/sales/requests/Request";
import RequestCreate from "./pages/admin/modules/sales/requests/RequestCreate";
import RequestUpdate from "./pages/admin/modules/sales/requests/RequestUpdate";
import Masses from "./pages/admin/modules/production/masses/Masses";
import CreateMass from "./pages/admin/modules/production/masses/CreateMass";
import CreateProducts from "./pages/admin/modules/production/products/CreateProduct";
import EditMass from "./pages/admin/modules/production/masses/EditMasses";
import OutletPage from "./pages/admin/OutletPage";
import ProductCategories from "./pages/admin/modules/production/porductCategories/ProductCategories";
import CreateCategory from "./pages/admin/modules/production/porductCategories/CreateCategory";
import Sales from "./pages/admin/modules/sales/Sales";
import Clients from "./pages/admin/modules/clients/Clients";
import Employees from "./pages/admin/modules/employees/Employees";
import EditCategorie from "./pages/admin/modules/production/porductCategories/EditCategorie";
import CreateReturn from "./pages/admin/modules/sales/createReturn";
import EditProduct from "./pages/admin/modules/production/products/EditProduct";
import ClientEdit from "./pages/admin/modules/clients/ClientEdit";

// PrivateRoute component to protect routes
function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

ReactDOM.createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/PasswordRecovery' element={<PasswordRecovery />} />
        <Route path='/' element={<Landing />} />
        <Route path='aboutUs' element={<About />} />
        <Route path='catalogue' element={<Catalogue />} />
        <Route path='admin' element={<PrivateRoute><AdminPage /></PrivateRoute>}>
          <Route path="" element={<OutletPage />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='masses' element={<Masses />} />
          <Route path='masses/create' element={<CreateMass />} />
          <Route path="masses/edit/:id" element={<EditMass />} />
          <Route path="productCategories" element={<ProductCategories />} />
          <Route path="productCategories/create" element={<CreateCategory />} />
          <Route path="productCategories/edit/:id" element={<EditCategorie />} />
          <Route path='products' element={<Products />} />
          <Route path='products/create' element={<CreateProducts />} />
          <Route path='products/edit/:id' element={<EditProduct />} />
          <Route path='boughts' element={<Boughts />} />
          <Route path='boughtCreate' element={<BoughtCreate />} />
          <Route path='roles' element={<Roles />} />
          <Route path='roleCreate' element={<RoleCreate />} />
          <Route path='roleEdit/:id' element={<RoleEdit />} />
          <Route path='users' element={<Users />} />
          <Route path='userCreate' element={<UsersCreate />} />
          <Route path='userEdit/:id' element={<UsersEdit />} />
          <Route path='supplies-create' element={<SuppliesCreate />} />
          <Route path='supplies' element={<Supplies />} />
          <Route path='supplies-Update/:id' element={<SuppliesUpdate />} />
          <Route path='productionOrder' element={<ProductionOrder />} />
          <Route path='production-order-create' element={<ProductionOrderCreate />} />
          <Route path='production-order-update/:id' element={<ProductionOrderUpdate />} />
          <Route path='request' element={<Request />} />
          <Route path='request-create' element={<RequestCreate />} />
          <Route path='request-update/:id' element={<RequestUpdate />} />
          <Route path='devolutions' element={<Devolutions />} />
          <Route path='clients' element={<Clients />} />
          <Route path='clientEdit' element={<ClientEdit />} />
          <Route path='Employees' element={<Employees />} />
          <Route path='sales' element={<Sales />} />
          <Route path="sales-return/:id" element={<CreateReturn />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
