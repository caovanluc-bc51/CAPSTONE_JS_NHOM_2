function Cart(_id, _img, _name, _price, _quantity) {
  this.id = _id;
  this.img = _img;
  this.name = _name;
  this.price = _price;
  this.quantity = Number(_quantity);
  this.total = 0;

  this.totalProduct = function () {
    this.total = parseFloat(this.price) * parseFloat(this.quantity);
  };
}
