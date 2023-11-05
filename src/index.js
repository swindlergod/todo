import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';

import NewTaskForm from './components/new-task-form';
import TaskList from './components/task-list';
import Footer from './components/footer';

class App extends Component{
  
  maxId = 100;
  
  state = {
    todoData: [
      this.createTodoItem ('drink coffee'),
      this.createTodoItem ('cs2'),
      this.createTodoItem ('react app')
    ]
  };

  createTodoItem (label) {
    return {
      label,
      done: false,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {
    this.setState(( { todoData } ) => {

      const idx = todoData.findIndex((el) => el.id === id);
      
      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray
      }
    });
  };

  addItem = (text) => {
    const newItem = {
      label: text,
      id: this.maxId++
    };

    this.setState(({ todoData }) => {
      
      const newArr = [
        ...todoData,
        newItem
      ];

      return {
        todoData: newArr
      }
    });
  };

    onToggleDone = (id) => {
      this.setState(( {todoData} ) => {

        const idx = todoData.findIndex((el) => el.id === id);
        const oldItem = todoData[idx];
        const newItem = {...oldItem, done: !oldItem.done};

        const newArray = [
          ...todoData.slice(0, idx),
          newItem,
          ...todoData.slice(idx + 1)
        ];

        return {
          todoData: newArray
        }
      })
    }

  render() {
    return (
      <div>
      <NewTaskForm
      onItemAdded = {this.addItem} />
      <TaskList 
      todos={ this.state.todoData }
      onDeleted={ this.deleteItem }
      onToggleDone={ this.onToggleDone }/>
      <Footer 
      todos={ this.state.todoData }/>
      </div>
    );
  }
}

const container = document.querySelector('.todoapp');
const root = createRoot(container);
root.render(<App />);