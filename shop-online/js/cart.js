function Cart(_img, _name, _price, _quantity) {
  this.img = _img;
  this.name = _name;
  this.price = _price;
  this.quantity = _quantity;
  this.total = 0;
  this.billTotal = 0;

  this.totalProduct = function () {
    this.total = parseFloat(this.price) * parseFloat(this.quantity);
  };

  this.bill = function () {
    this.billTotal += this.total;
  };
}
