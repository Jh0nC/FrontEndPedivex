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
import About from "./pages/client/About";
import Catalogue from "./pages/client/Catalogue";
import AdminPage from "./pages/admin/AdminPage";
import Dashboard from "./pages/admin/modules/Dashboard";
import Products from "./pages/admin/modules/production/Products";
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


import Br from "./pages/Br";

ReactDOM.createRoot(document.querySelector('#root')).render(

  <React.StrictMode>

    <Router>

      <Navbar />

      <ShopCart />
      {/* <Config /> */}

      <Routes>

        <Route path='*' element={<NotFound />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/'>

          <Route path='' element={<Landing />} />
          <Route path='aboutUs' element={<About />} />
          <Route path='catalogue' element={<Catalogue />} />

          <Route path='admin' element={<AdminPage />}>

            <Route path='dashboard' element={<Dashboard />} />
            <Route path='products' element={<Products />} />
            <Route path='boughts' element={<Boughts />} />
            <Route path='roles' element={<Roles />} />
            <Route path='role-create' element={<RoleCreate />} />
            <Route path='role-edit' element={<RoleEdit />} />
            <Route path='users' element={<Users />} />
            <Route path='user-create' element={<UsersCreate />} />

            <Route path='supplies-create' element={<SuppliesCreate />} />
            <Route path='supplies' element={<Supplies />} />

            <Route path='supplies-Update/:id' element={<SuppliesUpdate />} />



            <Route path='users' element={<Users />} />

            <Route path='production-order' element={<ProductionOrder />} />
            <Route path='production-order-Update/:id' element={<ProductionOrderUpdate />} />


            <Route path='devolutions' element={<Devolutions />} />

            
  


            <Route path='*' element={<NotFound />} />

          </Route>

        </Route>

      </Routes>

    </Router>

  </React.StrictMode>

)