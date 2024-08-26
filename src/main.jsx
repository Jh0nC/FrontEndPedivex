/* eslint-disable no-unused-vars */
/* style */
import "../public/css/index.css";
import "../public/css/datatableStyles.css";
/* React utils */
import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
/* partials */
import Navbar from "./partials/Navbar";
import ShopCart from "./partials/ShopCart"
import Config from "./partials/Config"
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
import Boughts from "./pages/admin/modules/boughts/Boughts";
import Roles from "./pages/admin/modules/users/Roles/Roles"
import RoleCreate from './pages/admin/modules/users/Roles/RoleCreate';
import RoleEdit from './pages/admin/modules/users/Roles/RoleEdit';
import Users from "./pages/admin/modules/users/Users/Users"
import UsersCreate from "./pages/admin/modules/users/Users/UserCreate"


import Devolutions from "./pages/admin/modules/sales/Devolutions";

import ProductionOrder from "./pages/admin/modules/production/ProductionOrders/ProductionOrder"
import ProductionOrderUpdate from "./pages/admin/modules/production/ProductionOrders/ProductionOrderUpdate";


import Masses from "./pages/admin/modules/production/masses/Masses";
import CreateMass from "./pages/admin/modules/production/masses/CreateMass";
import CreateProducts from "./pages/admin/modules/production/products/CreateProduct";
import Br from "./pages/Br";
import EditMass from "./pages/admin/modules/production/masses/EditMasses";
import OutletPage from "./pages/admin/OutletPage";
import ProductCategories from "./pages/admin/modules/production/porductCategories/ProductCategories";
import CreateCategory from "./pages/admin/modules/production/porductCategories/CreateCategory";

import Sales from "./pages/admin/modules/sales/Sales";

import Clients from "./pages/admin/modules/clients/Clients";
import ClientCreate from "./pages/admin/modules/clients/ClientCreate";
import ClientEdit from "./pages/admin/modules/clients/ClientEdit";

import Employees from "./pages/admin/modules/employees/Employees";
import EmployeeCreate from "./pages/admin/modules/employees/EmployeeCreate";
import EmployeeEdit from "./pages/admin/modules/employees/EmployeeEdit";









import CreateReturn from "./pages/admin/modules/sales/createReturn";


ReactDOM.createRoot(document.querySelector('#root')).render(

  <React.StrictMode>

    <Router>

      <Navbar />

      <Routes>

        <Route path='*' element={<NotFound />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/PasswordRecovery' element={<PasswordRecovery />} />


        <Route path='/'>

          <Route path='' element={<Landing />} />
          <Route path='aboutUs' element={<About />} />
          <Route path='catalogue' element={<Catalogue />} />

          <Route path='admin' element={<AdminPage />}>

            <Route path=""  element={<OutletPage />} />

            <Route path='dashboard' element={<Dashboard />} />

            <Route path='masses' element={<Masses />} />
            <Route path='masses/create' element={<CreateMass />} />
            <Route path="masses/edit/:id" element={<EditMass />} />

            <Route path="productCategory" element={<ProductCategories />} />
            <Route path="productCategory/create" element={<CreateCategory />} />

            <Route path='products' element={<Products />} />


            <Route path='boughts' element={<Boughts />} />
            <Route path='roles' element={<Roles />} />
            <Route path='role-create' element={<RoleCreate />} />
            <Route path='role-edit' element={<RoleEdit />} />
            <Route path='users' element={<Users />} />
            <Route path='user-create' element={<UsersCreate />} />

            <Route path='supplies-create' element={<SuppliesCreate />} />
            <Route path='products/create' element={<CreateProducts />} />

            <Route path='supplies' element={<Supplies />} />

            <Route path='supplies-Update/:id' element={<SuppliesUpdate />} />



            <Route path='users' element={<Users />} />

            <Route path='production-order' element={<ProductionOrder />} />
            <Route path='production-order-Update/:id' element={<ProductionOrderUpdate />} />


            <Route path='devolutions' element={<Devolutions />} />

            {/* Dm */}
            <Route path='clients' element={<Clients />} />
            <Route path='clientCreate' element={<ClientCreate />} />
            <Route path='clientEdit' element={<ClientEdit />} />

            <Route path='Employees' element={<Employees />} />
            <Route path='EmployeeCreate' element={<EmployeeCreate />} />
            <Route path='EmployeeEdit' element={<EmployeeEdit />} />
            
            <Route path='sales' element={<Sales />} />
            <Route path="sales-return/:id" element={<CreateReturn />} />


          </Route>

        </Route>

      </Routes>

    </Router>

  </React.StrictMode>

)