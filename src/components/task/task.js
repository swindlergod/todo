import React, { Component } from "react";

export default class Task extends Component{

render(){
  const { label, onDeleted, onToggleDone, done } = this.props;

  let classNames = "";
  if (done){
    classNames += 'completed';
  }

return (
  <li className = { classNames }
      onClick={ onToggleDone }>
  <div className="view">
    <input className="toggle" type="checkbox"></input>
    <label>
        <span className="description">
                { label }
                </span>
        <span className="created">created 5 minutes ago</span>
    </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"
                onClick={ onDeleted }></button>
    </div>
    </li>
  );
};
};