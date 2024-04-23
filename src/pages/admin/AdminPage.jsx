import { Outlet } from "react-router-dom";
import Sidenav from "../../partials/Aside";

function AdminPage() {
  return (
    <>
      <div className="container-fluid px-2 d-flex justify-content-between gap-3 mt-3">
        <Sidenav />

        <Outlet />

      </div>
    </>
  )
};

export default AdminPage;