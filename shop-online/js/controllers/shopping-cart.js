// var api = new Service();
var listCart = new ListCart();
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
            <span id="cartQuantity">${product.quantity}</span>
            <div class="changeNumberSmall" onclick="upQuantity('${product.id}')">
                <i class="fa-solid fa-plus"></i>
            </div>
        </td>
        <td id="total" align="right">$${product.total}</td>
        <td>
          <button class="btn btn-danger" deleteProductItem('${product.id}')>
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
    </tr>`;

    getEle("tblListShoppingCart").innerHTML = content;
  }
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
    return cartItem;
  }
  return null;
}

getEle("addToCart").onclick = function () {
  //   if (listCart.checkProductCart(listCart.arr) === true) {
  //     listCart.updateQuantity(listCart.arr);

  //     renderProductCartUI(listCart.arr);
  //     setLocalStorage();
  //   } else {
  //     var lstCart = productInfo();
  //     if (lstCart) {
  //       listCart.addToCart(lstCart);

  //       renderProductCartUI(listCart.arr);
  //       setLocalStorage();
  //     }

  var lstCart = productInfo();
  if (lstCart) {
    listCart.addToCart(lstCart);

    renderProductCartUI(listCart.arr);
    setLocalStorage();
  }
};

function deleteProductItem(id) {
  listCart.deleteOutOfCart(id);
  renderProductCartUI(listCart.arr);
  setLocalStorage();
}

function upQuantity(id) {
  var quantity = parseFloat(getEle("cartQuantity").innerHTML);
  quantity++;
  getEle("cartQuantity").innerHTML = quantity;

  listCart.upDownQuantity();
  renderTable(DSNhanVien.arrNV);
  setLocalStorage();
}

function downQuantity(id) {
  var quantity = parseFloat(getEle("cartQuantity").innerHTML);
  quantity--;
  if (quantity < 0) {
    quantity = 1;
  }
  getEle("cartQuantity").innerHTML = quantity;
}
