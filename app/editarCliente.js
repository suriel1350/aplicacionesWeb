function ClienteObject(myNombre, myDireccion, myEmail, myTelefono) {
    
    this.nombre = myNombre;
    this.direccion = myDireccion;
    this.email = myEmail;
    this.telefono = myTelefono;
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

angular.module('editarCliente', ['ngResource','ngCookies'])
  .controller('TodoCtrl', function($scope, $http, $cookies){
    if(!sessionStorage.getItem('token')){
    window.location.href = '/ingresar';
        sessionStorage.clear();
    }
    console.log(sessionStorage.token);
    $scope.addCliente = function() {
      var myData = new ClienteObject($scope.nombre, $scope.direccion, $scope.email, $scope.telefono);
      $http({
          url: 'https://helloworld-suriel.appspot.com/_ah/api/clientes_api/v1/cliente/update',
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
               $scope.direccion='';
               $scope.email='';
               $scope.telefono='';
               window.location.href = '/clientes';
           }    
      });
    };
    
    $scope.logout = function() {
        sessionStorage.clear();
        window.location.href = '/';
    };
  });