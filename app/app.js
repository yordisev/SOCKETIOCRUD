const socket = io("http://localhost:3000");
// const socket = io()

var mensajes = document.getElementById('mensajes');
var usuario = document.getElementById('usuario');
var enviar = document.getElementById('enviar');
var salida = document.getElementById('salida');
var accion = document.getElementById('accion');

document.addEventListener("DOMContentLoaded", function(event) {
    socket.emit('read', usuario.value);
});

// recibe los datos desde el servidor
socket.on('datosusuarios',function(data){
    console.log(data)
})
// envia los datos al servidor
enviar.addEventListener('click', function (){
    const datosenviar = {
        usuario:usuario.value,
        token:mensajes.value
    }
    socket.emit('create',datosenviar)
})
socket.on('crearusuario',function(data){
    console.log(data)
})

// envia los datos al servidor
mensajes.addEventListener('keypress', function(){
    socket.emit('chat:escribiendo', usuario.value);
})
// recibe los datos desde el servidor
socket.on('chat:escribiendo',function(data){
    accion.innerHTML = `<p><em>${data} esta escribiendo</em></p>`
})