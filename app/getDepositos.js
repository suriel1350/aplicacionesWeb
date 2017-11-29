function ConsigueObject() {        
    this.tokenint = sessionStorage.token;
    this.toJsonString = function () { return JSON.stringify(this); };
};

function ConsigueOneProductObject(entiKey) {        
    this.tokenint = sessionStorage.token;
    this.entityKey = entiKey;
    this.toJsonString = function () { return JSON.stringify(this); };
};

function getOneDep(entKey)
{  
  angular.element(document.getElementById('leerDeposito')).scope().editarDeposito(entKey);
  
}

function deleteDeposito(entKey)
{
  try
  {
    var myData = new ConsigueOneProductObject(entKey);    
    jQuery.ajax({
      url: "https://helloworld-suriel.appspot.com/_ah/api/depositos_api/v1/deposito/delete",
      dataType: 'json',
      cache: false, 
      contentType: 'application/json; charset=utf-8', 
      processData: true, 
      data: myData.toJsonString(),
      type: 'POST',
      crossDomain: true,
      success: function(response){
        window.location.href = '/depositos'
      },
      error: function(error){
        alert(error)
      }
    });
  }
  catch(error)
  {
    alert(error)
  }
}

angular.module('getDepositos', ['ngResource','ngCookies'])
  .controller('TodoCtrl', function($scope, $http, $cookies){
    $scope.show=0;
    $scope.todos = [];
    var datos = [];
    var contador  = 0;

    var myData = new ConsigueObject(); 

    $http({
        url: 'https://helloworld-suriel.appspot.com/_ah/api/depositos_api/v1/deposito/list',
        method: 'POST',
        data: myData.toJsonString(),
        headers : {
            'Content-Type' : 'application/json; charset=utf-8',
            'dataType' : 'json'
        },
    })
    .then(function(response) {
        if(response.data.code!=1){
          sessionStorage.clear();
          window.location.href = '/ingresar';
        }else{
        //var datos = ((response.data.data[0]));
        //alert(datos['entityKey']);

        $("lstBases").empty();

        var myTableBases = "<table class='table'>" +
                               "         <thead class='text-primary'>" +
                               "             <th class='text-center'>Opciones</th>" +
                               "             <th class='text-center'>Tipo Base</th>" +
                               "             <th class='text-center'>Detalles</th>" +
                               "             <th>Precio</th>" +
                               "             <th>Imagen</th>" +                                
                               "         </thead>" + 
                               "    <tbody>";
                                        

        angular.forEach(response.data.data, function(item) {                 
           
           myTableBases +=      "<tr>" +
                                    "   <td> " +
                                    "     <div id='leerDeposito' ><button onclick='getOneDep(\""+ item.entityKey +
                                          "\")' class='btn btn-info'>" +
                                          " Editar </button> " +
                                    "     <button onclick='deleteDeposito(\""+ item.entityKey +
                                          "\")' class='btn btn-danger'>" + "Eliminar </button> </div>" +
                                    "   </td>" +
                                    "   <td class='text-center'>" + item.tipoBase + "</td>" +                                       
                                    "   <td class='text-center'>" + item.detalles + "</td>" +
                                    "   <td class='text-primary'> $" + item.precio + "</td>" + 
                                    "   <td>" + "<img src=\"" + item.urlImage + "\" style=\" width:64px; height:64px;\">" + "</td" +                                    
                                    "</tr>";                                         
           //var nombreTexto = (JSON.stringify($scope.proNombre));
           //alert(nombreTexto);
           //$scope.proNombre = nombreTexto;
           //datos[contador] = nombreTexto;
           //alert(datos[contador]);
           //contador = contador + 1;
           //alert($scope.proNombre);
        });
        //var datos = (($scope.todos[0]));
          myTableBases += "</tbody>" +
                            "</table>";
          $("#lstBases").append(myTableBases);
      }
    });

    $scope.logout = function(){
      sessionStorage.clear();
      window.location.href = '/';
    };
  
    $scope.editarDeposito = function(data) {
      var myData = new ConsigueOneProductObject(data);

         $http({
          url: 'https://helloworld-suriel.appspot.com/_ah/api/depositos_api/v1/deposito/get',
          method: 'POST',
          data: myData.toJsonString(),
          headers : {
              'Content-Type' : 'application/json; charset=utf-8',
              'dataType' : 'json'
          },
        })
        .then(function(response) {
            if(response.data.code!=1){
                sessionStorage.clear();
                window.location.href = '/ingresar';
            }else{
                sessionStorage.tipoBase = response.data.data[0].tipoBase;
                sessionStorage.detalles = response.data.data[0].detalles;            
                sessionStorage.entityKey = response.data.data[0].entityKey;
                sessionStorage.precio = response.data.data[0].precio;
                window.location.href = '/editarDeposito';
            }            
        });           
     };
  });