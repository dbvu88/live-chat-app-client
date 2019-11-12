import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { emitNewMessage } from "../api";

const MessageForm = props => {
  const [newMessage, setNewMessage] = useState("");
  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        emitNewMessage(props.currentUser + ": " + newMessage);
        setNewMessage("");
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
              setNewMessage(e.target.value);
            }}
            value={newMessage}
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
