import { Outlet } from "react-router-dom";
import Sidenav from "../../partials/Aside";

function AdminPage() {
  return (
    <>
      <div className="container-fluid px-2 d-flex justify-content-between gap-3 mt-3">
        <Sidenav />
        <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
          
          <Outlet />

        </div>
      </div>
    </>
  )
};

export default AdminPage;