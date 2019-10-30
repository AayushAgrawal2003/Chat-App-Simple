var express = require("express");
var socket = require("socket.io");
//App Setup
var app = express();
var server = app.listen(5000, () => {
  console.log("running on port 5000");
});

///Static Files
app.use(express.static("public"));

var io = socket(server);

io.on("connection", socket => {
  console.log("made connection", socket.id);

  socket.on("chat", data => {
    io.sockets.emit("chat", data);
  });
  socket.on("typing", data => {
    socket.broadcast.emit("typing", data);
  });
});
