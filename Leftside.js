import React, { useState } from "react";
import Rightside from "./Rightside";
import { v4 as uuidv4 } from "uuid";

const LeftSide = ({ setTask, setTitle, title, note }) => {
  return (
    <div>
      {note.map((n) => ( 
        <div>
          <h2>{n.title}</h2>
          <p>{n.task.substring(0, 20)}</p>
        </div>
      ))}
    </div>
  );
};
export default LeftSide;
