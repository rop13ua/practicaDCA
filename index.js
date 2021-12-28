//Raquel Ortega Pérez y Janira Elías Jiménez

const { application } = require('express');
var express = require("express")
var jwt = require('jwt-simple');
var moment = require('moment');
var fs = require("fs");
var app = express()
app.use(express.json())

// Datos estátios
var secret = '123456'
var loginCorrecto= 'raquel'
var contrasenaCorrecta='123'

app.post('/packages4you/login', function(pet, resp){
  var loginBuscado = pet.body.login
  var passwordBuscado = pet.body.password
 
  if(loginBuscado == loginCorrecto && passwordBuscado == contrasenaCorrecta) {
    var payload = {
      login: result[0].email,
      exp: moment().add(7, 'days').valueOf()
    }
    var token = jwt.encode(payload, secret)    
    resp.send({message:"OK", token:token})
  }
  else{
    resp.status(403);
    resp.send({status:403, message: "Bad Request: 403 Forbbiden"});
  }
})

//Middleware: lo pondremos ANTES de procesar cualquier petición que requiera autentificación
function chequeaJWT(pet, resp, next) {

  var token = getTokenFromAuthHeader(pet)
  var es_valido = false;
  
  if(token != undefined)
  {
    try{
      jwt.decode(token, secret)
      es_valido = true;
    }
    catch(error){
      es_valido = false;
    }
  }
    
  if (es_valido) {
      next()
  }
  else {
      resp.status(403);
      resp.send({status:403, message: "Bad Request: 403 Forbbiden"});

  }
}

function getTokenFromAuthHeader(pet) {
  var cabecera = pet.header('Authorization')
  if (cabecera) {
      //Parte el string por el espacio. Si está, devolverá un array de 2
      //la 2ª pos será lo que hay detrás de "Bearer"
      var campos = cabecera.split(' ')
      if (campos.length>1 && cabecera.startsWith('Bearer')) {
          return campos[1] 
      }
  }
  return undefined
}

var listener = app.listen(process.env.PORT||3000, () => {
  console.log(`Servidor en el puerto ${listener.address().port}`);
});
