import dummyImg from "../../public/assets/1140x696.jpg";
import { useNavigate } from "react-router-dom";

function Card({ data }) {
  const {
    id, name, stock, price, state, productCategory,
    datasheet: { mass }
  } = data;

  console.log(data);

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/admin/products/edit/${id}`);
  };

  return (
    <>
      <div className="card rounded-4 overflow-hidden admin-card">
        <div className="card-head rounded-top-3">
          <img src={dummyImg} alt="" className="img-fluid border-bottom" />
          <h5 className="text-center mt-2 d-flex flex-column justify-content-between">
            <span className="fs-6 fw-lighter">{productCategory.name}</span>
            {name}
          </h5>
        </div>
        <div className="card-body d-flex justify-content-between">
          <p>
            <b>Stock: </b>
            {stock >= 50 ? (
              <span className="badge opacity-50 text-bg-success">{stock}</span>
            ) : stock >= 30 ? (
              <span className="badge opacity-50 text-bg-warning">{stock}</span>
            ) : (
              <span className="badge opacity-50 text-bg-danger">{stock}</span>
            )}
          </p>
          <p>
            <b>Estado: </b>
            {state === 1 ? (
              <span className="badge opacity-50 text-bg-success text-uppercase">activo</span>
            ) : (
              <span className="badge opacity-50 text-bg-danger text-uppercase">inactivo</span>
            )}
          </p>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <button
            type="button"
            className="btn rounded-4 btn-secondary d-flex gap-2"
            data-bs-toggle="modal"
            data-bs-target={`#modalCard${id}`}
          >
            Ver detalle
            <i className="bi bi-eye"></i>
          </button>
          <button
            type="button"
            className="btn rounded-4 btn-warning d-flex gap-2"
            onClick={handleEditClick}
          >
            Editar
            <i className="bi bi-pencil-square"></i>   
          </button>
        </div>
      </div>

      {/* Modal de Ver Detalle */}
      <div className="modal fade"
        id={`modalCard${id}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content rounded-4">
            <div className="modal-header">
              <h1 className="modal-title fs-5">
                {productCategory.name} - {name}
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row row-cols-2">
                <div className="col-sm">
                  <img src={dummyImg} alt="" className="img-fluid" />
                </div>
                <div className="col-sm">
                  <p>
                    <b>Descripción: </b> {mass.notes}
                  </p>
                  <p>
                    <b>Precio: </b>
                    <i>${price}</i>
                  </p>
                  <p>
                    <b>Moje: </b> {mass.id}
                  </p>
                  <p>
                    <b>Cantidad total: </b> {mass.massDetails.reduce((total, item) => total + item.amount, 0)}
                  </p>
                  <p>
                    <b>Unidad: </b> {mass.massDetails[0].unit}
                  </p>
                </div>
              </div>
              <hr className="mx-3"/>
              <div className="row">

              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn rounded-4 btn-secondary" data-bs-dismiss="modal">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;




// import dummyImg from "../../public/assets/1140x696.jpg";

// function Card({ data }) {
//   const {
//     name, stock, price, state, productCategory,
//     datasheet: { mass, datasheetDetails }
//   } = data;

//   console.log(mass);

//   return (
//     <>
//       <div className="card rounded-4 overflow-hidden admin-card">
//         <div className="card-head rounded-top-3">
//           <img src={dummyImg} alt="" className="img-fluid border-bottom" />
//           <h5 className="text-center mt-2 d-flex flex-column justify-content-between">
//             <span className="fs-6 fw-lighter">{productCategory.name}</span>
//             {name}
//           </h5>
//         </div>
//         <div className="card-body d-flex justify-content-between">
//           <p>
//             <b>Stock: </b>
//             {stock >= 50 ? (
//               <span className="badge opacity-50 text-bg-success">{stock}</span>
//             ) : stock >= 30 ? (
//               <span className="badge opacity-50 text-bg-warning">{stock}</span>
//             ) : (
//               <span className="badge opacity-50 text-bg-danger">{stock}</span>
//             )}
//           </p>
//           <p>
//             <b>Estado: </b>
//             {state === 1 ? (
//               <span className="badge opacity-50 text-bg-success text-uppercase">activo</span>
//             ) : (
//               <span className="badge opacity-50 text-bg-danger text-uppercase">inactivo</span>
//             )}
//           </p>
//         </div>
//         <div className="card-footer d-flex justify-content-between">
//           <button type="button"
//             className="btn rounded-5 btn-secondary d-flex gap-2"
//             data-bs-toggle="modal"
//             data-bs-target={"#modalCard" + data.id}>
//             Ver detalle
//             <i className="bi bi-eye"></i>
//           </button>
//           <button type="button"
//             className="btn rounded-5 btn-warning d-flex gap-2"
//             data-bs-toggle="modal"
//             data-bs-target={"#modal3Card" + data.id}>
//             Editar
//             <i className="bi bi-pencil-square"></i>
//           </button>
//         </div>
//       </div>

//       <div className="modal fade"
//         id={"modalCard" + data.id}
//         data-bs-backdrop="static"
//         data-bs-keyboard="false"
//         tabIndex="-1"
//         aria-hidden="true">
//         <div className="modal-dialog modal-lg modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h1 className="modal-title fs-5">
//                 {productCategory.name + ' - ' + name}
//               </h1>
//               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>
//             <div className="modal-body">
//               <div className="row row-cols-2">
//                 <div className="col-sm">
//                   <img src={dummyImg} alt="" className="img-fluid" />
//                 </div>
//                 <div className="col-sm">
//                   <p>
//                     <b>Descripción: </b>
//                     {mass.notes}
//                   </p>
//                   <p>
//                     <b>Precio: </b>
//                     <i>${price}</i>
//                   </p>
//                   <div className="list-group">
//                     <li className="list-group-item list-group-item-action">
//                       Moje: {mass.id}
//                     </li>
//                     <li className="list-group-item list-group-item-action">
//                       Cantidad: {mass.massDetails.reduce((total, item) => total + item.amount, 0)}
//                     </li>
//                     <li className="list-group-item list-group-item-action">
//                       Unidad: <i>{mass.massDetails[0].unit}</i>
//                     </li>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button type="button"
//                 className="btn rounded-4 btn-outline-warning d-flex gap-2"
//                 data-bs-toggle="modal"
//                 data-bs-target={"#modal3Card" + data.id}>
//                 Editar
//                 <i className="bi bi-pencil-square"></i>
//               </button>
//               <button type="button"
//                 className="btn rounded-4 btn-outline-warning d-flex gap-2"
//                 data-bs-toggle="modal"
//                 data-bs-target={"#modal2Card" + data.id}>
//                 Ficha técnica
//               </button>
//               <button type="button" className="btn rounded-4 btn-secondary" data-bs-dismiss="modal">Cerrar</button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="modal fade"
//         id={"modal2Card" + data.id}
//         data-bs-backdrop="static"
//         data-bs-keyboard="false"
//         tabIndex="-1"
//         aria-hidden="true">
//         <div className="modal-dialog modal-lg modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h1 className="modal-title fs-5">
//                 {productCategory.name + ' - ' + name}
//               </h1>
//               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>
//             <div className="modal-body">
//               <h1>Ficha Técnica</h1>
//               <div className="row">
//                 <div className="col-sm">
//                   <div className="input-group mb-3">
//                     <button className="btn btn-outline-secondary dropdown-toggle">
//                       {productCategory.name}
//                     </button>
//                     <input type="text"
//                       className="form-control"
//                       placeholder={name}
//                       disabled />
//                   </div>
//                 </div>
//                 <div className="col-sm">
//                   <div className="mb-3">
//                     <label htmlFor="" className="form-label d-flex align-items-center gap-4">
//                       Moje
//                       <input className="form-control" type="text" disabled placeholder="Moje del producto" />
//                     </label>
//                   </div>
//                 </div>
//               </div>
//               <div className="row">
//                 <h5>Insumos</h5>
//                 {datasheetDetails.map((detail, index) => (
//                   <div key={index} className="mb-2 row d-flex justify-content-around align-items-center">
//                     <label htmlFor="" className="form-label col-6 mb-0">
//                       <select className="form-select" aria-label="Default select example" disabled>
//                         <option selected>{detail.supply.name}</option>
//                       </select>
//                     </label>
//                     <div className="col-3">
//                       <div className="input-group">
//                         <button className="btn btn-outline-secondary dropdown-toggle"
//                           type="button" data-bs-toggle="dropdown"
//                           aria-expanded="false">{detail.unit}</button>
//                         <input type="number" className="form-control"
//                           value={detail.amount}
//                           disabled />
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button type="button"
//                 className="btn rounded-4 btn-outline-warning d-flex gap-2"
//                 data-bs-toggle="modal"
//                 data-bs-target={"#modal3Card" + data.id}>
//                 Editar
//                 <i className="bi bi-pencil-square"></i>
//               </button>
//               <button type="button"
//                 className="btn rounded-4 btn-outline-warning d-flex gap-2"
//                 data-bs-toggle="modal"
//                 data-bs-target={"#modalCard" + data.id}>
//                 Volver
//               </button>
//               <button type="button" className="btn rounded-4 btn-secondary" data-bs-dismiss="modal">Cerrar</button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="modal fade"
//         id={"modal3Card" + data.id}
//         data-bs-backdrop="static"
//         data-bs-keyboard="false"
//         tabIndex="-1"
//         aria-hidden="true">
//         <div className="modal-dialog modal-lg modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h1 className="modal-title fs-5">
//                 {productCategory.name + ' - ' + name}
//               </h1>
//               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>
//             <div className="modal-body">
//               {/* edit product modal */}
//               <h1>Editar</h1>
//               <div className="modal-body container-fluid">
//                 <form action="">
//                   <div className="row d-flex justify-content-around">
//                     <div className="input-group mb-3">
//                       <button className="btn btn-outline-secondary dropdown-toggle"
//                         type="button" data-bs-toggle="dropdown"
//                         aria-expanded="false">{productCategory.name}</button>
//                       <input type="text"
//                         className="form-control"
//                         placeholder={productCategory.name + " " + name}
//                         disabled />
//                     </div>
//                     <div className="mb-3">
//                       <label htmlFor="exampleFormControlInput1" className="form-label d-flex align-items-center gap-4">
//                         Nombre
//                         <input className="form-control" type="text" placeholder="Nombre del producto" />
//                       </label>
//                     </div>
//                     <div className="mb-3">
//                       <label htmlFor="exampleFormControlInput1" className="form-label d-flex align-items-center gap-4">
//                         Cantidad
//                         <input className="form-control" type="text" placeholder="Cantidad disponible" />
//                       </label>
//                     </div>
//                     <div className="mb-3">
//                       <label htmlFor="exampleFormControlInput1" className="form-label d-flex align-items-center gap-4">
//                         Precio
//                         <input className="form-control" type="text" placeholder="Precio del producto" />
//                       </label>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button type="button" className="btn btn-primary">Guardar</button>
//               <button type="button" className="btn rounded-4 btn-secondary" data-bs-dismiss="modal">Cerrar</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Card;



// // import dummyImg from "../../public/assets/1140x696.jpg";
// // import Swal from "sweetalert2";

// // function Card(data) {
// //   var productDetail = data.data['productDetail'];
// //   console.log(productDetail);

// //   return (
// //     <>
// //       <div className="card rounded-4 overflow-hidden admin-card">
// //         <div className="card-head rounded-top-3">
// //           <img src={dummyImg} alt="" className="img-fluid border-bottom" />
// //           <h5 className="text-center mt-2">{data.data['type'] + ' - ' + data.data['flavor']}</h5>
// //         </div>
// //         <div className="card-body d-flex justify-content-between">
// //           <p>
// //             <b>Stock: </b>
// //             {data.data['stock'] >= 50 ? (
// //               <span className="badge opacity-50 text-bg-success">{data.data['stock']}</span>
// //             ) : data.data['stock'] >= 30 ? (
// //               <span className="badge opacity-50 text-bg-warning">{data.data['stock']}</span>
// //             ) : (
// //               <span className="badge opacity-50 text-bg-danger">{data.data['stock']}</span>
// //             )}
// //           </p>
// //           <p>
// //             <b>Estado: </b>
// //             {data.data['state'] == 1 ? (
// //               <span className="badge opacity-50 text-bg-success text-uppercase">activo</span>
// //             ) : (
// //               <span className="badge opacity-50 text-bg-danger text-uppercase">inactivo</span>
// //             )}
// //           </p>
// //         </div>
// //         <div className="card-footer d-flex justify-content-between">
// //           <button
// //             type="button"
// //             className="btn rounded-4 btn-outline-secondary d-flex gap-2"
// //             data-bs-toggle="modal"
// //             data-bs-target={"#modalCard" + data.data['id']}
// //           >
// //             Ver detalle
// //             <i className="bi bi-eye"></i>
// //           </button>
// //           <button
// //             type="button"
// //             className="btn rounded-4 btn-outline-warning d-flex gap-2"
// //             data-bs-toggle="modal"
// //             data-bs-target={"#modal3Card" + data.data['id']}
// //           >
// //             Editar
// //             <i className="bi bi-pencil-square"></i>
// //           </button>
// //         </div>
// //       </div>

// //       <div
// //         className="modal fade"
// //         id={"modalCard" + data.data['id']}
// //         data-bs-backdrop="static"
// //         data-bs-keyboard="false"
// //         tabIndex="-1"
// //         aria-hidden="true"
// //       >
// //         <div className="modal-dialog modal-lg modal-dialog-centered">
// //           <div className="modal-content">
// //             <div className="modal-header">
// //               <h1 className="modal-title fs-5" id="exampleModalLabel">
// //                 {data.data['type'] + ' - ' + data.data['flavor']}
// //               </h1>
// //               <button
// //                 type="button"
// //                 className="btn-close"
// //                 data-bs-dismiss="modal"
// //                 aria-label="Close"
// //               ></button>
// //             </div>
// //             <div className="modal-body">
// //               <div className="row row-cols-2">
// //                 <div className="col-sm">
// //                   <img src={dummyImg} alt="" className="img-fluid" />
// //                 </div>
// //                 <div className="col-sm">
// //                   <p>
// //                     <b>Descripción: </b>
// //                     {data.data['productDescription']}
// //                   </p>
// //                   <p>
// //                     <b>Precio: </b>
// //                     <i>${data.data['price']}</i>
// //                   </p>
// //                   {productDetail.dought ? (
// //                     <div className="list-group ">
// //                       <li className="list-group-item list-group-item-action">
// //                         Moje: {productDetail.dought['id']}
// //                       </li>
// //                       <li className="list-group-item list-group-item-action">
// //                         Cantidad: {productDetail.dought['amount']}
// //                       </li>
// //                       <li className="list-group-item list-group-item-action">
// //                         Unidad: <i>{productDetail.dought['unit']}</i>
// //                       </li>
// //                     </div>
// //                   ) : (
// //                     <p>No hay detalles de moje disponibles.</p>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="modal-footer">
// //               <button
// //                 type="button"
// //                 className="btn rounded-4 btn-outline-warning d-flex gap-2"
// //                 data-bs-toggle="modal"
// //                 data-bs-target={"#modal3Card" + data.data['id']}
// //               >
// //                 Editar
// //                 <i className="bi bi-pencil-square"></i>
// //               </button>
// //               <button
// //                 type="button"
// //                 className="btn rounded-4 btn-outline-warning d-flex gap-2"
// //                 data-bs-toggle="modal"
// //                 data-bs-target={"#modal2Card" + data.data['id']}
// //               >
// //                 Ficha técnica
// //               </button>
// //               <button
// //                 type="button"
// //                 className="btn rounded-4 btn-secondary"
// //                 data-bs-dismiss="modal"
// //               >
// //                 Cerrar
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Modal Ficha Técnica */}
// //       <div
// //         className="modal fade"
// //         id={"modal2Card" + data.data['id']}
// //         data-bs-backdrop="static"
// //         data-bs-keyboard="false"
// //         tabIndex="-1"
// //         aria-hidden="true"
// //       >
// //         <div className="modal-dialog modal-lg modal-dialog-centered">
// //           <div className="modal-content">
// //             <div className="modal-header">
// //               <h1 className="modal-title fs-5" id="exampleModalLabel">
// //                 {data.data['type'] + ' - ' + data.data['flavor']}
// //               </h1>
// //               <button
// //                 type="button"
// //                 className="btn-close"
// //                 data-bs-dismiss="modal"
// //                 aria-label="Close"
// //               ></button>
// //             </div>
// //             <div className="modal-body">
// //               <h1>Ficha Tecnica</h1>
// //               {/* Tu código aquí para mostrar la ficha técnica */}
// //             </div>
// //             <div className="modal-footer">
// //               <button
// //                 type="button"
// //                 className="btn rounded-4 btn-outline-warning d-flex gap-2"
// //                 data-bs-toggle="modal"
// //                 data-bs-target={"#modal3Card" + data.data['id']}
// //               >
// //                 Editar
// //                 <i className="bi bi-pencil-square"></i>
// //               </button>
// //               <button
// //                 type="button"
// //                 className="btn rounded-4 btn-outline-warning d-flex gap-2"
// //                 data-bs-toggle="modal"
// //                 data-bs-target={"#modalCard" + data.data['id']}
// //               >
// //                 Volver
// //               </button>
// //               <button
// //                 type="button"
// //                 className="btn rounded-4 btn-secondary"
// //                 data-bs-dismiss="modal"
// //               >
// //                 Cerrar
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Modal Editar */}
// //       <div
// //         className="modal fade"
// //         id={"modal3Card" + data.data['id']}
// //         data-bs-backdrop="static"
// //         data-bs-keyboard="false"
// //         tabIndex="-1"
// //         aria-hidden="true"
// //       >
// //         <div className="modal-dialog modal-lg modal-dialog-centered">
// //           <div className="modal-content">
// //             <div className="modal-header">
// //               <h1 className="modal-title fs-5" id="exampleModalLabel">
// //                 {data.data['type'] + ' - ' + data.data['flavor']}
// //               </h1>
// //               <button
// //                 type="button"
// //                 className="btn-close"
// //                 data-bs-dismiss="modal"
// //                 aria-label="Close"
// //               ></button>
// //             </div>
// //             <div className="modal-body">
// //               {/* edit product modal */}
// //               <h1>Editar</h1>
// //               <div className="modal-body container-fluid">
// //                 <form action="">
// //                   <div className="row d-flex justify-content-around">
// //                     <div className="input-group mb-3">
// //                       <button
// //                         className="btn btn-outline-secondary dropdown-toggle"
// //                         type="button"
// //                         data-bs-toggle="dropdown"
// //                         aria-expanded="false"
// //                       >
// //                         {data.data['type']}
// //                       </button>
// //                       <input
// //                         type="text"
// //                         className="form-control"
// //                         placeholder={data.data['type'] + " " + data.data['flavor']}
// //                         disabled
// //                       />
// //                     </div>
// //                     {/* Campos de edición aquí */}
// //                   </div>
// //                 </form>
// //               </div>
// //             </div>
// //             <div className="modal-footer">
// //               <button
// //                 type="button"
// //                 onClick={ConfirmEdit}
// //                 className="btn rounded-4 btn-outline-warning d-flex gap-2"
// //               >
// //                 Guardar
// //               </button>
// //               <button
// //                 type="button"
// //                 className="btn rounded-4 btn-secondary"
// //                 data-bs-dismiss="modal"
// //               >
// //                 Cerrar
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // function ConfirmEdit() {
// //   Swal.fire({
// //     title: "Seguro que quieres editar el producto?",
// //     showDenyButton: true,
// //     showCancelButton: true,
// //     confirmButtonText: "Guardar",
// //     denyButtonText: `No Guardar`,
// //   }).then((result) => {
// //     if (result.isConfirmed) {
// //       Swal.fire("Guardado!", "", "success");
// //     } else if (result.isDenied) {
// //       Swal.fire("No se guardaron los cambios", "", "info");
// //     }
// //   });
// // }

// // export default Card;
