import React from "react";
import { Jumbotron, Form, Container, ListGroup } from "react-bootstrap";
import { handleNewMessage, emitNewMessage } from "./api";

class App extends React.Component {
  constructor() {
    super();

    console.log("constructed");

    handleNewMessage(newMessage => {
      let { conversation } = this.state;

      conversation =
        conversation.length > 10 ? conversation.slice(1) : conversation;

      this.setState({
        conversation: [...conversation, newMessage]
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
      <Jumbotron className="vh-100 m-0">
        <Container>
          {this.state.connected ? null : (
            <Form
              onSubmit={e => {
                e.preventDefault();
                this.setState(state => {
                  state.connected = true;
                  return state;
                });
                emitNewMessage(this.state.currentUser + " just joined");
              }}
            >
              <Form.Label>
                Welcome to the room, what is your nickname?
              </Form.Label>
              <Form.Control
                placeholder="my nickname is ..."
                onChange={e => {
                  e.preventDefault();
                  this.setState({ currentUser: e.target.value });
                }}
                value={this.state.currentUser}
              />
            </Form>
          )}
          <h3>Chatroom</h3>
          <Container className="overflow-auto h-80">
            <ListGroup>
              {this.state.conversation.map((message, index) => {
                return <ListGroup.Item key={index}>{message}</ListGroup.Item>;
              })}
            </ListGroup>
          </Container>
          <Container className="fixed-bottom">
            {this.state.connected ? (
              <Form
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
                <Form.Group>
                  <Form.Label>Message: </Form.Label>
                  <Form.Control
                    placeholder="start typing ..."
                    onChange={e => {
                      e.preventDefault();
                      this.setState({ newMessage: e.target.value });
                    }}
                    value={this.state.newMessage}
                  />
                </Form.Group>
              </Form>
            ) : null}
          </Container>
        </Container>
      </Jumbotron>
    );
  }
}

export default App;
