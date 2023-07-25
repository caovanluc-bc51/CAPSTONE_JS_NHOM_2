function Validation() {
  this.checkEmpty = function (value, errorId, mess) {
    if (value === "") {
      //show error để thông báo
      getEle(errorId).innerHTML = mess;
      getEle(errorId).style.display = "block";
      return false;
    }
    //hide error
    getEle(errorId).innerHTML = "";
    getEle(errorId).style.display = "none";
    return true;
  };

  this.checkPattern = function (value, errorId, mess, letter) {
    if (value.match(letter)) {
      //true
      getEle(errorId).innerHTML = "";
      getEle(errorId).style.display = "none";
      return true;
    }
    //false
    getEle(errorId).innerHTML = mess;
    getEle(errorId).style.display = "block";
    return false;
  };
  this.checkType = function (value, errorId, mess) {
    if (value === "Iphone" || value === "Samsung") {
      getEle(errorId).innerHTML = "";
      getEle(errorId).style.display = "none";
      return true;
    }

    getEle(errorId).innerHTML = mess;
    getEle(errorId).style.display = "block";
    return false;
  };
  this.checkExistAccount = function (value, errorId, mess, listProduct) {
    var isExist = false;
    for (var i = 0; i < listProduct.length; i++) {
      var product = listProduct[i];
      if (product.name == value) {
        isExist = true;
        break;
      }
    }
    if (isExist) {
      getEle(errorId).innerHTML = mess;
      getEle(errorId).style.display = "block";
      return false;
    }
    getEle(errorId).innerHTML = "";
    getEle(errorId).style.display = "none";
    return true;
  };
}
