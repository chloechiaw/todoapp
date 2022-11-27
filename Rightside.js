import React, { useState, useEffect } from "react";
import Leftside from "./Leftside";
import "./App.css";
// import { IconButton } from "@chakra-ui/react";
// import { AddIcon } from "@chakra-ui/icons";

const Rightside = ({ updateNotes }) => {
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [date, setDate] = useState(["yyyy-mm-dd"]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const note = { title, task, date };
    console.log(note);
    const response = await fetch("http://localhost:3001/notes", {
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
    <div className="right">
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
          className="datefont"
          type="date"
          id="start"
          name="trip-start"
          value={date}
          min="2022-11-19"
          max="2030-11-16"
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
  );
};

export default Rightside;

