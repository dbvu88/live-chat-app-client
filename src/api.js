import dotenv from "dotenv";
import openSocket from "socket.io-client";

dotenv.config();
const url = process.env.SERVER_URL || "http://localhost:8000/";
const socket = openSocket(url);
// "https://ducchatapp.herokuapp.com/"
const subscribeToTimer = cb => {
  console.log("subscribe to timer");
  socket.on("timer", cb);
  socket.emit("subscribeToTimer", 1000);
};

const handleNewMessage = cb => {
  console.log("subscribe to newMessage");
  socket.on("conversation", cb);
};

const emitNewMessage = newMessage => {
  console.log("on newMessage");
  socket.emit("newMessage", newMessage);
};

// const subscribeToNewUser = cb => {
//   socket.on("newUser", cb);
// };

export { subscribeToTimer, handleNewMessage, emitNewMessage };
