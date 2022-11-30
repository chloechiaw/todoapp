// this is the right todo app
import React, { useState, useEffect } from "react";
import moment from "moment";
// import { IconButton } from "@chakra-ui/react";
import Leftside from "./Leftside";
import Rightside from "./Rightside";
import { v4 as uuidv4 } from "uuid";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import axios from "axios";
import { IconButton } from "@chakra-ui/react";
// import { AddIcon } from "@chakra-ui/icons";

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: "",
      title: "",
      task: "",
      date: "",
      completed: false,
    },
  ]);

  const [selectedTag, setSelectedTag] = useState("");
  const getNotes = async () => {
    const response = await fetch(" http://localhost:3003/notes", {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    setNotes(data);
  };

  useEffect(() => {
    getNotes();
  }, []);

  // // // when data arrives from the server, the data gets stored into the state using the function setTitle

  const updateNotes = (newNote) => {
    setNotes([...notes, newNote]);
  };

  const onChangeToggle = async (tag) => {
    const response = await fetch("http://localhost:3003/notes", {
      method: "GET",
    });
    let data = await response.json();
    console.log(data);
    const todayDateFormated = moment().format("YYYY/MM/DD");

    if (tag === "today") {
      data = data.filter((note) => {
        return moment(note.date, "YYYY/MM/DD").diff(todayDateFormated) == 0;
      });
    } else if (tag === "next 7 days") {
      data = data.filter((note) => {
        const todoDate = moment(note.date, "YYYY/MM/DD");
        const diffDays = todoDate.diff(todayDateFormated, "days");

        return diffDays >= 0 && diffDays <= 7;
      });
    }
    console.log(data);
    setNotes(data);
  };

  return (
    <div>
      <select onChange={(e) => onChangeToggle(e.target.value)}>
        <option value="today">Today</option>
        <option value="next 7 days">Next 7 Days</option>
        <option value="all tasks">All Tasks</option>
      </select>
      <h2> Good morning, Chloe ☀️</h2>
      <p> Here's the plan for today</p>
      <Rightside updateNotes={updateNotes} notes={notes} />
      <IconButton />
      {/* <Leftside notes={notes} /> */}
    </div>
  );
};

export default App;

