import React, { useState } from "react";
import Rightside from "./Rightside";
import { v4 as uuidv4 } from "uuid";
import { toVarDefinition } from "@chakra-ui/react";

const LeftSide = ({ notes }) => {
  console.log(notes);
  return (
    <div className="left">
      {notes.map((n) => (
        <div key={n.id} style={{display: "flex"}}>
          <input type="checkbox" />
          <h2
          style={{
              color: "white",
              textDecoration:toVarDefinition.comple
          }}>{n.title}</h2>
          <p>{n.task.substring(0, 20)}</p>
        </div>
      ))}
    </div>
  );
};
export default LeftSide;
