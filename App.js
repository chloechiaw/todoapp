import React, { useState, useEffect } from "react";
import Leftside from "./Leftside";
import Rightside from "./Rightside";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import axios from "axios";

const App = ({ note }) => {
  // when data arrives from the server, the data gets stored into the state using the function setTitle
  return (
    <div>
      <h2> Good morning, Chloe ☀️</h2>
      <p> Here's the plan for today</p>
      <Rightside />
      <Leftside note={note} />
    </div>
  );
};

export default App;
