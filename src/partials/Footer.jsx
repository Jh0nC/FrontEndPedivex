import { Link } from "react-router-dom";
import logo from "../../public/assets/icons/logo.png"

function Footer() {
  return (
    <>
      <div className="container-fluid px-2 mt-3">
        <div className="container-fluid border-type-bottom rounded-top-4 shadow py-3 bg-light d-flex justify-content-center gap-5">
          <a href="#">
            <img src={logo} alt="logo" className="img-footer" />
          </a>
          <div className="col-sm-1 d-flex flex-column justify-content-around contact-icons-footer">
            <a href="https://www.facebook.com/?locale=es_LA" target="_blank">
              <i className="bi bi-facebook"></i>
              Facebook
            </a>
            <a href="https://www.instagram.com" target="_blank">
              <i className="bi bi-instagram"></i>
              Instagram
            </a>
            <a href="https://web.whatsapp.com" target="_blank">
              <i className="bi bi-whatsapp"></i>
              Whatsapp
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer;