import React, { useState, useRef } from "react";
import { Form, Button, Tooltip, Col, Row } from "react-bootstrap";
import { emitNewMessage, emitNewChatter } from "../api";
import { Route } from "react-router-dom";

const NicknameForm = props => {
  const [nickname, setNickname] = useState("");
  const [warning, setWarning] = useState("");
  const { currentUsers } = props;
  return (
    <Form
      onSubmit={e => {
        e.preventDefault();

        if (!nickname) {
          setWarning("nickname is required to join the room");
          return null;
        }

        if (currentUsers.includes(nickname)) {
          setWarning("please pick a different nickname");
          return null;
        }
        props.signIn(nickname);
        emitNewChatter(nickname);
        emitNewMessage(nickname + " just joined");
      }}
    >
      <Row>
        <Col sm={5}>
          <Form.Label htmlFor="nickname-input">
            What is your nickname?
          </Form.Label>
        </Col>
        <Col sm={5}>
          <Form.Control
            className="w-100"
            id="nickname-input"
            autoFocus
            placeholder="my nickname is ..."
            onChange={e => {
              e.preventDefault();
              setNickname(e.target.value);
            }}
            value={nickname}
          />
          {warning && <Form.Text className="text-muted">{warning}</Form.Text>}
        </Col>
        <Col sm={2}>
          <Button className="w-100" variant="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default NicknameForm;
