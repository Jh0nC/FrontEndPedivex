import React from 'react';
import { ChevronLeft, ChevronRight, MapPin, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

const BurgerRestaurantPage = () => {
  const menuItems = [
    { name: "Classic Burger", price: "$5.99", image: "/api/placeholder/200/200" },
    { name: "Hot Dog", price: "$3.99", image: "/api/placeholder/200/200" },
    { name: "Chicken Burger", price: "$6.99", image: "/api/placeholder/200/200" },
    { name: "French Fries", price: "$2.99", image: "/api/placeholder/200/200" },
    { name: "Double Burger", price: "$8.99", image: "/api/placeholder/200/200" },
    { name: "Nuggets", price: "$4.99", image: "/api/placeholder/200/200" },
    { name: "Combo Meal", price: "$12.99", image: "/api/placeholder/200/200" },
    { name: "Drinks", price: "$1.99", image: "/api/placeholder/200/200" },
    { name: "Desserts", price: "$3.99", image: "/api/placeholder/200/200" }
  ];

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="position-relative min-vh-100 d-flex align-items-center">
        <button className="position-absolute start-0 top-50 translate-middle-y btn p-0 border-0 z-3 ms-4">
          <ChevronLeft size={40} color="white" />
        </button>
        <button className="position-absolute end-0 top-50 translate-middle-y btn p-0 border-0 z-3 me-4">
          <ChevronRight size={40} color="white" />
        </button>

        <div className="container-fluid px-4">
          {/* Navigation */}
          <nav className="navbar navbar-dark position-absolute top-0 start-0 w-100 py-4">
            <div className="container-fluid px-4">
              <a className="navbar-brand fs-4 fw-bold" href="#">Burgers</a>
              <div className="d-flex align-items-center gap-5">
                <div className="d-flex gap-4">
                  <a className="text-decoration-none text-white fw-semibold" href="#">MENU</a>
                  <a className="text-decoration-none text-white fw-semibold" href="#">FEATURES</a>
                  <a className="text-decoration-none text-white fw-semibold" href="#">PAGES</a>
                  <a className="text-decoration-none text-white fw-semibold" href="#">PORTFOLIO</a>
                  <a className="text-decoration-none text-white fw-semibold" href="#">BLOG</a>
                  <a className="text-decoration-none text-white fw-semibold" href="#">ELEMENTS</a>
                </div>
                <div className="d-flex gap-3">
                  <Facebook className="text-white" />
                  <Twitter className="text-white" />
                  <Instagram className="text-white" />
                </div>
              </div>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="row align-items-center mt-5">
            <div className="col-md-5">
              <span className="text-warning fw-semibold mb-3 d-inline-block">Our New</span>
              <h1 className="text-white fw-bold display-3 mb-4">
                SUPER DEAL<br />BURGER
              </h1>
              <button className="btn btn-danger px-4 py-2 text-uppercase fw-bold">
                Order now
              </button>
            </div>
            <div className="col-md-7 position-relative">
              <img
                src="/api/placeholder/800/500"
                alt="Super Deal Burger"
                className="img-fluid"
              />
              <div className="position-absolute top-0 end-0 bg-danger text-white rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '65px', height: '65px', marginTop: '20px', marginRight: '-10px' }}>
                <div className="text-center">
                  <small>£</small>
                  <div className="fw-bold">3.99</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-4">OUR BURGERS MENU</h2>
            <button className="btn btn-danger px-4">View More</button>
          </div>

          <div className="row g-4">
            {menuItems.map((item, index) => (
              <div key={index} className="col-md-4 col-lg-3">
                <div className="card border-0 text-center">
                  <img src={item.image} className="card-img-top" alt={item.name} />
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{item.name}</h5>
                    <p className="card-text text-danger fw-bold">{item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">INSTAGRAM</h2>
          </div>
          <div className="row g-2">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="col-md-4">
                <img
                  src="/api/placeholder/400/400"
                  alt={'Gallery image ${index + 1}'}
                className="img-fluid w-100"
                style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-5 bg-danger text-white text-center">
        <div className="container">
          <h2 className="fw-bold mb-4">GET OUR LATEST OFFER</h2>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="input-group">
                <input type="email" className="form-control" placeholder="Enter your email" />
                <button className="btn btn-dark">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="ratio ratio-21x9">
            <div className="bg-secondary w-100" style={{ minHeight: '300px' }}>
              {/* Aquí iría el mapa */}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5 className="fw-bold mb-3">Burgers</h5>
              <p className="mb-4">The best burgers in town!</p>
              <div className="d-flex gap-3">
                <Facebook />
                <Twitter />
                <Instagram />
              </div>
            </div>
            <div className="col-md-4">
              <h5 className="fw-bold mb-3">Contact</h5>
              <div className="d-flex align-items-center gap-2 mb-2">
                <MapPin size={20} />
                <span>123 Burger Street, City</span>
              </div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <Phone size={20} />
                <span>+1 234 567 890</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Mail size={20} />
                <span>info@burgers.com</span>
              </div>
            </div>
            <div className="col-md-4">
              <h5 className="fw-bold mb-3">Opening Hours</h5>
              <p>Monday - Friday: 8AM - 10PM</p>
              <p>Saturday - Sunday: 10AM - 11PM</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BurgerRestaurantPage