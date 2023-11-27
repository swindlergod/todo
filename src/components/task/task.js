/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import './task.css'

export default class Task extends Component {
  constructor() {
    super()
    this.state = {
      edit: false,
      value: '',
      seconds: 0,
      minutes: 0,
      started: false,
    }

    this.startTimer = () => {
      if (this.state.seconds + this.state.minutes !== '00') {
        this.timerID = setInterval(() => this.timerFunction(), 1000)
        this.setState(() => ({
          started: true,
        }))
      }
    }

    this.stopTimer = () => {
      clearInterval(this.timerID)
      this.setState(() => ({
        started: false,
      }))
    }
  }

  componentDidMount() {
    this.setState({
      minutes: this.props.minutes,
      seconds: this.props.seconds,
    })
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  timerFunction() {
    let stop = this.state.minutes + this.state.seconds
    stop -= 1
    if (stop === 0) {
      clearInterval(this.timerID)
    }

    this.setState((prevState) => ({
      minutes: prevState.seconds ? prevState.minutes : prevState.minutes - 1,
      seconds: prevState.seconds ? prevState.seconds - 1 : 59,
    }))
    return {}
  }

  render() {
    const { onDeleted, onToggleDone, todo, taskEditor } = this.props
    const { label, id, done, date } = todo
    const { edit, value, seconds, minutes, started } = this.state

    const handleClick = (e) => {
      e.stopPropagation()
      onDeleted(id)
    }

    const handleEdit = (e) => {
      e.preventDefault()
      e.stopPropagation()
      taskEditor(id, value)
      this.setState({ value: '' })
      this.setState({ edit: false })
    }

    const time = formatDistanceToNow(date, { includeSeconds: true })

    return (
      <li className={done ? 'completed' : edit ? 'editing' : null}>
        <div className="view">
          <input
            id={id}
            className="toggle"
            type="checkbox"
            checked={done}
            onChange={(event) => onToggleDone(id, event.target.checked)}
          />
          <label htmlFor={id}>
            <span className="title">{label}</span>
            <span className="description time">
              <button
                type="button"
                className="icon icon-play"
                onClick={this.startTimer}
                label="play"
                disabled={started}
              />
              <button
                type="button"
                className="icon icon-pause"
                onClick={this.stopTimer}
                label="pause"
                disabled={!started}
              />
              <span>
                {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </span>
            </span>
            <span className="description"> {time} </span>
          </label>
          <button
            type="button"
            className="icon icon-edit"
            aria-label="edit"
            onClick={() => this.setState(() => ({ edit: !edit, value: label }))}
          />
          <button type="button" className="icon icon-destroy" onClick={handleClick} aria-label="destroy" />
        </div>
        {edit && (
          <form onSubmit={handleEdit}>
            <input
              onChange={(e) => this.setState({ value: e.target.value })}
              type="text"
              className="edit"
              value={value}
            />
          </form>
        )}
      </li>
    )
  }
}

Task.defaultProps = {
  onDeleted: () => {},
  onToggleDone: () => {},
  taskEditor: () => {},
  todos: {},
}

Task.propTypes = {
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  taskEditor: PropTypes.func,
  todos: PropTypes.shape({
    label: PropTypes.string,
    id: PropTypes.number,
    done: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
  }),
}
