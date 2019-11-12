import React from "react";
import { Card, Container } from "react-bootstrap";
import { handleNewMessage, emitNewMessage } from "./api";
import { Route } from "react-router-dom";
import NicknameForm from "./Components/NicknameForm";
import MessageForm from "./Components/MessageForm";
import Conversation from "./Components/Conversation";

class App extends React.Component {
  constructor(props) {
    super(props);

    console.log("constructed");

    handleNewMessage(newMessage => {
      let { conversation } = this.state;

      // conversation =
      //   conversation.length > 10 ? conversation.slice(1) : conversation;

      this.setState({
        conversation: [...conversation, newMessage]
      });

      const divOverflow = document.querySelector("div.overflow-auto");
      divOverflow.scrollTo(0, divOverflow.scrollHeight);
    });
  }

  signIn = nickname => {
    this.setState(state => {
      state.connected = !this.state.connected;
      state.currentUser = nickname;
      return state;
    });
  };

  state = {
    currentUser: "",
    connected: false,
    timestamp: "starting timer",
    conversation: [],
    newMessage: ""
  };

  componentDidMount() {}

  render() {
    // console.log(this.props);
    const { conversation, currentUser, connected } = this.state;
    return (
      <Container className="vh-100">
        <div className="position-relative h-75">
          {/* <div > */}
          <Card body className="overflow-auto h-100">
            <Conversation {...{ conversation }} />
          </Card>
          {/* </div> */}
        </div>
        <Card body>
          {connected ? (
            <MessageForm {...{ currentUser }} />
          ) : (
            <NicknameForm signIn={this.signIn} />
          )}
        </Card>
      </Container>
    );
  }
}

export default App;
