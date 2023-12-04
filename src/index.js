import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'

import NewTaskForm from './components/new-task-form'
import TaskList from './components/task-list'
import Footer from './components/footer'

import './index.css'

export default function App() {
  const [todoData, setTodoData] = useState([])
  const [filter, setFilter] = useState('allTasks')

  const addItem = (text, min, sec) => {
    const data = {
      id: Math.ceil(Math.random() * 100000),
      label: text,
      done: false,
      date: new Date(),
      minutes: min,
      seconds: sec,
      started: false,
      timerID: null,
    }
    const newArray = [...todoData, data]
    setTodoData(newArray)
  }

  const deleteItem = (id) => {
    const newArray = todoData.filter((el) => el.id !== id)
    setTodoData(newArray)
  }

  const editItem = (id, label) => {
    const editedTodo = todoData.map((todo) => {
      if (todo.id === id) {
        todo.label = label
      }
      return todo
    })
    setTodoData(editedTodo)
  }

  const onToggleDone = (id, data) => {
    const doneItem = todoData.map((element) => {
      if (id === element.id) element.done = data
      return element
    })
    setTodoData(doneItem)
  }

  const tasksCleaner = () => {
    const cleanedItems = todoData.filter((element) => !element.done)
    setTodoData(cleanedItems)
  }

  const filterChanger = (newFilter) => {
    setFilter(newFilter)
  }

  const tasksFilter = (todos, filt) => {
    switch (filt) {
      case 'completedTasks':
        return todos.filter((element) => element.done === true)
      case 'Active':
        return todos.filter((element) => element.done === false)
      default:
        return todos
    }
  }

  const startTimer = (id) => {
    const { started, seconds, minutes } = todoData.find((el) => el.id === id)
    if (Number(seconds) + Number(minutes)) {
      if (!started) {
        const timerID = setInterval(
          () =>
            setTodoData((prevState) => {
              const newTodo = prevState.map((todoItem) => {
                if (todoItem.id === id) {
                  let stop = todoItem.minutes + todoItem.seconds
                  stop -= 1
                  if (stop === 0) {
                    clearInterval(timerID)
                  }
                  let sec = todoItem.seconds - 1
                  let min = todoItem.minutes
                  if (min > 0 && sec < 0) {
                    min -= 1
                    sec = 59
                  }

                  return {
                    ...todoItem,
                    seconds: sec,
                    minutes: min,
                  }
                }

                return todoItem
              })

              return newTodo
            }),
          1000
        )
        setTodoData(() => {
          const idx = todoData.findIndex((el) => el.id === id)
          const data = [...todoData]
          data[idx].timerID = timerID
          data[idx].started = true

          return data
        })
      }
    }
  }

  const pauseTimer = (id) => {
    const { started } = todoData.find((el) => el.id === id)
    if (started) {
      const { timerID } = todoData.find((el) => el.id === id)
      setTodoData(() => {
        const idx = todoData.findIndex((el) => el.id === id)
        const data = [...todoData]
        data[idx].started = false
        return data
      })
      clearInterval(timerID)
    }
  }

  const filteredTodos = tasksFilter(todoData, filter)
  const leftTodos = todoData.filter((todo) => todo.done === false).length

  return (
    <div>
      <NewTaskForm onItemAdded={addItem} />
      <TaskList
        todos={filteredTodos}
        onDeleted={deleteItem}
        onToggleDone={onToggleDone}
        taskEditor={editItem}
        startTimer={startTimer}
        pauseTimer={pauseTimer}
      />
      <Footer filterChanger={filterChanger} tasksCleaner={tasksCleaner} todos={leftTodos} filter={filter} />
    </div>
  )
}

const container = document.querySelector('.todoapp')
const root = createRoot(container)
root.render(<App />)
