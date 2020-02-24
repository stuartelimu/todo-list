import React from "react";
import ReactDOM from "react-dom"; 
import TodoList from "./TodoLIst";

const destination = document.querySelector("#root");

ReactDOM.render(
  <TodoList />,
  destination
)