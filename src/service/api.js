function Service() {
  this.getListProductApi = function () {
    var promise = axios({
      url: "https://64b54986f3dbab5a95c7186c.mockapi.io/Product",
      method: "GET",
    });
    return promise;
  };
  this.addProductApi = function (product) {
    var promise = axios({
      url: "https://64b54986f3dbab5a95c7186c.mockapi.io/Product",
      method: "POST",
      data: product,
    });
    return promise;
  };
  this.deleteProductApi = function(id){
    var promise = axios({
      url:`https://64b54986f3dbab5a95c7186c.mockapi.io/Product/${id}`,
      method:'DELETE',
    });
    return promise;
  };
  this.getDetailProductByID = function(id){
    var promise = axios({
      url:`https://64b54986f3dbab5a95c7186c.mockapi.io/Product/${id}`,
      method:'GET',
    });
    return promise;
  };
  this.updateProductApi = function(product){
    var promise = axios({
      url:`https://64b54986f3dbab5a95c7186c.mockapi.io/Product/${product.id}`,
      method:'PUT',
      data: product,
    });
    return promise;
  };
}
