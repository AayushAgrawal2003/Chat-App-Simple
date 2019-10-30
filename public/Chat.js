//Make connection

var socket = io.connect("http://localhost:5000");

var message = document.getElementById("message"),
  handle = document.getElementById("handle"),
  btn = document.getElementById("send"),
  output = document.getElementById("output"),
  feedback = document.getElementById("feedback");

//body.removeChild(handle);

//Emit Event
var HANDLE;
btn.addEventListener("click", () => {
  if (!HANDLE) {
    HANDLE = handle.value;
  }
  socket.emit("chat", {
    handle: HANDLE, //handle variable made above
    message: message.value //message variable made above
  });
  handle.parentNode.removeChild(handle);
});

message.addEventListener("keypress", () => {
  socket.emit("typing", handle.value);
});

//Listen for Events

socket.on("chat", data => {
  feedback.innerHTML = "";
  output.innerHTML +=
    "<p><strong>" + data.handle + ":   </strong>" + data.message + "</p>";
  message.value = "";
});

socket.on("typing", data => {
  feedback.innerHTML = "<p><em>" + data + " is typing a message...</em></p>";
});
