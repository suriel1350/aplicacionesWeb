function getOneProduct(entKey)
{
  try
  {
    var myData = new ConsigueOneProductObject(entKey);
    $.ajax({
      url: "https://helloworld-suriel.appspot.com/_ah/api/products_api/v1/product/get",
      dataType: 'json',
      cache: false, 
      contentType: false, 
      processData: true, 
      data: myData.toJsonString(),
      type: 'POST',
      crossDomain: true,
      success: function(response){                
        //alert(response.data[0].nombre);        
        window.location.href = '/editarProducto';
        getData(response.data[0].nombre);

      }    
    });
  }
  catch(e)
  {
    alert("error: " + e);
  }
}

function getData(nombre)
{
  
}