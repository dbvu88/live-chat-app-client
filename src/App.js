import React from "react";
import {
  Jumbotron,
  Form,
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Row,
  Col
} from "react-bootstrap";
import { handleNewMessage, emitNewMessage } from "./api";
import { Route } from "react-router-dom";
import NicknameForm from "./Components/NicknameForm";

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
    return (
      <Container className="vh-100 pt-3">
        {this.state.connected ? null : <NicknameForm signIn={this.signIn} />}
        <div className="position-relative h-75">
          <div className="overflow-auto h-100">
            <ListGroup>
              {this.state.conversation.map((message, index) => {
                return (
                  <ListGroupItem className="border-0" key={index}>
                    <div id={index}>{message}</div>
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          </div>
        </div>

        <div className="mt-3">
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
              <Form.Group as={Row}>
                <Col sm={2}>
                  <Form.Label>Message: </Form.Label>
                </Col>

                <Col sm={8}>
                  <Form.Control
                    autoFocus
                    placeholder="start typing ..."
                    onChange={e => {
                      e.preventDefault();
                      this.setState({ newMessage: e.target.value });
                    }}
                    value={this.state.newMessage}
                  />
                </Col>

                <Col sm={2}>
                  <Button variant="primary" type="submit">
                    Send
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          ) : null}
        </div>
      </Container>
    );
  }
}

export default App;
