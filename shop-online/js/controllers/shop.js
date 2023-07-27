var api = new Service();
var numberFormat = new Intl.NumberFormat("VN-vn");

function getEle(id) {
  return document.getElementById(id);
}

function getListProduct() {
  getEle("loader").style.display = "block";
  var promise = api.getListProductApi();
  promise
    .then(function (result) {
      renderUI(result.data);
      getEle("loader").style.display = "none";
    })
    .catch(function (error) {
      console.log(error);
      getEle("loader").style.display = "none";
    });
}

getListProduct();

//3. Hiển thị danh sách sản phẩm cho khách hàng.
function renderUI(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    var product = data[i];
    content += `
        <div class="col-12 col-md-6 col-lg-4 my-2">
          <div class="card cardPhone">
            <img
              src="${product.img}"
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h3 class="cardPhone__title">${product.name}</h3>
              <h3 class="cardPhone__price">$${numberFormat.format(
                product.price
              )}</h3>
              <div>
                <button class="btnPhone-shadow" type="button" data-toggle="modal" data-target="#productDetailPopup" onclick = productDetail('${
                  product.id
                }')>
                  <i class="fa-solid fa-shopping-cart"></i> Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>`;
  }
  getEle("productList").innerHTML = content;
}

//5. Cho phép người dùng chọn sản phẩm bỏ vào giỏ hàng
function productDetail(idSP) {
  getEle("numberToBuy").value = 1;
  var promise = api.getDetailProductByID(idSP);
  promise
    .then(function (result) {
      getEle("productID").innerHTML = result.data.id;
      getEle("productName").innerHTML = result.data.name;
      getEle(
        "productImage"
      ).innerHTML = `<img class="img-fluid" src="${result.data.img}" alt="" />`;
      getEle("productPrice").innerHTML = `$${result.data.price}`;
      getEle("productType").innerHTML = result.data.type;
      getEle("productScreen").innerHTML = result.data.screen;
      getEle("productBackCam").innerHTML = result.data.backCamera;
      getEle("productFrontCam").innerHTML = result.data.frontCamera;
      getEle("productDescription").innerHTML = result.data.desc;
    })
    .catch(function (error) {
      console.log(error);
    });
}

//4. Tạo một dropdown (select) cho phép người dùng filter lọc hiển thị danh sách sản phẩm theo loại sản phẩm
function searchProductByType() {
  var search = getEle("category").value.toLowerCase();

  var promise = api.getListProductApi();
  promise
    .then(function (result) {
      var productList = [];
      for (var i = 0; i < result.data.length; i++) {
        if (result.data[i].type.toLowerCase() === search) {
          productList.push(result.data[i]);
          renderUI(productList);
        } else if (search === "All") {
          productList.push(result.data[i]);
          renderUI(productList);
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function plus() {
  var quantity = parseFloat(getEle("numberToBuy").value);
  quantity++;
  getEle("numberToBuy").value = quantity;
}

function minus() {
  var quantity = parseFloat(getEle("numberToBuy").value);
  quantity--;
  if (quantity <= 0) {
    quantity = 1;
  }
  getEle("numberToBuy").value = quantity;
}
