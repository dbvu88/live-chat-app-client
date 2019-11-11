import React from "react";
import "./App.css";
import { handleNewMessage, emitNewMessage } from "./api";

class App extends React.Component {
  constructor() {
    super();

    console.log("constructed");

    handleNewMessage(newMessage => {
      this.setState({
        conversation: [...this.state.conversation, newMessage]
      });
    });
  }

  state = {
    currentUser: "",
    connected: false,
    timestamp: "starting timer",
    conversation: [],
    newMessage: ""
  };

  render() {
    return (
      <div>
        <h1>Welcome to public chat room</h1>
        {this.state.connected ? (
          <form
            onSubmit={e => {
              e.preventDefault();
              emitNewMessage(
                this.state.currentUser + ": " + this.state.newMessage
              );
              this.setState(state => {
                state.newMessage = "";
                return state;
              });
            }}
          >
            <label>Message: </label>
            <input
              onChange={e => {
                e.preventDefault();
                this.setState({ newMessage: e.target.value });
              }}
              value={this.state.newMessage}
            />
          </form>
        ) : (
          <form
            onSubmit={e => {
              e.preventDefault();
              this.setState(state => {
                state.connected = true;
                return state;
              });
              emitNewMessage(this.state.currentUser + " just joined");
            }}
          >
            <label>Enter a nick name to join the conversation. </label>
            <input
              onChange={e => {
                e.preventDefault();
                this.setState({ currentUser: e.target.value });
              }}
              value={this.state.currentUser}
            />
          </form>
        )}
        <div>
          <h3>Conversation: </h3>
          <ul>
            {this.state.conversation.map((message, index) => {
              return <li key={index}>{message}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
