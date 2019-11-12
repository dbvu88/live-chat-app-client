import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { emitNewMessage } from "../api";
import { Route } from "react-router-dom";

const NicknameForm = props => {
  const [nickname, setNickname] = useState("");
  return (
    <Form
      className="d-flex align-items-center"
      onSubmit={e => {
        e.preventDefault();
        props.signIn(nickname);
        emitNewMessage(nickname + " just joined");
      }}
    >
      <Form.Group as={Row} className="w-100">
        <Col sm={5}>
          <Form.Label>Welcome to the room, what is your nickname?</Form.Label>
        </Col>
        <Col sm={5}>
          <Form.Control
            autoFocus
            placeholder="my nickname is ..."
            onChange={e => {
              e.preventDefault();
              setNickname(e.target.value);
            }}
            value={nickname}
          />
        </Col>
        <Col sm={2}>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default NicknameForm;
