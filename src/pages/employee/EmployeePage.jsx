import { Outlet } from "react-router-dom";
import Sidenav from "../../partials/Aside";
import Br from "../Br";

function EmployeePage() {
  return (
    <>
      <div className="container-fluid px-2 d-flex justify-content-between gap-3 mt-3 mb-5">
        
        <Sidenav />
        <Br />
        <Outlet />

      </div>
    </>
  )
};

export default EmployeePage;