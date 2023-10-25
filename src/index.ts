import cors from "cors";
import express from 'express';
import { createServer } from "http";
import { Server } from 'socket.io';

const app = express();

const server = createServer(app);
const port = process.env.PORT || 3000;

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

server.listen(port, () => {
  console.log(`👽 Server socket corriendo ->:${port} 👽`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/test-client/index.html");
});

io.on("connection", (socket) => {
  socket.on("ubicacion", (data) => {
    console.log(socket.id, JSON.stringify(data));
    io.emit("ubicacion", data);
  });
});