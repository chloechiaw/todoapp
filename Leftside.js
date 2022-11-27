import React, { useState } from "react";
import Rightside from "./Rightside";
import { v4 as uuidv4 } from "uuid";

const LeftSide = ({ notes }) => {
  return (
    <div className="left">
      {notes.map((n) => (
        <div key={n.id}>
          <h2>{n.title}</h2>
          <p>{n.task.substring(0, 20)}</p>
        </div>
      ))}
    </div>
  );
};
export default LeftSide;

const Leftside = ({ notes }) => {
  useEffect(() => {
    return (
      <div className="left">
        {notes.map((n) => (
          <div key={n.id}>
            <h2>{n.title}</h2>
            <p>{n.task.substring(0, 20)}</p>
          </div>
        ))}
      </div>
    );
  }, []);
};
