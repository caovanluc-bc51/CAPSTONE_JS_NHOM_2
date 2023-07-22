var api = new Service();

function getEle(id) {
  return document.getElementById(id);
}

function getListProduct() {
  var promise = api.getListProductApi();
  promise
    .then(function (result) {
      renderUI(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getListProduct();

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
              <h3 class="cardPhone__price">$${product.price}</h3>
              <div>
                <button class="btnPhone-shadow" type="button" data-toggle="modal" data-target="#productDetailPopup" onclick = productDetail('${product.id}')>
                  <i class="fa-solid fa-shopping-cart"></i> Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
        `;
  }
  getEle("productList").innerHTML = content;
}

function productDetail(idSP) {
  var promise = api.getDetailProductByID(idSP);
  promise
    .then(function (result) {
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

function searchProductByType() {
  var search = getEle("category").value;
  // console.log(search);

  var promise = api.getListProductApi();
  promise
    .then(function (result) {
      var productList = [];
      for (var i = 0; i < result.data.length; i++) {
        if (result.data[i].type === search) {
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
