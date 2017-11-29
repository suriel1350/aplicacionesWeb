function ProductoObject(myEmail, myPassword, myNombre, myEdad) {
    
    this.email = myEmail;
    this.password = myPassword;
    this.nombre = myNombre;
    this.edad = myEdad;
    this.token = sessionStorage.token;
    this.urlImage = sessionStorage.urlImage;
    this.entityKey = sessionStorage.entKey;
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

angular.module('agregarUsuario', ['ngResource','ngCookies'])
  .controller('TodoCtrl', function($scope, $http, $cookies){
    if(!sessionStorage.getItem('token')){
		window.location.href = '/login';
        sessionStorage.clear();
    }
    
    $scope.addUser = function() {
      var myData = new ProductoObject($scope.email, $scope.password, $scope.nombre, $scope.edad);
      $http({
          url: 'https://helloworld-suriel.appspot.com/_ah/api/usuarios_api/v1/users/insert',
          method: 'POST',
          data: myData.toJsonString(),
          headers : {
              'Content-Type' : 'application/json; charset=utf-8',
              'dataType' : 'json'
          },
      })
      .then(function(response) {
     
           if (response.data.code==1){               
               window.location.href = '/usuario';
           }    
      });
    };
    
    $scope.logout = function() {
        sessionStorage.clear();
        window.location.href = '/ingresar';
    };
  });