function ProductoObject(myNombre, myStock, myPrecio) {
    
    this.nombre = myNombre;
    this.disponibles = myStock;
    this.precio = myPrecio;
    this.token = sessionStorage.token;
    this.entityKey = sessionStorage.entityKey;
    this.urlImage = sessionStorage.urlImage;
    this.toJsonString = function () { return JSON.stringify(this); };
};

function uploadDemo()
{
    var file_data = $("#uploaded_file").prop("files")[0];
    var form_data = new FormData();
    form_data.append("uploaded_file", file_data)

    jQuery.support.cors = true;
    try
    {
     $.ajax({
                url: "/up",
                dataType: 'text',
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                crossDomain: true,
                success: function(response){                          
                                sessionStorage.urlImage = response;                                
                }
      });
    }
    catch(e)
    {
      alert("error : " +  e);
     }
}

angular.module('editarProducto', ['ngResource','ngCookies'])
  .controller('TodoCtrl', function($scope, $http, $cookies){
    if(!sessionStorage.getItem('token')){
		    window.location.href = '/ingresar';
        sessionStorage.clear();
    }
    
    $scope.addProducto = function() {
      var myData = new ProductoObject($scope.nombre, $scope.stock, $scope.precio);
      $http({
          url: 'https://helloworld-suriel.appspot.com/_ah/api/products_api/v1/product/update',
          method: 'POST',
          data: myData.toJsonString(),
          headers : {
              'Content-Type' : 'application/json; charset=utf-8',
              'dataType' : 'json'
          },
      })
      .then(function(response) {
           if (response.data.code==1){
               $scope.nombre='';
               $scope.stock='';
               $scope.precio='';
               window.location.href = '/productos';
           }    
      });
    };
    
    $scope.logout = function() {
        sessionStorage.clear();
        window.location.href = '/';
    };
  });