import React from "react";
import TaskFilter from "../task-filter";



const Footer = ( {todos} ) => {

    const doneCount = todos.filter((el) => el.done).length;
    const todoCount = todos.length - doneCount;
    return (
    <footer className="footer">
          <span className="todo-count">{ todoCount } items left</span>
          <TaskFilter />
          <button className="clear-completed">Clear completed</button>
        </footer>
    );
};

export default Footer;