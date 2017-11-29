function LoginObject(myEmail, myPasswd) {
    this.email = myEmail;
    this.password = myPasswd;
    this.toJsonString = function () { return JSON.stringify(this); };
};

angular.module('login', ['ngCookies'])
  .controller('TodoCtrl', function($scope, $cookies, $http){
    if(sessionStorage.getItem('token')){
        window.location.href = '/';
    }
    $scope.loger = function() {
        var myData = new LoginObject($scope.email, $scope.password);
        //alert(myData.toJsonString());
    $http({
        url: 'https://helloworld-suriel.appspot.com/_ah/api/usuarios_api/v1/users/login',
        method: 'POST',
        data: myData.toJsonString(),
        headers : {
            'Content-Type' : 'application/json; charset=utf-8',
            'dataType' : 'json'
        },
    })
    .then(function(response) {
        if (response.data.code!=1){
            $scope.code=response.data.code;
        }else{
            sessionStorage.setItem('token',response.data.token);
            sessionStorage.setItem('code',response.data.code);
            sessionStorage.setItem('tipo',response.data.message);
            sessionStorage.setItem('entKey',response.data.entityKey);                        
            window.location.href = '/usuario';
        }
    });
    };
  });
/* contact
function LoginObject(myEmail, myPasswd) {
    this.email = myEmail;
    this.password = myPasswd;
    this.toJsonString = function () { return JSON.stringify(this); };

};

function loginDemo()
{
	//alert("testing...")
	var myData = new LoginObject(
    $("#email").val(), 
    $("#passwd").val());
	
  alert(myData.toJsonString());

	 jQuery.ajax({
         type: "POST",
         url: "http://localhost:8080/_ah/api/usuarios_api/v1/users/login",
         data: myData.toJsonString(),
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         success: function (response) {
              // do something
              sessionStorage.token = response.token;
              alert ("token generado: " + sessionStorage.token);
              window.location = "/tweets";

         },
     
         error: function (error) {            
              // error handler
              alert(error)
         }

     });

}
*/