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
        <div class="col-12 col-md-6 col-lg-3 my-3">
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
                <button class="btnPhone-shadow">
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
