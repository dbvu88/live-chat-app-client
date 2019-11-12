import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { emitNewMessage } from "../api";

const MessageForm = props => {
  const [newMessage, setNewMessage] = useState("");
  return (
    <Form
      className="d-flex justify-content-between align-items-start"
      onSubmit={e => {
        e.preventDefault();
        emitNewMessage(props.currentUser + ": " + newMessage);
        setNewMessage("");
      }}
    >
      <Form.Label htmlFor="message-input">Message: </Form.Label>
      <Col>
        <Form.Control
          autoFocus
          id="message-input"
          placeholder="start typing ..."
          onChange={e => {
            e.preventDefault();
            setNewMessage(e.target.value);
          }}
          value={newMessage}
        />
      </Col>
      <Button variant="primary" type="submit">
        Send
      </Button>
    </Form>
  );
};

export default MessageForm;
