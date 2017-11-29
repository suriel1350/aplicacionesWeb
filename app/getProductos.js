function ConsigueObject() {        
    this.tokenint = sessionStorage.token;
    this.toJsonString = function () { return JSON.stringify(this); };
};

function ConsigueOneProductObject(entiKey) {        
    this.tokenint = sessionStorage.token;
    this.entityKey = entiKey;
    this.toJsonString = function () { return JSON.stringify(this); };
};

function getOnePro(entKey)
{  
  angular.element(document.getElementById('leerProducto')).scope().editarProducto(entKey);
  
}

function deleteProduct(entKey)
{
  try
  {
    var myData = new ConsigueOneProductObject(entKey);    
    jQuery.ajax({
      url: 'https://helloworld-suriel.appspot.com/_ah/api/products_api/v1/product/delete',
      dataType: 'json',
      cache: false, 
      contentType: false, 
      processData: true, 
      data: myData.toJsonString(),
      type: 'POST',
      crossDomain: true,
      success: function(response){
        window.location.href = '/productos'
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

angular.module('getProductos', ['ngResource','ngCookies'])
  .controller('TodoCtrl', function($scope, $http, $cookies){
    $scope.show=0;
    $scope.todos = [];
    var datos = [];
    var contador  = 0;

    var myData = new ConsigueObject(); 

    $http({
        url: 'https://helloworld-suriel.appspot.com/_ah/api/products_api/v1/product/list',
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

        $("lstProductos").empty();

        var myTableProductos = "<table class='table'>" +
                               "         <thead class='text-primary'>" +
                               "             <th class='text-center'>Opciones</th>" +
                               "             <th class='text-center'>Nombre</th>" +
                               "             <th class='text-center'>Disponibles</th>" +
                               "             <th>Precio</th>" +
                               "             <th>Imagen</th>" +                                
                               "         </thead>" + 
                               "    <tbody>";
                                        

        angular.forEach(response.data.data, function(item) {        
           
           myTableProductos +=      "<tr>" +
                                    "   <td> " +
                                    "     <div id='leerProducto' ><button onclick='getOnePro(\""+ item.entityKey +
                                          "\")' class='btn btn-info'>" +
                                          " Editar </button> " +
                                    "     <button onclick='deleteProduct(\""+ item.entityKey +
                                          "\")' class='btn btn-danger'>" + "Eliminar </button> </div>" +
                                    "   </td>" +
                                    "   <td class='text-center'>" + item.nombre + "</td>" +                                       
                                    "   <td class='text-center'>" + item.disponibles + "</td>" +
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
          myTableProductos += "</tbody>" +
                            "</table>";
          $("#lstProductos").append(myTableProductos);
      }
    });
    
    $scope.logout = function(){
      sessionStorage.clear();
      window.location.href = '/';
    };
      
    $scope.editarProducto = function(data) {
      var myData = new ConsigueOneProductObject(data);

         $http({
          url: 'https://helloworld-suriel.appspot.com/_ah/api/products_api/v1/product/get',
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
                sessionStorage.nombre = response.data.data[0].nombre;
                sessionStorage.disponibles = response.data.data[0].disponibles;            
                sessionStorage.entityKey = response.data.data[0].entityKey;
                sessionStorage.precio = response.data.data[0].precio;
                window.location.href = '/editarProducto';
            }            
        });           
     };
  });