import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task'
import './task-list.css'

function TaskList({ todos, onDeleted, onToggleDone, taskEditor, startTimer, pauseTimer }) {
  return (
    <section className="main">
      <ul className="todo-list">
        {todos.map((todo) => (
          <Task
            key={todo.id}
            onToggleDone={onToggleDone}
            onDeleted={onDeleted}
            todo={todo}
            taskEditor={taskEditor}
            startTimer={startTimer}
            pauseTimer={pauseTimer}
            minutes={todo.minutes}
            seconds={todo.seconds}
          />
        ))}
      </ul>
    </section>
  )
}

export default TaskList

TaskList.defaultProps = {
  onDeleted: () => {},
  onToggleDone: () => {},
  taskEditor: () => {},
  todos: {},
}

TaskList.propTypes = {
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  taskEditor: PropTypes.func,
  todos: PropTypes.instanceOf(Array),
}
