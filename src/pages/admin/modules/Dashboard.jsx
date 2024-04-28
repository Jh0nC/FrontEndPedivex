import chartImg from "../../../../public/assets/chart_480x200.png";

function Dashboard() {
  return (
    <>
      <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
        <div className="row d-flex dashboard-img ">
          <div className="col-sm-6 d-flex flex-column align-items-center">
            <img src={chartImg} alt="grafica" className="img-fluid"/>
            <button className="btn btn-outline-success">
              Generar excel
              <i className="bi bi-filetype-xlsx ms-2"></i>
            </button>
          </div>
          <div className="col-sm-6 d-flex flex-column align-items-center">
            <img src={chartImg} alt="grafica" className="img-fluid"/>
            <button className="btn btn-outline-success">
              Generar excel
              <i className="bi bi-filetype-xlsx ms-2"></i>
            </button>
          </div>
          <div className="col-sm-6 d-flex flex-column align-items-center">
            <img src={chartImg} alt="grafica" className="img-fluid"/>
            <button className="btn btn-outline-success">
              Generar excel
              <i className="bi bi-filetype-xlsx ms-2"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  )
};

export default Dashboard;