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

  this.deleteCartItem = function (id) {
    var index = this.findRow(id);
    if (index !== -1) {
      this.arr.splice(index, 1);
    }
  };

  this.deleteAllCartItem = function (listCart) {
    listCart.splice(0, listCart.length);
  };
}
