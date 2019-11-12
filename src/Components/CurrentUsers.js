import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";

const CurrentUsers = props => {
  return (
    <ListGroup>
      {props.currentUsers.map((user, index) => {
        return (
          <ListGroup.Item className="border-0" key={index}>
            <div id={index}>{user}</div>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default CurrentUsers;
