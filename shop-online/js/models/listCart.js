//6.2. Tạo một đối tượng mới dành riêng cho giỏ hàng rồi push vào mảng cart
function ListCart() {
  this.arr = [];

  this.addToCart = function (cartItem) {
    this.arr.push(cartItem);
  };

  this.findRow = function (id) {
    var index = -1;
    for (var i = 0; i < this.arr.length; i++) {
      var product = this.arr[i];
      if (Number(product.id) === Number(id)) {
        index = i;
        break;
      }
    }
    console.log(index);
    return index;
  };

  this.cartItem = function (id) {
    var index = this.findRow(id);
    if (index !== -1) {
      return this.arr[index];
    }
  };

  this.updateQuantity = function (id, newQuantity) {
    var index = this.findRow(id);
    if (index !== -1) {
      this.arr[index].quantity += parseFloat(newQuantity);
      this.arr[index].total = this.arr[index].quantity * this.arr[index].price;
    }
  };

  this.upDownQuantity = function (id, newQuantity) {
    var index = this.findRow(id);
    if (index !== -1) {
      this.arr[index].quantity = newQuantity;
      this.arr[index].total = newQuantity * this.arr[index].price;
    }
  };

  this.checkProductCart = function (id) {
    var index = this.findRow(id);
    // console.log(index);
    if (index !== -1) {
      return true;
    }
    return false;
  };

  // 13. Cho phép người dùng remove sản phẩm ra khỏi giỏ hàng
  this.deleteCartItem = function (id) {
    var index = this.findRow(id);
    if (index !== -1) {
      this.arr.splice(index, 1);
    }
  };

  //12. Người dùng nhấn nút thanh toán, clear giỏ hàng, set mảng giỏ hàng về mảng rỗng []
  this.deleteAllCartItem = function (listCart) {
    listCart.splice(0, listCart.length);
  };
}
