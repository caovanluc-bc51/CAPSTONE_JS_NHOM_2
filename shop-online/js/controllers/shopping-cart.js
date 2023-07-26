// var api = new Service();
var listCart = new ListCart();
// window.load = () => {
//   getLocalStorage();
// };
getLocalStorage();

function setLocalStorage() {
  var dataString = JSON.stringify(listCart.arr);

  localStorage.setItem("ListCart", dataString);
}

function getLocalStorage() {
  if (localStorage.getItem("ListCart")) {
    var dataString = localStorage.getItem("ListCart");
    var dataJson = JSON.parse(dataString);
    listCart.arr = dataJson;

    renderProductCartUI(listCart.arr);
  }
}

function renderProductCartUI(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    var product = data[i];
    content += `<tr>
        <td id="image">${product.img}</td>
        <td id="name">${product.name}</td>
        <td id="price" align="right">$${product.price}</td>
        <td align="center" class="quantity">
            <div class="changeNumberSmall" onclick="downQuantity('${product.id}')">
                <i class="fa-solid fa-minus"></i>
            </div>
            <span class="cartQuantity">${product.quantity}</span>
            <div class="changeNumberSmall" onclick="upQuantity('${product.id}')">
                <i class="fa-solid fa-plus"></i>
            </div>
        </td>
        <td id="total" align="right">$${product.total}</td>
        <td>
          <button class="btn btn-danger" onclick="deleteProductItem('${product.id}')">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
    </tr>`;
  }
  getEle("tblListShoppingCart").innerHTML = content;
}

function productInfo() {
  var id = getEle("productID").innerHTML;
  var name = getEle("productName").innerHTML;
  var price = getEle("productPrice").innerHTML.slice(1);
  var quantity = getEle("numberToBuy").value;
  var img = getEle("productImage").innerHTML;

  if (parseFloat(quantity) <= 0) {
    getEle("numberToBuy").style.borderColor = "red";
    alert("Need to Enter quantity");
  } else {
    getEle("numberToBuy").style.borderColor = "#ced4da";
    var cartItem = new Cart(id, img, name, price, quantity);
    cartItem.totalProduct();
    // console.log(cartItem);
    return cartItem;
  }
  return null;
}

getEle("addToCart").onclick = function () {
  var productId = getEle("productID").innerHTML;
  if (listCart.checkProductCart(productId)) {
    var newQuantity = getEle("numberToBuy").value;
    listCart.updateQuantity(productId, newQuantity);

    setLocalStorage();
    renderProductCartUI(listCart.arr);
  } else {
    var lstCart = productInfo();
    if (lstCart) {
      listCart.addToCart(lstCart);

      renderProductCartUI(listCart.arr);
      setLocalStorage();
    }
  }

  var productName = getEle("productName").innerHTML;
  alert(`Add "${productName}" to cart successful!`);
};

function deleteProductItem(id) {
  listCart.deleteCartItem(id);

  setLocalStorage();
  renderProductCartUI(listCart.arr);
}

function upQuantity(id) {
  var quantityUp = 0;
  for (var i = 0; i < listCart.arr.length; i++) {
    if (listCart.arr[i].id === id) {
      quantityUp = parseFloat(
        document.getElementsByClassName("cartQuantity")[i].innerHTML
      );
      quantityUp++;
      document.getElementsByClassName("cartQuantity")[i].innerHTML = quantityUp;
    }
  }

  // console.log(id);
  listCart.upDownQuantity(id, quantityUp);

  setLocalStorage();
  renderProductCartUI(listCart.arr);
}

function downQuantity(id) {
  var quantityDown = 0;
  for (var i = 0; i < listCart.arr.length; i++) {
    if (listCart.arr[i].id === id) {
      quantityDown = parseFloat(
        document.getElementsByClassName("cartQuantity")[i].innerHTML
      );
      quantityDown--;
      if (quantityDown < 0) {
        quantityDown = 1;
      }
      document.getElementsByClassName("cartQuantity")[i].innerHTML =
        quantityDown;

      listCart.upDownQuantity(id, quantityDown);
    }
  }
  setLocalStorage();
  renderProductCartUI(listCart.arr);
}

getEle("payment").onclick = function () {
  listCart.deleteAllCartItem(listCart.arr);

  setLocalStorage();
  renderProductCartUI(listCart.arr);
};
