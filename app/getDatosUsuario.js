function ProductoObject() {    
    this.tokenint = sessionStorage.token;
    this.entityKey = sessionStorage.entKey;
    this.toJsonString = function () { return JSON.stringify(this); };
};

angular.module('getDatosUsuario', ['ngResource','ngCookies'])
  .controller('TodoCtrl', function($scope, $http, $cookies){
    if(!sessionStorage.getItem('token')){
		window.location.href = '/ingresar';
        sessionStorage.clear();
    }    
      var myData = new ProductoObject();
      console.log(sessionStorage.entKey);
      $http({
          url: 'https://helloworld-suriel.appspot.com/_ah/api/usuarios_api/v1/users/get',
          method: 'POST',
          data: myData.toJsonString(),
          headers : {
              'Content-Type' : 'application/json; charset=utf-8',
              'dataType' : 'json'
          },
      })
      .then(function(response) {
           if (response.data.code==1){               
               //$scope.nombre = (response.data.data[0].nombre);
               $("#infoUser").empty();
               $("#avatarFoto").empty();

               var myTableUser = "<h6 class='category text-gray'>Información Usuario</h6>" +
                                 "  <h4 class='card-title'>" + response.data.data[0].nombre + "</h4>" +
                                 "  <h4 class='card-title'>" + response.data.data[0].email + "</h4>" +
                                 "  <p class='card-content'> Edad: " + response.data.data[0].edad +"</p>";
               
               var myFoto = "<a href=''><img class='img' src=\"" + response.data.data[0].urlImage + "\" /></a>";
                $("#avatarFoto").append(myFoto);
                $("#infoUser").append(myTableUser);
           }    
      });
    
    
    $scope.logout = function() {
        sessionStorage.clear();
        window.location.href = '/ingresar';
    };
  });