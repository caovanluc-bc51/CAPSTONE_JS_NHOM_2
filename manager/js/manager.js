//
var api = new Service();
var validation = new Validation();

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
              <button id='btnEditClick' class='btn btn-success' data-toggle="modal" data-target="#myModal" onclick='editProduct(${
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
//thêm nút add product khi nhấn vào + Add Product
//validation check 2 trường hợp sẽ hiển thị thông báo ngay khi người dùng nhập luôn không đợi người dùng nhấn addProduct
function getArray() {
  var promise = api.getListProductApi();
  var array = [];
  promise
    .then(function (result) {
      for (i = 0; i < result.data.length; i++) {
        array.push(result.data[i]);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  return array;
}
var arrayProduct = getArray();
//ADD CASE 1
getEle("btnAddProduct").onclick = function () {
  resetInput();
  resetError();
  getEle("name").disabled = false;
  document.getElementsByClassName("modal-title")[0].innerHTML = "Add Product";
  var buttonAdd = `<button class='btn btn-success'id='addProduct' onclick ='addProduct()'>Add Product</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = buttonAdd;
  function keyUpAddProduct() {
    var name = getEle("name").value;
    var price = getEle("price").value;
    var screen = getEle("screen").value;
    var backCamera = getEle("backCamera").value;
    var frontCamera = getEle("frontCamera").value;
    var imageLink = getEle("imageLink").value;
    var description = getEle("description").value;
    var type = getEle("type").value;
    //flag
    var isValid = true;
    //validation tên sản phẩm
    isValid &=
      validation.checkEmpty(
        name,
        "errorName",
        "(*) Vui lòng nhập tên sản phẩm"
      ) &&
      validation.checkExistAccount(
        name,
        "errorName",
        "(*) Sản phẩm đã tồn tại",
        arrayProduct
      );
    //validation price
    isValid &=
      validation.checkEmpty(
        price,
        "errorPrice",
        "(*) Vui lòng nhập giá sản phẩm"
      ) &&
      validation.checkPattern(
        price,
        "errorPrice",
        "(*) Vui lòng nhập giá sản phẩm bằng chữ số",
        /^[0-9]+$/
      );
    //validation screen
    isValid &= validation.checkEmpty(
      screen,
      "errorScreen",
      "(*) Vui lòng nhập kích thước màn hình"
    );
    //validation backCamera
    isValid &= validation.checkEmpty(
      backCamera,
      "errorBackCamera",
      "(*) Vui lòng nhập camera sau của sản phẩm"
    );
    //validation frontCamera
    isValid &= validation.checkEmpty(
      frontCamera,
      "errorFrontCamera",
      "(*) Vui lòng nhập camera trước của sản phẩm"
    );
    //validation imageLink
    isValid &= validation.checkEmpty(
      imageLink,
      "errorImageLink",
      "(*) Vui lòng nhập hình ảnh của sản phẩm"
    );
    //validation description
    isValid &= validation.checkEmpty(
      description,
      "errorDescription",
      "(*) Vui lòng nhập mô tả của sản phẩm"
    );
    // validation type
    isValid &=
      validation.checkEmpty(
        type,
        "errorType",
        "(*) Vui lòng nhập loại của sản phẩm"
      ) &&
      validation.checkType(
        type,
        "errorType",
        "(*) Loại sản phẩm là Iphone hoặc Samsung"
      );

    document.getElementById("addProduct").onclick = function () {
      if (isValid) {
        var product = new Product(
          "",
          name,
          price,
          screen,
          backCamera,
          frontCamera,
          imageLink,
          description,
          type
        );
        if (confirm(`Are you sure to add the product?`)) {
          var promise = api.addProductApi(product);
          promise
            .then(function (result) {
              getListProduct();
              document.getElementsByClassName("close")[0].click();
              //reset data đã nhập trước đó
              getEle("name").value = "";
              getEle("price").value = "";
              getEle("screen").value = "";
              getEle("backCamera").value = "";
              getEle("frontCamera").value = "";
              getEle("imageLink").value = "";
              getEle("description").value = "";
              getEle("type").value = "";
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          document.getElementsByClassName("close")[0].click();
        }
      }
    };
  }
  getEle("name").addEventListener("keyup", keyUpAddProduct);
  getEle("price").addEventListener("keyup", keyUpAddProduct);
  getEle("screen").addEventListener("keyup", keyUpAddProduct);
  getEle("backCamera").addEventListener("keyup", keyUpAddProduct);
  getEle("frontCamera").addEventListener("keyup", keyUpAddProduct);
  getEle("imageLink").addEventListener("keyup", keyUpAddProduct);
  getEle("description").addEventListener("keyup", keyUpAddProduct);
  getEle("type").addEventListener("keyup", keyUpAddProduct);
};
//ADD CASE 2
function addProduct() {
  resetInput();
  resetError();
  var name = getEle("name").value;
  var price = getEle("price").value;
  var screen = getEle("screen").value;
  var backCamera = getEle("backCamera").value;
  var frontCamera = getEle("frontCamera").value;
  var imageLink = getEle("imageLink").value;
  var description = getEle("description").value;
  var type = getEle("type").value;
  //flag
  var isValid = true;
  //validation tên sản phẩm
  isValid &=
    validation.checkEmpty(
      name,
      "errorName",
      "(*) Vui lòng nhập tên sản phẩm"
    ) &&
    validation.checkExistAccount(
      name,
      "errorName",
      "(*) Sản phẩm đã tồn tại",
      arrayProduct
    );
  //validation price
  isValid &=
    validation.checkEmpty(
      price,
      "errorPrice",
      "(*) Vui lòng nhập giá sản phẩm"
    ) &&
    validation.checkPattern(
      price,
      "errorPrice",
      "(*) Vui lòng nhập giá sản phẩm bằng chữ số",
      /^[0-9]+$/
    );
  //validation screen
  isValid &= validation.checkEmpty(
    screen,
    "errorScreen",
    "(*) Vui lòng nhập kích thước màn hình"
  );
  //validation backCamera
  isValid &= validation.checkEmpty(
    backCamera,
    "errorBackCamera",
    "(*) Vui lòng nhập camera sau của sản phẩm"
  );
  //validation frontCamera
  isValid &= validation.checkEmpty(
    frontCamera,
    "errorFrontCamera",
    "(*) Vui lòng nhập camera trước của sản phẩm"
  );
  //validation imageLink
  isValid &= validation.checkEmpty(
    imageLink,
    "errorImageLink",
    "(*) Vui lòng nhập hình ảnh của sản phẩm"
  );
  //validation description
  isValid &= validation.checkEmpty(
    description,
    "errorDescription",
    "(*) Vui lòng nhập mô tả của sản phẩm"
  );
  //validation type
  isValid &=
    validation.checkEmpty(
      type,
      "errorType",
      "(*) Vui lòng nhập loại của sản phẩm"
    ) &&
    validation.checkType(
      type,
      "errorType",
      "(*) Loại sản phẩm là Iphone hoặc Samsung"
    );

  document.getElementById("addProduct").onclick = function () {
    if (isValid) {
      var product = new Product(
        "",
        name,
        price,
        screen,
        backCamera,
        frontCamera,
        imageLink,
        description,
        type
      );
      if (confirm(`Are you sure to add the product?`)) {
        var promise = api.addProductApi(product);
        promise
          .then(function () {
            getListProduct();
            document.getElementsByClassName("close")[0].click();
            //reset data đã nhập trước đó
            getEle("name").value = "";
            getEle("price").value = "";
            getEle("screen").value = "";
            getEle("backCamera").value = "";
            getEle("frontCamera").value = "";
            getEle("imageLink").value = "";
            getEle("description").value = "";
            getEle("type").value = "";
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        document.getElementsByClassName("close")[0].click();
      }
    }
  };
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
//EDIT CASE 1
function editProduct(id) {
  resetInput();
  resetError();
  document.getElementsByClassName("modal-title")[0].innerHTML = "Edit Product";
  var buttonUpdate = `<button class='btn btn-success'onclick ='updateProduct(${id})' id = 'btnUpdate'>Update Product</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = buttonUpdate;
  var promise = api.getDetailProductByID(id);
  promise
    .then(function (result) {
      getEle("name").value = result.data.name;
      getEle("name").disabled = true;
      getEle("price").value = result.data.price;
      getEle("screen").value = result.data.screen;
      getEle("backCamera").value = result.data.backCamera;
      getEle("frontCamera").value = result.data.frontCamera;
      getEle("imageLink").value = result.data.img;
      getEle("description").value = result.data.desc;
      getEle("type").value = result.data.type;
    })
    .catch(function (error) {
      console.log(error);
    });

  function keyUpEditProduct() {
    var name = getEle("name").value;
    var price = getEle("price").value;
    var screen = getEle("screen").value;
    var backCamera = getEle("backCamera").value;
    var frontCamera = getEle("frontCamera").value;
    var imageLink = getEle("imageLink").value;
    var description = getEle("description").value;
    var type = getEle("type").value;

    //flag
    var isValid = true;

    //validation price
    isValid &=
      validation.checkEmpty(
        price,
        "errorPrice",
        "(*) Vui lòng nhập giá sản phẩm"
      ) &&
      validation.checkPattern(
        price,
        "errorPrice",
        "(*) Vui lòng nhập giá sản phẩm bằng chữ số",
        /^[0-9]+$/
      );
    //validation screen
    isValid &= validation.checkEmpty(
      screen,
      "errorScreen",
      "(*) Vui lòng nhập kích thước màn hình"
    );
    //validation backCamera
    isValid &= validation.checkEmpty(
      backCamera,
      "errorBackCamera",
      "(*) Vui lòng nhập camera sau của sản phẩm"
    );
    //validation frontCamera
    isValid &= validation.checkEmpty(
      frontCamera,
      "errorFrontCamera",
      "(*) Vui lòng nhập camera trước của sản phẩm"
    );
    //validation imageLink
    isValid &= validation.checkEmpty(
      imageLink,
      "errorImageLink",
      "(*) Vui lòng nhập hình ảnh của sản phẩm"
    );
    //validation description
    isValid &= validation.checkEmpty(
      description,
      "errorDescription",
      "(*) Vui lòng nhập mô tả của sản phẩm"
    );
    //validation type
    isValid &=
      validation.checkEmpty(
        type,
        "errorType",
        "(*) Vui lòng nhập loại của sản phẩm"
      ) &&
      validation.checkType(
        type,
        "errorType",
        "(*) Loại sản phẩm là Iphone hoặc Samsung"
      );

    document.getElementById("btnUpdate").onclick = function () {
      if (isValid) {
        var product = new Product(
          id,
          name,
          price,
          screen,
          backCamera,
          frontCamera,
          imageLink,
          description,
          type
        );
        if (confirm(`Are you sure to add the product?`)) {
          var promise = api.updateProductApi(product);
          promise
            .then(function () {
              getListProduct();
              document.getElementsByClassName("close")[0].click();
              //reset data đã nhập trước đó
              getEle("name").value = "";
              getEle("price").value = "";
              getEle("screen").value = "";
              getEle("backCamera").value = "";
              getEle("frontCamera").value = "";
              getEle("imageLink").value = "";
              getEle("description").value = "";
              getEle("type").value = "";
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          document.getElementsByClassName("close")[0].click();
        }
      }
    };
  }
  getEle("name").addEventListener("keyup", keyUpEditProduct);
  getEle("price").addEventListener("keyup", keyUpEditProduct);
  getEle("screen").addEventListener("keyup", keyUpEditProduct);
  getEle("backCamera").addEventListener("keyup", keyUpEditProduct);
  getEle("frontCamera").addEventListener("keyup", keyUpEditProduct);
  getEle("imageLink").addEventListener("keyup", keyUpEditProduct);
  getEle("description").addEventListener("keyup", keyUpEditProduct);
  getEle("type").addEventListener("keyup", keyUpEditProduct);
}
//EDIT CASE 2
function updateProduct(id) {
  var name = getEle("name").value;
  var price = getEle("price").value;
  var screen = getEle("screen").value;
  var backCamera = getEle("backCamera").value;
  var frontCamera = getEle("frontCamera").value;
  var imageLink = getEle("imageLink").value;
  var description = getEle("description").value;
  var type = getEle("type").value;
  //flag
  var isValid = true;
  //validation name product
  isValid &= validation.checkEmpty(
    name,
    "errorName",
    "(*) Vui lòng nhập tên sản phẩm"
  );
  //validation price
  isValid &=
    validation.checkEmpty(
      price,
      "errorPrice",
      "(*) Vui lòng nhập giá sản phẩm"
    ) &&
    validation.checkPattern(
      price,
      "errorPrice",
      "(*) Vui lòng nhập giá sản phẩm bằng chữ số",
      /^[0-9]+$/
    );
  //validation screen
  isValid &= validation.checkEmpty(
    screen,
    "errorScreen",
    "(*) Vui lòng nhập kích thước màn hình"
  );
  //validation backCamera
  isValid &= validation.checkEmpty(
    backCamera,
    "errorBackCamera",
    "(*) Vui lòng nhập camera sau của sản phẩm"
  );
  //validation frontCamera
  isValid &= validation.checkEmpty(
    frontCamera,
    "errorFrontCamera",
    "(*) Vui lòng nhập camera trước của sản phẩm"
  );
  //validation imageLink
  isValid &= validation.checkEmpty(
    imageLink,
    "errorImageLink",
    "(*) Vui lòng nhập hình ảnh của sản phẩm"
  );
  //validation description
  isValid &= validation.checkEmpty(
    description,
    "errorDescription",
    "(*) Vui lòng nhập mô tả của sản phẩm"
  );
  //validation type
  isValid &=
    validation.checkEmpty(
      type,
      "errorType",
      "(*) Vui lòng nhập loại của sản phẩm"
    ) &&
    validation.checkType(
      type,
      "errorType",
      "(*) Loại sản phẩm là Iphone hoặc Samsung"
    );

  document.getElementById("btnUpdate").onclick = function () {
    if (isValid) {
      var product = new Product(
        id,
        name,
        price,
        screen,
        backCamera,
        frontCamera,
        imageLink,
        description,
        type
      );
      if (confirm(`Are you sure to update the product?`)) {
        var promise = api.updateProductApi(product);
        promise
          .then(function () {
            getListProduct();
            document.getElementsByClassName("close")[0].click();
            getEle("name").value = "";
            getEle("price").value = "";
            getEle("screen").value = "";
            getEle("backCamera").value = "";
            getEle("frontCamera").value = "";
            getEle("imageLink").value = "";
            getEle("description").value = "";
            getEle("type").value = "";
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        document.getElementsByClassName("close")[0].click();
        getEle("name").value = "";
        getEle("price").value = "";
        getEle("screen").value = "";
        getEle("backCamera").value = "";
        getEle("frontCamera").value = "";
        getEle("imageLink").value = "";
        getEle("description").value = "";
        getEle("type").value = "";
      }
    }
  };
}

// onchange catelogy
// function getCatelogy() {
//   var type = getEle("mySelect").value;
//   if (type === "Samsung") {
//     var listSamSung = [];
//     var promise = api.getListProductApi();
//     promise
//       .then(function (result) {
//         for (var i = 0; i < result.data.length; i++) {
//           var samsung = result.data[i];
//           if (
//             result.data[i].type === "Samsung" ||
//             result.data[i].type === "samsung"
//           ) {
//             listSamSung.push(samsung);
//           }
//         }
//         renderUIManager(listSamSung);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   } else if (type === "Iphone") {
//     var listIphone = [];
//     var promise = api.getListProductApi();
//     promise
//       .then(function (result) {
//         for (var i = 0; i < result.data.length; i++) {
//           var iphone = result.data[i];
//           if (
//             result.data[i].type === "Iphone" ||
//             result.data[i].type === "iphone"
//           ) {
//             listIphone.push(iphone);
//           }
//         }
//         renderUIManager(listIphone);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   } else {
//     getListProduct();
//   }
// }
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
            if (
              parseFloat(result.data[i].price) >
              parseFloat(result.data[j].price)
            ) {
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
      .then(function (result) {
        for (var i = 0; i < result.data.length - 1; i++) {
          for (var j = i + 1; j < result.data.length; j++) {
            if (
              parseFloat(result.data[i].price) <
              parseFloat(result.data[j].price)
            ) {
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
  } else {
    getListProduct();
  }
}

// clean dữ liệu khi bấm lại nút Add Product
function resetInput() {
  getEle("name").value = "";
  getEle("price").value = "";
  getEle("screen").value = "";
  getEle("backCamera").value = "";
  getEle("frontCamera").value = "";
  getEle("imageLink").value = "";
  getEle("description").value = "";
  getEle("type").value = "";
}

function resetError() {
  getEle("errorName").innerHTML = "";
  getEle("errorPrice").innerHTML = "";
  getEle("errorScreen").innerHTML = "";
  getEle("errorBackCamera").innerHTML = "";
  getEle("errorFrontCamera").innerHTML = "";
  getEle("errorImageLink").innerHTML = "";
  getEle("errorDescription").innerHTML = "";
  getEle("errorType").innerHTML = "";
}
