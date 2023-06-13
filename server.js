const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(3000, () => {
  console.log("server corriendo *:3000");
});

io.on("connection", (socket) => {  
  socket.on("ubicacion", (data) => {
    console.log(socket.id,JSON.stringify(data));
    io.emit('ubicacion', data);
  });
});
