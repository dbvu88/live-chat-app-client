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

class App extends React.Component {
  constructor(props) {
    super(props);

    console.log("constructed");

    handleNewMessage(newMessage => {
      let { conversation } = this.state;

      conversation =
        conversation.length > 10 ? conversation.slice(1) : conversation;

      this.setState({
        conversation: [...conversation, newMessage]
      });

      const divOverflow = document.querySelector("div.overflow-auto");
      divOverflow.scrollTo(0, divOverflow.scrollHeight);
    });
  }

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
        {this.state.connected ? null : (
          <Form
            className="d-flex align-items-center"
            onSubmit={e => {
              e.preventDefault();
              this.setState(state => {
                state.connected = true;
                return state;
              });
              emitNewMessage(this.state.currentUser + " just joined");
            }}
          >
            <Form.Group as={Row} className="w-100">
              <Col sm={5}>
                <Form.Label>
                  Welcome to the room, what is your nickname?
                </Form.Label>
              </Col>
              <Col sm={5}>
                <Form.Control
                  autoFocus
                  placeholder="my nickname is ..."
                  onChange={e => {
                    e.preventDefault();
                    this.setState({ currentUser: e.target.value });
                  }}
                  value={this.state.currentUser}
                />
              </Col>
              <Col sm={2}>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Col>
            </Form.Group>
          </Form>
        )}
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
                <Col sm={1}>
                  <Form.Label>Message: </Form.Label>
                </Col>

                <Col sm={10}>
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

                <Col sm={1}>
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
