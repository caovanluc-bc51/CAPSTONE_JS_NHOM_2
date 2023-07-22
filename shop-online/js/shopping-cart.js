var api = new Service();
var listCart = new ListCart();

// Lưu dữ liệu vào bảng tạm local
function setLocalStorage() {
  // convert từ json sang string
  var dataString = JSON.stringify(ListCart.arr);

  // tạo bảng dữ liệu local
  localStorage.setItem("ListCart", dataString);
}

// Đọc dữ liệu lên giao diện từ bảng tạm local
function getLocalStorage() {
  if (localStorage.getItem("ListCart")) {
    var dataString = localStorage.getItem("ListCart");

    // convert từ string sang json
    var dataJson = JSON.parse(dataString);

    // nạp dữ liệu lại vào list.arr
    ListCart.arr = dataJson;

    // render lại table
    renderTable(ListCart.arr);
  }
}

function productInfo() {
  var name = getEle("productName").innerHTML;
  var price = getEle("productPrice").innerHTML.slice(1);
  var quantity = getEle("numberToBuy").value;
  var img = getEle("productImage").innerHTML;

  if (parseFloat(quantity) <= 0) {
    getEle("numberToBuy").style.borderColor = "red";
    alert("Need to Enter quantity");
  } else {
    getEle("numberToBuy").style.borderColor = "#ced4da";
    var cartItem = new Cart(img, name, price, quantity);
    cartItem.totalProduct();
    return cartItem;
  }
}

getEle("addToCart").onclick = function () {
  var lstCart = productInfo();
  listCart.addToCart(lstCart);

  renderProductCartUI(listCart.arr);
  setLocalStorage();
};

function renderProductCartUI(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    var product = data[i];
    content += `<tr>
        <td>${product.img}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.quantity}</td>
        <td>${product.total}</td>
        <td>
          <button class="btn btn-danger">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td></tr>
        `;

    getEle("tblListShoppingCart").innerHTML = content;
  }
}
