import React, { useState, useEffect } from "react";
import moment from "moment";
import Leftside from "./Leftside";
import Rightside from "./Rightside";
import { v4 as uuidv4 } from "uuid";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import axios from "axios";
// import { IconButton } from "@chakra-ui/react";
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
    const response = await fetch(" http://localhost:3001/notes", {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    setNotes(data);
  };
  useEffect(() => {
    getNotes();
  }, []);

  // when data arrives from the server, the data gets stored into the state using the function setTitle

  const updateNotes = (newNote) => {
    setNotes([...notes, newNote]);
  };

  const onChangeToggle = async (tag) => {
    setSelectedTag(tag);

    const response = await fetch("http://localhost:3001/notes", {
      method: "GET",
    });
    var data = await response.json();
    const todayDateFormated = moment().format("MM/DD/YYYY");

    if (selectedTag === "today") {
      data = data.filter((note) => note.date === todayDateFormated);
    } else if (selectedTag === "next 7 days") {
      data = data.filter((note) => {
        const todoDate = moment(note.date, "MM/DD/YYYY");
        const diffDays = todoDate.diff(todayDateFormated, "days");
        console.log(diffDays);
        return diffDays >= 0 && diffDays < 7;
      });
    } else if (selectedTag === "all tasks") {
      setNotes(data);
    }
  };

  const Toggle = () => {
    return (
      <div>
        <select onChange={(e) => onChangeToggle(e.target.value)}>
          <option value="today">Today</option>
          <option value="next 7 days">Next 7 Days</option>
          <option value="all tasks">All Tasks</option>
        </select>
      </div>
    );
  };

  return (
    <ChakraProvider>
      <div>
        <h2> Good morning, Chloe ☀️</h2>
        <p> Here's the plan for today</p>
        <Rightside updateNotes={updateNotes} />
        {/* <IconButton
          className="add"
          aria-label="Search database"
          icon={<AddIcon />}
          size="xs"
        /> */}
        <Leftside notes={notes} />
        <Toggle />
      </div>
    </ChakraProvider>
  );
};
export default App;

