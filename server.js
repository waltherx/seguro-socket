const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors());

server.listen(port, () => {
  console.log(`server corriendo *:${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {

  socket.on("ubicacion", (data) => {    
    console.log(socket.id, JSON.stringify(data));
    io.emit("ubicacion", data);
  });
});