
function getData() 
{

	sessionStorage.empresa = "kubeet";

    jQuery.support.cors = true;
    $("#showProductos").empty();
    $("#showClientes").empty();

    var myTableClientes = "";
    var myTableProductos = "";

    try
    { 
     $.ajax({
        url: "/getProducts", 
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: true,
        data: {empresa: sessionStorage.empresa},                         
        type: 'get',
        crossDomain: true,
        success: function(response) {
             productos = response;
          //alert(response);
          productos.forEach(function (producto) 
          {
             myTableProductos += "<div class='col-md-3 col-sm-4 col-xs-6 single_portfolio_text'>" +
                                  "  <img src='" + producto.urlImage + "' alt='Producto' />" +
                                  "  <div class='portfolio_images_overlay text-center'>" +
                                  "      <h6>" + producto.nombre + "</h6>" +
                                  "      <p class='product_price'>$"+ producto.precio +"</p>" +
                                  "      <a href='' class='btn btn-primary'>Click here</a>" +
                                  "  </div>" +
                                "</div>";
          }); 
          $("#showProductos").append(myTableProductos);
       }
    }); 

     $.ajax({
        url: "/getClientes",
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: true,
        data: {empresa: sessionStorage.empresa},                         
        type: 'get',
        crossDomain: true,
        success: function(response) {
	           clientes = response;
          //alert(response);
          clientes.forEach(function (cliente) 
          {
             myTableClientes += "<div class='col-md-3 col-sm-4 col-xs-6 single_portfolio_text'>" +
                                  "  <img src='" + cliente.urlImage + "' alt='Producto' />" +
                                  "  <div class='portfolio_images_overlay text-center'>" +
                                  "      <h6>" + cliente.email + "</h6>" +
                                  "      <p class='product_price'>$"+ cliente.nombre +"</p>" +
                                  "      <a href='' class='btn btn-primary'>Click here</a>" +
                                  "  </div>" +
                                "</div>";
          }); 
          $("#showClientes").append(myTableClientes);
     	 }
    });          
     
    }
 catch(e)
    {
      alert("error : " +  e);
     }
}

