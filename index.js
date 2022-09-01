const express = require('express');
const app = express();

// estamos adotando o servidor do node ao invés do express
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

io.on('connection', (socket) => {
  console.log('SOCKET INSTANCE', socket.id);
  socket.on('welcome', (data) => {
    console.log('EVENTO DO CLIENTE, CHEGOU O SERVIDOR', data)

  });

  socket.on('palavra', (data) => {
    console.log('qual palavra o usuario inputou', data);
    socket.emit('resultado', data);
  });
});

//executando o servidor na porta 5000

http.listen(5000, () => {
  console.log('servidor rodando:  http://localhost:5000');
});