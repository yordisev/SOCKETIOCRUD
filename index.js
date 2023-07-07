const express = require('express');
const app = express();
const socketio = require('socket.io');
const cors = require('cors');
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST']
}));
const db_connection = require('./config/conexion');
const { crearusuario, listarusuarios, actualizarusuarios, eliminarusuario } = require('./modulos/peticionessocket');
const server = app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
const io = socketio(server,{ cors: {
    origin: "*",
  //   origin: "https://example.com",
    methods: ["GET", "POST"]
  }});
  io.on('connection', (socket) => {
      console.log('Nueva conexión de socket establecida');
      crearusuario(socket, db_connection);
      listarusuarios(socket, db_connection);
      actualizarusuarios(socket, db_connection);
      eliminarusuario(socket, db_connection);
    });
    // global.io = io;
    // global.io.on('create', (data) => {
    //     const { usuario, token } = data;
    //     const query = 'INSERT INTO usuarios_token (usuario_id, token) VALUES (?, ?)';
    //     db.query(query, [usuario, token], (err, result) => {
    //       if (err) {
    //         global.io.emit('crearusuario', err.message);
    //       } else {
    //         global.io.emit('crearusuario', result.insertId);
    //       }
    //     });
    //   });