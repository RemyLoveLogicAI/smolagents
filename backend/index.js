require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const Bull = require('bull');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const taskQueue = new Bull('tasks', {
  redis: {
    host: 'localhost',
    port: 6379
  }
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

app.get('/', (req, res) => {
  res.send('Backend server is running');
});

const port = 3001;
server.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
