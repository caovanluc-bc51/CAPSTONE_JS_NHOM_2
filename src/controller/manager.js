//
var api = new Service();
//
function getEle(id) {
  return document.getElementById(id);
}
//
function getListProduct() {
  var promise = api.getListProductApi();
  promise
    .then(function (result) {
      renderUIManager(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getListProduct();
//
function renderUIManager(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    var product = data[i];
    content += `
          <tr>
          <td>${i + 1}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.screen}</td>
          <td>${product.backCamera}</td>
          <td>${product.frontCamera}</td>
          <td>
              <img src='${product.img}' width = '50' />
          </td>
          <td>${product.desc}</td>
          <td>${product.type}</td>
          <td>
              <button class='btn btn-success' data-toggle="modal" data-target="#myModal" onclick='editProduct(${
                product.id
              })' style = 'padding:4.5px 21.5px; margin-bottom: 5px'>Edit</button>
              <button class='btn btn-danger'onclick="deleteProduct('${
                product.id
              }')">Delete</button>
          </td>
          </tr>
          `;
  }
  getEle("tblDanhSachSP").innerHTML = content;
}
//thêm nút add product khi nhấn vào add product
getEle("btnAddProduct").onclick = function () {
  var buttonAdd = `<button class='btn btn-success'onclick ='addProduct()'>Add Product</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = buttonAdd;
};
//
function addProduct() {
  //dom id get value
  var name = getEle("name").value;
  var price = getEle("price").value;
  var screen = getEle("screen").value;
  var backCamera = getEle("backCamera").value;
  var frontCamera = getEle("frontCamera").value;
  var imageLink = getEle("imageLink").value;
  var type = getEle("type").value;
  var description = getEle("description").value;
  var product = new Product(
    "",
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    imageLink,
    type,
    description
  );
  var promise = api.addProductApi(product);
  promise
    .then(function () {
      getListProduct();
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}
//
function deleteProduct(id) {
  var promise = api.deleteProductApi(id);
  promise
    .then(function (result) {
      alert(`Delele ${result.data.name} Success`);
      getListProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
}
//
function editProduct(id) {
  document.getElementsByClassName("modal-title")[0].innerHTML = "Edit Product";
  var buttonUpdate = `<button class='btn btn-success'onclick ='updateProduct(${id})' id = 'btnUpdate'>Update Product</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = buttonUpdate;
  var promise = api.getDetailProductByID(id);
  promise
    .then(function (result) {
      getEle("name").value = result.data.name;
      getEle("price").value = result.data.price;
      getEle("screen").value = result.data.screen;
      getEle("backCamera").value = result.data.backCamera;
      getEle("frontCamera").value = result.data.frontCamera;
      getEle("imageLink").value = result.data.img;
      getEle("type").value = result.data.type;
      getEle("description").value = result.data.desc;
    })
    .catch(function (error) {
      console.log(error);
    });
}
//
function updateProduct(id) {
  var name = getEle("name").value;
  var price = getEle("price").value;
  var screen = getEle("screen").value;
  var backCamera = getEle("backCamera").value;
  var frontCamera = getEle("frontCamera").value;
  var imageLink = getEle("imageLink").value;
  var type = getEle("type").value;
  var description = getEle("description").value;
  var product = new Product(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    imageLink,
    type,
    description
  );
  var promise = api.updateProductApi(product);
  promise
    .then(function () {
      document.getElementsByClassName("close")[0].click();
      getListProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
}
// reset data khi nhấn edit mà bấm x
// getEle("btnAddProduct").onclick = function () {
//   getEle("name").value = "";
//   getEle("price").value = "";
//   getEle("screen").value = "";
//   getEle("backCamera").value = "";
//   getEle("frontCamera").value = "";
//   getEle("imageLink").value = "";
//   getEle("type").value = "";
//   getEle("description").value = "";
// };
