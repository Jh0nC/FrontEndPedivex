import { Link } from "react-router-dom";

function Landing() {
  return (
    <>

      {/* prom panel */}
      <div className="container-fluid prom-panel d-flex flex-column justify-content-around align-items-start p-5 my-5">
        <div className="w-75 ps-5 ms-5">
          <h1 className="">Parcerottis</h1>
          <p className="w-50">
            "<i>Parcerottis</i>", linea de productos congelados, totalmente artesanales y hechos a mano,  que no te puedes perder!
          </p>
        </div>
      </div>

      {/* some info */}
      <div className="container my-5 px-5">
        <div className="row d-flex justify-content-around gap-5 text-center py-5 rounded-5 shadow-lg">
          <h1>Explora</h1>
          <Link className="col-sm-2 landing-card rounded-5 shadow-lg py-3 border-type-mid" to={"/register"}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person-lines-fill landing-card-icon" viewBox="0 0 16 16">
              <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
            </svg>
            <h4>Registrate</h4>
          </Link>
          <Link className="col-sm-2 landing-card rounded-5 shadow-lg py-3 border-type-mid" to={"/catalogue"}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-file-spreadsheet-fill landing-card-icon" viewBox="0 0 16 16">
              <path d="M12 0H4a2 2 0 0 0-2 2v4h12V2a2 2 0 0 0-2-2m2 7h-4v2h4zm0 3h-4v2h4zm0 3h-4v3h2a2 2 0 0 0 2-2zm-5 3v-3H6v3zm-4 0v-3H2v1a2 2 0 0 0 2 2zm-3-4h3v-2H2zm0-3h3V7H2zm4 0V7h3v2zm0 1h3v2H6z" />
            </svg>
            <h4>Crea pedidos</h4>
          </Link>
          <Link className="col-sm-2 landing-card rounded-5 shadow-lg py-3 border-type-mid" to={"/aboutUs"}>
            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-people landing-card-icon" viewBox="0 0 16 16">
              <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
            </svg>
            <h4>Conocenos</h4>
          </Link>
        </div>
      </div>

      {/* product carrousel */}
      <div className="container d-flex justify-content-center px-5">
        <div className="row my-5">
          <div className="col d-flex flex-column justify-content-center ps-5">
            <h2 className="d-flex align-items-center gap-2 ms-5">
              Productos estrella
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
              </svg>
            </h2>
            <p className="my-3 fs-5 w-50 ms-5">
              Aqui algúmos de muestros productos más vendidos,
            </p>
          </div>
          <div className="col d-flex flex-column justify-content-center carousel-container">
            <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner rounded-5 border-type-mid">
                <div className="carousel-item active" data-bs-interval="5000">
                  <img src="./assets/products/palito_bocadillo.jpg" className="img-fluid" alt="..." />
                </div>
                <div className="carousel-item" >
                  <img src="./assets/products/palito_panzerotti.jpg" className="img-fluid" alt="..." />
                </div>
                <div className="carousel-item" >
                  <img src="./assets/products/panzerotti_arequipe.jpg" className="img-fluid" alt="..." />
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default Landing;