// var api = new Service();
// function getEle(id) {
//   return document.getElementById(id);
// }
// function getListProduct() {
//   var promise = api.getListProductApi();
//   promise
//     .then(function (result) {
//       renderUI(result.data);
      
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }
// getListProduct();
// function renderUI(data) {
//   var content = "";
//   for (var i = 0; i < data.length; i++) {
//     var product = data[i];
//     content += `
//         <div class="col-12 col-md-6 col-lg-3">
//             <div class="card cardPhone">
//               <img src="${product.img}" class="card-img-top" alt="..." />
//               <div class="card-body">
//                 <div class="d-flex justify-content-between">
//                   <div>
//                     <h3 class="cardPhone__title">${product.name}</h3>
//                   </div>
//                   <div>
//                     <h3 class="cardPhone__title">$${product.price}</h3>
//                   </div>
//                 </div>
//                 <div class="d-flex justify-content-between">
//                   <div class="cardPhone__rating">
//                     <i class="fa fa-star"></i>
//                     <i class="fa fa-star"></i>
//                     <i class="fa fa-star"></i>
//                     <i class="fa fa-star"></i>
//                     <i class="fa fa-star"></i>
//                   </div>
//                   <div>
//                     <button class="btnPhone-shadow">
//                       <i class="fa fa-shopping-cart"></i> Add to cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         `;
//   }
//   // getEle("productList").innerHTML = content;
// }



