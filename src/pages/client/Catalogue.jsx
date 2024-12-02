import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import productImg from "../../../public/assets/products/panzerotti_arequipe.jpg";
import Footer from "../../partials/Footer";

function Catalogue() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Función para consumir la API y obtener los productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://pedivexapi.onrender.com/product");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Función para agregar un producto al carrito
  const addToCart = (product) => {
    const MAX_QUANTITY = 15;

    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        const newQuantity = existingProduct.quantity + 1;

        if (newQuantity > product.stock || newQuantity > MAX_QUANTITY) {
          Swal.fire({
            title: "Límite alcanzado",
            text: `No puedes agregar más de ${Math.min(
              product.stock,
              MAX_QUANTITY
            )} unidades de este producto.`,
            icon: "warning",
            confirmButtonText: "Entendido",
            customClass: {
              popup: 'rounded-5',
              confirmButton: 'btn btn-secondary rounded-5',
              cancelButton: 'btn btn-danger rounded-5',
              closeButton: 'btn btn-warning rounded-5'
            }
          });
          return prevCart;
        }

        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      }

      if (product.stock > 0) {
        return [...prevCart, { ...product, quantity: 1 }];
      } else {
        Swal.fire({
          title: "Sin stock",
          text: "Este producto no tiene stock disponible.",
          icon: "warning",
          confirmButtonText: "Entendido",
          customClass: {
            popup: 'rounded-5',
            confirmButton: 'btn btn-secondary rounded-5',
            cancelButton: 'btn btn-danger rounded-5',
            closeButton: 'btn btn-warning rounded-5'
          }
        });
        return prevCart;
      }
    });
  };

  // Función para disminuir la cantidad de un producto
  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Función para vaciar el carrito con confirmación
  const clearCart = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esto vaciará todo el carrito.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, vaciar",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: 'rounded-5',
        confirmButton: 'btn btn-success rounded-5',
        cancelButton: 'btn btn-danger rounded-5',
        closeButton: 'btn btn-warning rounded-5'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        setCart([]);
        Swal.fire("Carrito vaciado", "", "success");
      }
    });
  };

  // Función para calcular el total del carrito
  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  // Función para enviar el pedido a la API
  const postOrder = async (order) => {
    try {
      const response = await fetch("https://pedivexapi.onrender.com/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error("Error al crear el pedido");
      }

      Swal.fire({
        title: "Pedido enviado",
        text: "El pedido se ha generado exitosamente.",
        icon: "success",
      });
      setCart([]);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al generar el pedido.",
        icon: "error",
      });
      console.error("Error posting order:", error);
    }
  };

  // Función para generar el pedido
  const generateOrder = () => {
    const data = JSON.parse(localStorage.getItem("authData"));
    const currentUser = data?.user;
    if (!currentUser) {
      Swal.fire({
        title: "Inicia sesión",
        text: "Debes iniciar sesión para realizar un pedido.",
        icon: "info",
      }).then(() => {
        localStorage.setItem("cart", JSON.stringify(cart)); // Guarda el carrito antes de redirigir
        window.location.href = "/login"; // Redirige al login
      });
      return;
    }

    if (cart.length === 0) {
      Swal.fire(
        "Error",
        "El carrito está vacío. Agrega productos antes de continuar.",
        "error"
      );
      return;
    }

    const currentDate = new Date();
    const creationDate = currentDate.toISOString();
    const deadLine = new Date(
      currentDate.getTime() + 14 * 24 * 60 * 60 * 1000
    ).toISOString();

    const order = {
      idUser: currentUser.id,
      total: calculateTotal(),
      state: 4,
      creationDate,
      deadLine,
      stateDate: creationDate,
      details: cart.map((item) => ({
        idProduct: item.id,
        quantity: item.quantity,
        subtotal: (item.price * item.quantity).toFixed(2),
        total: (item.price * item.quantity).toFixed(2),
      })),
    };

    console.log(order);

    postOrder(order);
  };


  return (
    <>
      <div className="container-fluid px-4 mt-5">
        <div className="row catalogue-prom-panel mb-4">
          <div className="col">
            <h1 className="text-center display-4">¡Mejores que Paliqueso!</h1>
          </div>
          <div className="col">
            <p className="lead text-center">
              Disfruta de nuestros deliciosos panzerottis, hechos con los mejores ingredientes.
              ¡Tu antojo, nuestra pasión!
            </p>
          </div>
        </div>
        <hr />
        <div className="container-fluid">
          <div className="row">
            <div className="col-4">
              <div className="rounded-5 card shadow-sm">
                <div className="card-header rounded-5 bg-primary text-white d-flex shadow">
                  <h3 className="mx-auto pt-2">Carrito de Compras</h3>
                </div>
                <div className="card-body">
                  {cart.length > 0 ? (
                    <ul className="list-group mb-3">
                      {cart.map((item) => (
                        <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center rounded-5 mb-2 shadow-sm">
                          <span>
                            {item.name} - ${item.price} x {item.quantity}
                          </span>
                          <div className="d-flex gap-2">
                            <button
                              className="button-cart btn btn-outline-success btn-sm rounded-5 shadow-sm"
                              onClick={() => addToCart(item)}
                            >
                              <i className="bi bi-plus-lg"></i>
                            </button>
                            <button
                              className="button-cart btn btn-outline-danger btn-sm me-2 rounded-5 shadow-sm"
                              onClick={() => decreaseQuantity(item.id)}
                            >
                              <i className="bi bi-dash-lg"></i>
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted text-center">El carrito está vacío</p>
                  )}
                  <div className="text-end">
                    <p>Total: ${calculateTotal()}</p>
                    <button className="button-cart btn btn-danger btn-sm me-2 rounded-5" onClick={clearCart}>
                      Vaciar carrito
                    </button>
                    <button className="button-cart btn btn-success btn-sm rounded-5" onClick={generateOrder}>
                      Generar pedido
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-8">
              <div className="row">
                {products.filter((product) => product.inCatalogue).map((product) => (
                  <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-4">
                    <div className="rounded-5 card shadow-sm border-0 rounded-3">
                      <img
                        src={productImg}
                        className="card-img-top rounded-5 shadow"
                        alt={product.name}
                      />
                      <div className="card-body text-center">
                        <span className="fs-6 fw-lighter">{product.productCategory.name}</span>
                        <h5 className="card-title fs-5">{product.name}</h5>
                        <p className="card-text text-muted">Precio: ${product.price}</p>
                        <p className="card-text">
                          Ingredientes principales:
                          <ul className="list-unstyled details-card-list">
                            {product.datasheet.datasheetDetails.slice(0, 3).map((supplie) => (
                              <li key={supplie.id} className="small text-info">
                                {supplie.supply.name}
                              </li>
                            ))}
                          </ul>
                        </p>
                        <button
                          className="button-cart btn btn-success btn-sm rounded-5 shadow-sm"
                          onClick={() => addToCart(product)}
                        >
                          Agregar al carrito
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Catalogue;
