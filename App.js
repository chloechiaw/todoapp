import React, { useState, useEffect } from "react";
import moment from "moment";
import Leftside from "./Leftside";
import Search from "./Search";
import Rightside from "./Rightside";
import { v4 as uuidv4 } from "uuid";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import axios from "axios";
import { IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const App = () => {
  const toggleOptions = [
    {
      label: "Today",
      value: "Today",
    },
    {
      label: "Next 7 Days",
      value: "Next 7 Days",
    },
    {
      label: "All Tasks",
      value: "All Tasks",
    },
  ];

  const [notes, setNotes] = useState({
    id: "",
    title: "",
    task: "",
    completed: false 
  });
  
  const [selectedTag, setSelectedTag] = useState("");
  const [dailyDate, setDailyDate] = useState("yyyy-mm-dd");
  const getNotes = async () => {
    const response = await fetch(" http://localhost:3001/note", {
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

  const Date = () => {
    return (
      <div className="daily">
        <p>What date it is today?</p>
        <input
          type="date"
          id="start"
          name="trip-start"
          value={dailyDate}
          min="2000-11-16"
          max="2030-11-16"
          onChange={(e) => setDailyDate(e.target.value)}
        ></input>
      </div>
    );
  };
  const updateNotes = (newNote) => {
    setNotes([...notes, newNote]);
  };

  const Toggle = () => {
    return (
      <div>
        <select onClick={(e) => setSelectedTag(e.target.value)}>
          console.log(selectedTag)
          <option value="today">Today</option>
          <option value="next 7 days">Next 7 Days</option>
          <option value="all tasks">All Tasks</option>
        </select>
      </div>
    );
  };

  const useFilterTodos = (note, selectedTag) => {
    const [filteredTodos, setFilteredTodos] = useState([]);

    useEffect(() => {
      console.log(selectedTag);
      let data;
      const todayDateFormated = moment().format("MM/DD/YYYY");

      if (selectedTag === "today") {
        data = note.filter((not) => not.date === todayDateFormated);
      } else if (selectedTag === "next 7 days") {
        data = note.filter((not) => {
          const todoDate = moment(note.date, "MM/DD/YYYY");
          const todayDate = moment(todayDateFormated, "MM/DD/YYYY");

          const diffDays = todoDate.diff(todayDate, "days");

          return diffDays >= 0 && diffDays < 7;
        });
      } else if (selectedTag === "all days") {
        data = note;
      }
    }, [selectedTag]);
  };

  return (
    // <ChakraProvider>
    <div>
      <h2> Good morning, Chloe ☀️</h2>
      <p> Here's the plan for today</p>
      <Toggle
        toggleOptions={toggleOptions}
        selectedTag={selectedTag}
        onSelectedTag={setSelectedTag}
      />
      <Rightside updateNotes={updateNotes} />
      <IconButton
        className="add"
        aria-label="Search database"
        icon={<AddIcon />}
        size="xs"
      />
      <Leftside notes={notes} />
      <Search />
      <Toggle />
      <Date />
    </div>
    // </ChakraProvider>
  );
};

export default App;
