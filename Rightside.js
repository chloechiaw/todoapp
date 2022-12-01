import React, { useState, useEffect } from "react";
import moment from "moment";
import App from "./App";

import Leftside from "./Leftside";
import "./App.css";
// import { IconButton } from "@chakra-ui/react";
// import { AddIcon } from "@chakra-ui/icons";

const Rightside = ({ updateNotes, notes }) => {
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const note = { title, task, date };
    console.log(note);
    const response = await fetch("http://localhost:3003/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });
    console.log(response);
    const data = await response.json();
    updateNotes(data);
    console.log(data);
  };

  return (
    <div className="w-screen h-screen grid grid-rows-2 text-1xl md:grid-cols-2">
      <div className="w-full h-full md:h-screen">
        <form onSubmit={handleSubmit} className="Outline">
          <input
            className="taskfont textareawidth "
            type="text"
            placeholder="Task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <br></br>
          <br></br>
          <input
            id="dateid"
            className="datefont"
            type="date"
            id="start"
            name="trip-start"
            value={{ date }}
            onChange={(e) => setDate(e.target.value)}
          ></input>
          <br></br>
          <br></br>
          <textarea
            className="textareawidth"
            placeholder="Write..."
            rows="20"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          ></textarea>
          <br></br>
          <button onClick={handleSubmit}>Add</button>
        </form>
      </div>
      <div>
        {notes.map((n) => (
          <div key={n.id}>
            <h2>{n.title}</h2>
            <p>{n.task.substring(0, 20)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rightside;
