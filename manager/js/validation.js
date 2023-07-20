function Validation() {
  this.kiemTraRong = function (value, errorId, mess) {
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
}
