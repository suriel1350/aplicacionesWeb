function ConsigueObject() {        
    this.tokenint = sessionStorage.token;
    this.toJsonString = function () { return JSON.stringify(this); };
};

function ConsigueOneProductObject(entiKey) {        
    this.tokenint = sessionStorage.token;
    this.entityKey = entiKey;
    this.toJsonString = function () { return JSON.stringify(this); };
};

function getOneCli(entKey)
{  
  angular.element(document.getElementById('leerCliente')).scope().editarCliente(entKey);
  
}

function deleteCliente(entKey)
{
  try
  {
    var myData = new ConsigueOneProductObject(entKey);    
    jQuery.ajax({
      url: "https://helloworld-suriel.appspot.com/_ah/api/clientes_api/v1/cliente/delete",
      dataType: 'json',
      cache: false, 
      contentType: 'application/json; charset=utf-8', 
      processData: true, 
      data: myData.toJsonString(),
      type: 'POST',
      crossDomain: true,
      success: function(response){
        window.location.href = '/clientes'
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

angular.module('getClientes', ['ngResource','ngCookies'])
  .controller('TodoCtrl', function($scope, $http, $cookies){
    $scope.show=0;
    $scope.todos = [];
    var datos = [];
    var contador  = 0;

    var myData = new ConsigueObject(); 

    $http({
        url: 'https://helloworld-suriel.appspot.com/_ah/api/clientes_api/v1/cliente/list',
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

        $("lstClientes").empty();

        var myTableClientes = "<table class='table'>" +
                               "         <thead class='text-primary'>" +
                               "             <th class='text-center'>Opciones</th>" +
                               "             <th class='text-center'>Nombre</th>" +
                               "             <th class='text-center'>Dirección</th>" +
                               "             <th>Teléfono</th>" +
                               "             <th>Email</th>" +
                               "             <th>Imagen</th>" +                                
                               "         </thead>" + 
                               "    <tbody>";
                                        

        angular.forEach(response.data.data, function(item) {                 
           
           myTableClientes +=      "<tr>" +
                                    "   <td> " +
                                    "     <div id='leerCliente' ><button onclick='getOneCli(\""+ item.entityKey +
                                          "\")' class='btn btn-info'>" +
                                          " Editar </button> " +
                                    "     <button onclick='deleteCliente(\""+ item.entityKey +
                                          "\")' class='btn btn-danger'>" + "Eliminar </button> </div>" +
                                    "   </td>" +
                                    "   <td class='text-center'>" + item.nombre + "</td>" +                                       
                                    "   <td class='text-center'>" + item.direccion + "</td>" +
                                    "   <td class='text-primary'>" + item.telefono + "</td>" + 
                                    "   <td class='text-primary'>" + item.email + "</td>" + 
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
          myTableClientes += "</tbody>" +
                            "</table>";
          $("#lstClientes").append(myTableClientes);
      }
    });
    
    $scope.logout = function(){
      sessionStorage.clear();
      window.location.href = '/';
    };

    $scope.editarCliente = function(data) {
      var myData = new ConsigueOneProductObject(data);

         $http({
          url: 'https://helloworld-suriel.appspot.com/_ah/api/clientes_api/v1/cliente/get',
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
                sessionStorage.direccion = response.data.data[0].direccion;            
                sessionStorage.telefono = response.data.data[0].telefono;            
                sessionStorage.entityKey = response.data.data[0].entityKey;
                sessionStorage.email = response.data.data[0].email;
                window.location.href = '/editarCliente';
            }            
        });           
     };
  });