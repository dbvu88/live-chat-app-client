import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";

const Conversation = props => {
  return (
    <ListGroup>
      {props.conversation.map((message, index) => {
        return (
          <ListGroup.Item className="border-0" key={index}>
            <div id={index}>{message}</div>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default Conversation;
