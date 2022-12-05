import React, { useState, useEffect } from "react";
import moment from "moment";
import App from "./App";
import "./App.css";
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

  const handleCheckboxChange = ({ id, notes, setNotes }) => {
    const newNotes = [...notes];
    newNotes[id].isCompleted = !newNotes[id].isCompleted;
    setNotes(newNotes);
  };

  return (
    <div className="w-screen h-screen grid grid-rows-2 text-1xl md:grid-cols-2">
      <div className="w-full h-full md:h-screen">
        <form onSubmit={handleSubmit}>
          <input
            className="ml-3 border-1.5 outline outline-slate-300 rounded-sm drop-shadow-lg"
            type="text"
            placeholder="Task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <br></br>
          <br></br>
          <input
            className=" ml-3 border-1.5 outline outline-slate-300 rounded-sm drop-shadow-lg"
            id="dateid"
            type="date"
            name="trip-start"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          ></input>
          <br></br>
          <br></br>
          <textarea
            className="ml-3 mb-2 border-1.5 outline outline-slate-300 rounded-sm drop-shadow-lg"
            placeholder="Write..."
            rows="20"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          ></textarea>
          <br></br>
          <button
            className="text-white	whitespace-normal	w-20 ml-3 bg-green-100 border border-green-200 hover:bg-green-700 rounded-md drop-shadow-lg"
            onClick={handleSubmit}
          >
            Add
          </button>
        </form>
      </div>
      <div>
        {notes.map((n) => (
          <div>
            <li key={n.id}>
              <h2>{n.title}</h2>
              <p>{n.task.substring(0, 20)}</p>
            </li>
            <input
              type="checkbox"
              checked={n.isCompleted}
              onChange={() => handleCheckboxChange(id)}
              style={n.isCompleted ? "checked" : null}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rightside;
