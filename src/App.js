import React from "react";
import { Card, Container, Col, Row, Nav, NavDropdown } from "react-bootstrap";
import { handleNewMessage, handleUserActivity } from "./api";
import NicknameForm from "./Components/NicknameForm";
import MessageForm from "./Components/MessageForm";
import Conversation from "./Components/Conversation";
import CurrentUsers from "./Components/CurrentUsers";

class App extends React.Component {
  state = {
    currentUser: "",
    connected: false,
    timestamp: "starting timer",
    conversation: [],
    newMessage: "",
    currentUsers: []
  };

  signIn = nickname => {
    this.setState(state => {
      state.connected = !this.state.connected;
      state.currentUser = nickname;
      return state;
    });
  };

  renderCurrentUsers = currentUsers => {
    this.setState({ currentUsers });
  };

  renderConversation = newMessage => {
    let { conversation } = this.state;
    this.setState({
      conversation: [...conversation, newMessage]
    });
    const divOverflow = document.querySelector("div.overflow-auto");
    divOverflow.scrollTo(0, divOverflow.scrollHeight);
  };

  componentDidMount() {
    handleNewMessage(this.renderConversation);
    handleUserActivity(this.renderCurrentUsers);
  }

  render() {
    const { conversation, currentUser, currentUsers, connected } = this.state;
    return (
      <Container className="vh-100">
        <Nav>
          <NavDropdown title="Online Chatters">
            {currentUsers.length ? (
              currentUsers.map((item, index) => (
                <NavDropdown.Item key={index}>{item}</NavDropdown.Item>
              ))
            ) : (
              <NavDropdown.Item>
                no online chatter at this time
              </NavDropdown.Item>
            )}
          </NavDropdown>
        </Nav>
        <div className="position-relative h-75">
          {/* <Row className="h-100"> */}
          {/* <Col sm={8} className="h-100"> */}
          {/* <Card body className="overflow-auto h-100">
                <Conversation {...{ conversation }} />
              </Card> */}
          <Card className="h-100">
            <Card.Header>Messages</Card.Header>
            <Card.Body className="overflow-auto">
              <Conversation {...{ conversation }} />
            </Card.Body>
          </Card>
          {/* </Col> */}
          {/* <Col sm={4} className="h-100">
              <Card className="overflow-auto h-100">
                <Card.Header>Online Chatters</Card.Header>
                <Card.Body>
                  <CurrentUsers {...{ currentUsers }} />
                </Card.Body>
              </Card>
            </Col> */}
          {/* </Row> */}
        </div>
        <Card body>
          {connected ? (
            <MessageForm {...{ currentUser }} />
          ) : (
            <NicknameForm {...{ currentUsers, signIn: this.signIn }} />
          )}
        </Card>
      </Container>
    );
  }
}

export default App;
