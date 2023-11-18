/* eslint-disable react/destructuring-assignment */
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
    this.pauseTimer(id)
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

  addItem = (text, min, sec) => {
    const data = {
      id: Math.ceil(Math.random() * (1000000 - 100000) - 100000),
      label: text,
      done: false,
      date: new Date(),
      minutes: min,
      seconds: sec,
      timerId: null,
      isTimerOn: false,
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

  startTimer = (id) => {
    const { isTimerOn } = this.state.todoData.find((el) => el.id === id)

    if (!isTimerOn) {
      const timerId = setInterval(() => {
        this.setState((prevState) => {
          const updateTodo = prevState.todoData.map((todoItem) => {
            if (todoItem.id === id) {
              if (todoItem.seconds === 0 && todoItem.minutes === 0) {
                this.pauseTimer(id)
              }
              let sec = todoItem.seconds - 1
              let min = todoItem.minutes
              if (min > 0 && sec < 0) {
                min -= 1
                sec = 59
              }

              if (min === 0 && sec < 0) {
                sec = 0
                this.pauseTimer(id)
              }

              return {
                ...todoItem,
                seconds: sec,
                minutes: min,
              }
            }

            return todoItem
          })

          return {
            tatodoData: updateTodo,
          }
        })
      }, 1000)
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id)
        const data = [...todoData]
        data[idx].timerId = timerId
        data[idx].isTimerOn = true

        return {
          todoData: data,
        }
      })
    }
  }

  pauseTimer = (id) => {
    const { isTimerOn } = this.state.todoData.find((el) => el.id === id)
    if (isTimerOn) {
      const { timerId } = this.state.todoData.find((el) => el.id === id)
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id)
        const data = [...todoData]
        data[idx].isTimerOn = false

        return {
          todoData: data,
        }
      })
      clearInterval(timerId)
    }
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
          startTimer={this.startTimer}
          pauseTimer={this.pauseTimer}
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
