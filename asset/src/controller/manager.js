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
  //Ask a question before deleting a product
  if (confirm(`Are you sure to delete the product?`)) {
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
  if (confirm(`Are you sure to update the product?`)) {
    var promise = api.updateProductApi(product);
    promise
      .then(function () {
        document.getElementsByClassName("close")[0].click();
        getListProduct();
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    document.getElementsByClassName("close")[0].click();
  }
}
//onchange getCatelogy
function getCatelogy() {
  var type = getEle("mySelect").value;
  if (type === "Samsung") {
    var listSamSung = [];
    var promise = api.getListProductApi();
    promise
      .then(function (result) {
        for (var i = 0; i < result.data.length; i++) {
          var samsung = result.data[i];
          if (
            result.data[i].type === "Samsung" ||
            result.data[i].type === "samsung"
          ) {
            listSamSung.push(samsung);
          }
        }
        renderUIManager(listSamSung);
      })
      .catch(function (error) {
        console.log(error);
      });
  } else if (type === "Iphone") {
    var listIphone = [];
    var promise = api.getListProductApi();
    promise
      .then(function (result) {
        for (var i = 0; i < result.data.length; i++) {
          var iphone = result.data[i];
          if (
            result.data[i].type === "Iphone" ||
            result.data[i].type === "iphone"
          ) {
            listIphone.push(iphone);
          }
        }
        renderUIManager(listIphone);
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    getListProduct();
  }
}
//search name product
function searchProduct() {
  var txtSearch = getEle("searchProduct").value;
  var promise = api.getListProductApi();
  promise
    .then(function (result) {
      var searchArray = [];
      for (var i = 0; i < result.data.length; i++) {
        var product = result.data[i];
        var keywordSearch = txtSearch.toLowerCase();
        var productName = result.data[i].name.toLowerCase();
        if (productName.indexOf(keywordSearch) !== -1) {
          searchArray.push(product);
        }
      }
      renderUIManager(searchArray);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getEle("searchProduct").addEventListener("keyup", searchProduct);
//Sort Product
function sortProduct() {
  var sort = getEle("mySelect2").value;
  if (sort === "smallToBig") {
    var promise = api.getListProductApi();
    promise
      .then(function (result) {
        for (var i = 0; i < result.data.length - 1; i++) {
          for (var j = i + 1; j < result.data.length; j++) {
            if (result.data[i].price > result.data[j].price) {
              var temp = result.data[i];
              result.data[i] = result.data[j];
              result.data[j] = temp;
            }
          }
        }
        renderUIManager(result.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  } else if (sort === "bigToSmall") {
    var promise = api.getListProductApi();
    promise
      .then(function(result){
        for (var i = 0; i < result.data.length - 1; i++) {
          for (var j = i + 1; j < result.data.length; j++) {
            if (result.data[i].price < result.data[j].price) {
              var temp = result.data[i];
              result.data[i] = result.data[j];
              result.data[j] = temp;
            }
          }
        }
        renderUIManager(result.data);
      })
      .catch(function(error){
        console.log(error);
      });
  } else {
    getListProduct();
  }
}