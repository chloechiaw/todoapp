import React, { useState, useEffect } from "react";
import Leftside from "./Leftside";
import "./App.css";

const Rightside = () => {
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const note = { title, task };
    console.log(note);
    fetch(" http://localhost:3001/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="Outline">
        <input
          type="text"
          placeholder="Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <br></br>
        <br></br>
        <input
          type="date"
          id="start"
          name="trip-start"
          value="mm-dd-yy"
          min="2022-11-19"
          max="2030-11-16"
        ></input>
        <br></br>
        <br></br>
        <textarea
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
