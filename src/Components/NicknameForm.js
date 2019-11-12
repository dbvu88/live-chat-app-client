import React, { useState, useRef } from "react";
import { Form, Button, Tooltip, Col, Overlay } from "react-bootstrap";
import { emitNewMessage, emitNewChatter } from "../api";
import { Route } from "react-router-dom";

const NicknameForm = props => {
  const [nickname, setNickname] = useState("");
  const [warned, setWarned] = useState(false);

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();

        if (!nickname) {
          setWarned(!warned);
          return null;
        }
        props.signIn(nickname);
        emitNewChatter(nickname);
        emitNewMessage(nickname + " just joined");
      }}
    >
      <div className="d-flex justify-content-between align-items-start">
        <Form.Label htmlFor="nickname-input">What is your nickname?</Form.Label>
        <Col>
          <Form.Control
            id="nickname-input"
            autoFocus
            placeholder="my nickname is ..."
            onChange={e => {
              e.preventDefault();
              setNickname(e.target.value);
            }}
            value={nickname}
          />
          {warned && (
            <Form.Text className="text-muted">
              nickname is required to join the room
            </Form.Text>
          )}
        </Col>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default NicknameForm;
