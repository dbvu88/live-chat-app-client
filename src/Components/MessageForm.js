import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { emitNewMessage } from "../api";
import { Route } from "react-router-dom";

const MessageForm = props => {
  const [newMessage, setNewMessage] = useState("");
  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        emitNewMessage(this.state.currentUser + ": " + this.state.newMessage);
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
  );
};

export default MessageForm;
