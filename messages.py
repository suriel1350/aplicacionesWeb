from protorpc import messages
from protorpc import message_types

class MessageNone(messages.Message):
    inti = messages.StringField(1)
# Input messages
#Recibe el token para validar
class Token(messages.Message):
    tokenint = messages.StringField(1, required=True)
    #entityKey = messages.StringField(2, required=False)
    #fromurl = messages.StringField(3)

#Recibe el token y un entityKey de cualquier base de datos para validar
class TokenKey(messages.Message):
    tokenint = messages.StringField(1, required=True)
    entityKey = messages.StringField(2, required=True)
    #fromurl = messages.StringField(3)


#Recibe el email y contrasena para la creacion de token
class EmailPasswordMessage(messages.Message):
    email = messages.StringField(1, required=True)
    password = messages.StringField(2, required=True)

# Output messages
#regresa un token
class TokenMessage(messages.Message):
    code = messages.IntegerField(1)
    message = messages.StringField(2)
    token = messages.StringField(3)
    entityKey = messages.StringField(4)

#regresa mensajes de lo ocurrido
class CodeMessage(messages.Message):
    code = messages.IntegerField(1)
    message = messages.StringField(2)

#USERS
class UserInput(messages.Message):
    token = messages.StringField(1) 
    empresa_key = messages.StringField(2)
    email = messages.StringField(3)
    password = messages.StringField(4)
    nombre = messages.StringField(5)
    edad = messages.StringField(6)
    urlImage = messages.StringField(7)


class UserUpdate(messages.Message):
    token = messages.StringField(1)
    email = messages.StringField(2)
    password = messages.StringField(3)
    nombre = messages.StringField(4)
    edad = messages.StringField(5)
    urlImage = messages.StringField(6)
    entityKey = messages.StringField(7, required=True)


class UserList(messages.Message):
    code = messages.IntegerField(1)
    data = messages.MessageField(UserUpdate, 2, repeated=True)


######Empresa########

#Mensaje de Entrada y Salida para la base de datos Empresa
class EmpresaInput(messages.Message):
    token = messages.StringField(1, required=True) 
    codigo_empresa = messages.StringField(2)
    nombre_empresa = messages.StringField(3)


class EmpresaUpdate(messages.Message):
    token = messages.StringField(1, required=True)
    entityKey = messages.StringField(2, required=True)
    codigo_empresa = messages.StringField(3)
    nombre_empresa = messages.StringField(4)



#regresa una lista para la base de datos Empresa
class EmpresaList(messages.Message):
    code = messages.IntegerField(1)
#regresa mensaje de lo ocurrido
#mensaje de tipo MENSAJEFIELD que regresa una lista de tipo EmpresaUpdate
#es necesario el repeated para que sea lista
    data = messages.MessageField(EmpresaUpdate, 2, repeated=True)


######Tweet########

#Mensaje de Entrada y Salida para Tweets
class TweetInput(messages.Message):
    token = messages.StringField(1, required=True) 
    title = messages.StringField(2)
    description = messages.StringField(3)
    urlImage = messages.StringField(5)

    
class TweetUpdate(messages.Message):
    token = messages.StringField(1, required=True)
    #empresa_key = messages.StringField(2, required=True)
    entityKey = messages.StringField(2, required=True)
    title = messages.StringField(3)
    description = messages.StringField(4)
    urlImage = messages.StringField(5)

#regresa una lista para la base de datos Empresa
class TweetList(messages.Message):
    code = messages.IntegerField(1)
#regresa mensaje de lo ocurrido
#mensaje de tipo MENSAJEFIELD que regresa una lista de tipo TeamUpdate
#es necesario el repeated para que sea lista
    data = messages.MessageField(TweetUpdate, 2, repeated=True)

    
######Product########

#Mensaje de Entrada y Salida para Tweets
class ProductInput(messages.Message):
    token = messages.StringField(1, required=True) 
    nombre = messages.StringField(2)
    disponibles = messages.StringField(3)
    precio = messages.StringField(4)
    urlImage = messages.StringField(5)

class ProductUpdate(messages.Message):
    token = messages.StringField(1, required=True)
    #empresa_key = messages.StringField(2, required=True)
    entityKey = messages.StringField(2, required=True)
    nombre = messages.StringField(3)
    disponibles = messages.StringField(4)
    precio = messages.StringField(5)
    urlImage = messages.StringField(6)

#regresa una lista para la base de datos Empresa
class ProductList(messages.Message):
    code = messages.IntegerField(1)
#regresa mensaje de lo ocurrido
#mensaje de tipo MENSAJEFIELD que regresa una lista de tipo TeamUpdate
#es necesario el repeated para que sea lista
    data = messages.MessageField(ProductUpdate, 2, repeated=True)


######Deposito########

#Mensaje de Entrada y Salida para Tweets
class DepositoInput(messages.Message):
    token = messages.StringField(1, required=True) 
    tipoBase = messages.StringField(2)
    detalles = messages.StringField(3)
    precio = messages.StringField(4)
    urlImage = messages.StringField(5)

class DepositoUpdate(messages.Message):
    token = messages.StringField(1, required=True)
    #empresa_key = messages.StringField(2, required=True)
    entityKey = messages.StringField(2, required=True)
    tipoBase = messages.StringField(3)
    detalles = messages.StringField(4)
    precio = messages.StringField(5)
    urlImage = messages.StringField(6)

#regresa una lista para la base de datos Empresa
class DepositoList(messages.Message):
    code = messages.IntegerField(1)
    data = messages.MessageField(DepositoUpdate, 2, repeated=True)


######Cliente########

#Mensaje de Entrada y Salida para Tweets
class ClienteInput(messages.Message):
    token = messages.StringField(1, required=True) 
    nombre = messages.StringField(2)
    direccion = messages.StringField(3)
    telefono = messages.StringField(4)
    email = messages.StringField(5)
    urlImage = messages.StringField(6)

class ClienteUpdate(messages.Message):
    token = messages.StringField(1, required=True)
    #empresa_key = messages.StringField(2, required=True)
    entityKey = messages.StringField(2, required=True)
    nombre = messages.StringField(3)
    direccion = messages.StringField(4)
    telefono = messages.StringField(5)
    email = messages.StringField(6)
    urlImage = messages.StringField(7)

#regresa una lista para la base de datos Empresa
class ClienteList(messages.Message):
    code = messages.IntegerField(1)
    data = messages.MessageField(ClienteUpdate, 2, repeated=True)