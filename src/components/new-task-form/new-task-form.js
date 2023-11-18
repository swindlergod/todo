import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      label: '',
      minutes: '',
      seconds: '',
    }
  }

  render() {
    const { label, minutes, seconds } = this.state
    const { onItemAdded } = this.props

    const onLabelChange = (e) => {
      this.setState({
        label: e.target.value,
      })
    }

    const onSubmit = (e) => {
      e.preventDefault()
      onItemAdded(label, minutes, seconds)
      this.setState({
        label: '',
        minutes: '',
        seconds: '',
      })
    }

    const onEditMinute = (event) => {
      this.setState({
        minutes: Number(event.target.value),
      })
    }

    const onEditSecond = (event) => {
      this.setState({
        seconds: event.target.value,
      })
    }

    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={onSubmit}>
          <input className="new-todo" placeholder="What needs to be done?" onChange={onLabelChange} value={label} />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            type="number"
            min={0}
            onChange={onEditMinute}
            value={minutes}
          />
          <input
            className="new-todo-form__timer"
            type="number"
            placeholder="Sec"
            onChange={onEditSecond}
            value={seconds}
            min={1}
            max={59}
          />
        </form>
      </header>
    )
  }
}

NewTaskForm.defaultProps = {
  onItemAdded: () => {},
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func,
}
