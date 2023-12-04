import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

export default function NewTaskForm({ onItemAdded }) {
  const [label, setLabel] = useState('')
  const [seconds, setSeconds] = useState('')
  const [minutes, setMinutes] = useState('')

  const onLabelChange = (e) => {
    const newLabel = e.target.value
    setLabel(newLabel)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    onItemAdded(label, minutes, seconds)
    setLabel('')
    setSeconds('')
    setMinutes('')
  }

  const onEditMinute = (event) => {
    const newMinutes = event.target.value
    setMinutes(newMinutes)
  }

  const onEditSecond = (event) => {
    const newSeconds = event.target.value
    setSeconds(newSeconds)
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input className="new-todo" placeholder="What needs to be done?" onChange={onLabelChange} value={label} />
        <input className="new-todo-form__timer" placeholder="Min" min={0} onChange={onEditMinute} value={minutes} />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={onEditSecond}
          value={seconds}
          min={1}
          max={59}
        />
        <button type="submit" aria-label="123" />
      </form>
    </header>
  )
}

NewTaskForm.defaultProps = {
  onItemAdded: () => {},
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func,
}
