function ListCart() {
  this.arr = [];

  this.addToCart = function (cartItem) {
    this.arr.push(cartItem);
  };

  this.findRow = function (id) {
    var index = -1;
    for (var i = 0; this.arr.length; i++) {
      var prod = this.arr[i];
      if (prod.id === id) {
        index = i;
        break;
      }
    }
    return index;
  };

  this.deletOutOfCart = function (id) {
    var index = this.findRow(id);
    if (index !== -1) {
      this.arr.splice(index, 1);
    }
  };
}
