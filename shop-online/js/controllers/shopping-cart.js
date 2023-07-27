// var api = new Service();
var listCart = new ListCart();
var numberFormat = new Intl.NumberFormat("VN-vn");
getLocalStorage();

//11. Lưu giỏ hàng vào localstorage , lần sau khi vào trang sẽ load lên lại.
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

//8. In giỏ hàng ra màn hình, viết hàm renderCart và duyệt mảng giỏ hàng
function renderProductCartUI(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    var product = data[i];
    content += `<tr>
        <td id="image">${product.img}</td>
        <td id="name">${product.name}</td>
        <td id="price" align="right">$${numberFormat.format(product.price)}</td>
        <td align="center">
          <div class="d-flex quantity">
            <div class="changeNumberSmall" onclick="downQuantity('${
              product.id
            }')">
                  <i class="fa-solid fa-minus"></i>
              </div>
              <span class="cartQuantity">${product.quantity}</span>
              <div class="changeNumberSmall" onclick="upQuantity('${
                product.id
              }')">
                  <i class="fa-solid fa-plus"></i>
              </div>
            </div> 
        </td>
        <td id="total" align="right">$${numberFormat.format(product.total)}</td>
        <td>
          <button class="btn btn-danger" onclick="deleteProductItem('${
            product.id
          }')">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
    </tr>`;
  }
  getEle("tblListShoppingCart").innerHTML = content;

  //10. In tổng tiền ra giao diện. Trong hàm renderCart, tính tổng giá tiền của tất cả sản phẩm và hiện ra (giá tiền * số lượng)
  var payment = 0;
  for (var i = 0; i < listCart.arr.length; i++) {
    payment += listCart.arr[i].price * listCart.arr[i].quantity;
  }
  getEle("totalBill").innerHTML = numberFormat.format(payment);
}

//6.1. Không thêm trực tiếp sản phẩm được chọn vào mảng cart vì không có số lượng
function productInfo() {
  var id = getEle("productID").innerHTML;
  var name = getEle("productName").innerHTML;
  var price = getEle("productPrice").innerHTML.slice(1);
  var quantity = getEle("numberToBuy").value;
  var img = getEle("productImage").innerHTML;

  var cartItem = new Cart(id, img, name, price, quantity);
  cartItem.totalProduct();

  return cartItem;
}

getEle("addToCart").onclick = function () {
  var productId = getEle("productID").innerHTML;
  //7. Khi thêm sản phẩm vào giỏ hàng, nếu sản phẩm chưa có trong giỏ hàng thì push vào cart với quantity là số lượng người dùng nhập, nếu đã có rồi thì không push nữa mà chỉ tăng quantity lên 1 đơn vị
  if (listCart.checkProductCart(productId)) {
    var newQuantity = getEle("numberToBuy").value;
    listCart.updateQuantity(productId, newQuantity);

    setLocalStorage();
    renderProductCartUI(listCart.arr);

    getEle("btnClose").click();
    getEle("cart").click();
  } else {
    var lstCart = productInfo();
    if (lstCart) {
      listCart.addToCart(lstCart);

      renderProductCartUI(listCart.arr);
      setLocalStorage();

      getEle("btnClose").click();
      getEle("cart").click();
    }
  }
};

//13. Cho phép người dùng remove sản phẩm ra khỏi giỏ hàng
function deleteProductItem(id) {
  listCart.deleteCartItem(id);

  setLocalStorage();
  renderProductCartUI(listCart.arr);
}

//9. Trong giao diện giỏ hàng, cho phép người dùng chỉnh sửa số lượng (gợi ý: cho 2 nút tăng giảm), viết hàm gắn vào 2 nút đó, khi nhấn vào thì truyền vào id, tìm trong mảng giỏ hàng xem sản phẩm đó nằm ở đâu, lấy quantity ra tăng hoặc giảm, sau đó render lại giao diện
function upQuantity(id) {
  var quantity = 1;
  for (var i = 0; i < listCart.arr.length; i++) {
    if (listCart.arr[i].id === id) {
      quantity = parseFloat(
        document.getElementsByClassName("cartQuantity")[i].innerHTML
      );
      quantity++;
      document.getElementsByClassName("cartQuantity")[i].innerHTML = quantity;
    }
  }

  listCart.upDownQuantity(id, quantity);

  setLocalStorage();
  renderProductCartUI(listCart.arr);
}

function downQuantity(id) {
  var quantity = 1;
  for (var i = 0; i < listCart.arr.length; i++) {
    if (listCart.arr[i].id === id) {
      quantity = parseFloat(
        document.getElementsByClassName("cartQuantity")[i].innerHTML
      );
      quantity--;
      if (quantity <= 0) {
        quantity = 1;
      }
      document.getElementsByClassName("cartQuantity")[i].innerHTML = quantity;

      listCart.upDownQuantity(id, quantity);
    }
  }
  setLocalStorage();
  renderProductCartUI(listCart.arr);
}

//12. Người dùng nhấn nút thanh toán, clear giỏ hàng, set mảng giỏ hàng về mảng rỗng []
getEle("payment").onclick = function () {
  listCart.deleteAllCartItem(listCart.arr);

  setLocalStorage();
  renderProductCartUI(listCart.arr);
};
