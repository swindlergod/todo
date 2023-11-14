import React, { Component } from 'react'
import { createRoot } from 'react-dom/client'

import NewTaskForm from './components/new-task-form'
import TaskList from './components/task-list'
import Footer from './components/footer'

import './index.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      todoData: [],
      filter: 'allTasks',
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((el) => el.id !== id)
      return {
        todoData: newArray,
      }
    })
  }

  onToggleDone = (id, data) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((element) => {
        if (id === element.id) element.done = data
        return element
      }),
    }))
  }

  addItem = (text) => {
    const data = {
      id: Math.ceil(Math.random() * (1000000 - 100000) - 100000),
      label: text,
      done: false,
      date: new Date(),
    }

    this.setState(({ todoData }) => {
      const newData = [...todoData, data]
      return {
        todoData: newData,
      }
    })
  }

  tasksCleaner = () => {
    this.setState(({ todoData }) => ({ todoData: todoData.filter((element) => !element.done) }))
  }

  filterChanger = (todoData) => {
    this.setState({ filter: todoData })
  }

  taskEditor = (id, label) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((todo) => {
        if (todo.id === id) {
          todo.label = label
        }
        return todo
      }),
    }))
  }

  tasksFilter = () => {
    const { todoData, filter } = this.state
    return todoData.filter(({ done }) => {
      const allTasks = filter === 'allTasks'
      const completedTasks = filter === 'completedTasks'

      return allTasks ? true : completedTasks ? done === true : done === false
    })
  }

  render() {
    const { todoData, filter } = this.state
    return (
      <div>
        <NewTaskForm onItemAdded={this.addItem} />
        <TaskList
          todos={this.tasksFilter()}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          taskEditor={this.taskEditor}
        />
        <Footer
          filterChanger={this.filterChanger}
          tasksCleaner={this.tasksCleaner}
          todos={todoData.filter(({ done }) => !done).length}
          filter={filter}
        />
      </div>
    )
  }
}

const container = document.querySelector('.todoapp')
const root = createRoot(container)
root.render(<App />)
