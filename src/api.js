import openSocket from "socket.io-client";
require("dotenv").config();
const url = process.env.REACT_APP_SERVER_URL || "http://localhost:8000/";
const socket = openSocket(url);

const subscribeToTimer = cb => {
  // console.log("subscribe to timer");
  socket.on("timer", cb);
  socket.emit("subscribeToTimer", 1000);
};

const handleNewMessage = cb => {
  // console.log("subscribe to newMessage");
  socket.on("conversation", cb);
};

const handleUserActivity = cb => {
  // console.log("subscribe to newMessage");

  socket.on("currentUsers", cb);
};

const emitNewMessage = newMessage => {
  // console.log("on newMessage");
  socket.emit("newMessage", newMessage);
};

const emitNewChatter = nickname => {
  socket.emit("NewChatter", nickname);
};

export {
  subscribeToTimer,
  handleNewMessage,
  emitNewMessage,
  emitNewChatter,
  handleUserActivity
};
