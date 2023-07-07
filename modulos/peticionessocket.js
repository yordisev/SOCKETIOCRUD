const crearusuario = (socket, db) => {
    socket.on('create', (data) => {
      const { usuario, token } = data;
      const query = 'INSERT INTO usuarios_token (usuario_id, token) VALUES (?, ?)';
      db.query(query, [usuario, token], (err, result) => {
        if (err) {
          socket.emit('crearusuario', err.message);
        } else {
          socket.emit('crearusuario', result.insertId);
        }
      });
    });
  };
  
  const listarusuarios = (socket, db) => {
    socket.on('read', () => {
      const query = 'SELECT * FROM db_usuarios';
      db.query(query, (err, result) => {
        if (err) {
          socket.emit('datosusuarios', err.message);
        } else {
          socket.emit('datosusuarios', result);
        }
      });
    });
  };
  
  const actualizarusuarios = (socket, db) => {
    socket.on('update', (data) => {
      const { id, usuario, token } = data;
      const query = 'UPDATE usuarios_token SET usuario_id = ?, token = ? WHERE id_usuario = ?';
      db.query(query, [usuario, token, id], (err) => {
        if (err) {
          socket.emit('updateError', err.message);
        } else {
          socket.emit('updateSuccess');
        }
      });
    });
  };
  
  const eliminarusuario = (socket, db) => {
    socket.on('delete', (id) => {
      const query = 'DELETE FROM usuarios_token WHERE id_usuario = ?';
      db.query(query, [id], (err) => {
        if (err) {
          socket.emit('deleteError', err.message);
        } else {
          socket.emit('deleteSuccess');
        }
      });
    });
  };
  
  module.exports = { crearusuario, listarusuarios, actualizarusuarios, eliminarusuario };
  