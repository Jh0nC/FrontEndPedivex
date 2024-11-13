import productImg from "../../../public/assets/products/panzerotti_arequipe.jpg";
import Footer from "../../partials/Footer";

function Catalogue() {
  return (
    <>
      <div className="container-fluid p-5">
        <div className="row catalogue-prom-panel">
          <div className="col">
            <h1>Mejores que Peliqueso</h1>
          </div>
          <div className="col">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa delectus saepe cum officia minima ab voluptatum aspernatur temporibus error provident expedita sint recusandae dolore necessitatibus, vitae suscipit perferendis enim odio nihil hic, atque consequatur sed quis. Minima enim nobis ducimus voluptatem optio quibusdam atque iusto?</p>
          </div>
        </div>
        <hr />
      </div>
      <Footer />
    </>
  )
};

export default Catalogue;