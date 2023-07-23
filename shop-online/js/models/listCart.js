function ListCart() {
  this.arr = [];

  this.addToCart = function (cartItem) {
    this.arr.push(cartItem);
  };

  this.findRow = function (id) {
    var index = -1;
    for (var i = 0; this.arr.length; i++) {
      var product = this.arr[i];
      if (product.id === id) {
        index = i;
        break;
      }
    }
    return index;
  };

  this.cartItem = function (id) {
    var index = this.findRow(id);
    if (index !== -1) {
      return this.arr[index];
    }
  };

  this.updateQuantity = function (product) {
    var index = this.findRow(product.id);
    if (index !== -1) {
      this.arr[index].quantity += newQuantity;
    }
  };

  this.upDownQuantity = function (product) {
    var index = this.findRow(product.id);
    if (index !== -1) {
      this.arr[index] = product;
    }
  };

  this.checkProductCart = function (product) {
    var index = this.findRow(product.id);
    if (index !== -1) {
      return true;
    }
    return false;
  };

  this.deleteOutOfCart = function (id) {
    var index = this.findRow(id);
    if (index !== -1) {
      this.arr.splice(index, 1);
    }
  };
}
