function DepositoObject(myBase, myDetalles, myPrecio) {
    
    this.tipoBase = myBase;
    this.detalles = myDetalles;
    this.precio = myPrecio;
    this.token = sessionStorage.token;
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

angular.module('agregarDeposito', ['ngResource','ngCookies'])
  .controller('TodoCtrl', function($scope, $http, $cookies){
    if(!sessionStorage.getItem('token')){
		window.location.href = '/ingresar';
        sessionStorage.clear();
    }
    console.log(sessionStorage.token);
    $scope.addDeposito = function() {
      var myData = new DepositoObject($scope.tipoBase, $scope.detalles, $scope.precio);
      $http({
          url: 'https://helloworld-suriel.appspot.com/_ah/api/depositos_api/v1/deposito/insert',
          method: 'POST',
          data: myData.toJsonString(),
          headers : {
              'Content-Type' : 'application/json; charset=utf-8',
              'dataType' : 'json'
          },
      })
      .then(function(response) {
           if (response.data.code==1){
               $scope.tipoBase='';
               $scope.detalles='';
               $scope.precio='';
               window.location.href = '/depositos';
           }    
      });
    };
    
    $scope.logout = function() {
        sessionStorage.clear();
        window.location.href = '/';
    };
  });