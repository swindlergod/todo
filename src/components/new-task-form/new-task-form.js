import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      label: '',
    }
  }

  render() {
    const { label } = this.state
    const { onItemAdded } = this.props

    const onLabelChange = (e) => {
      this.setState({
        label: e.target.value,
      })
    }

    const onSubmit = (e) => {
      e.preventDefault()
      onItemAdded(label)
      this.setState({
        label: '',
      })
    }
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={onSubmit}>
          <input className="new-todo" placeholder="What needs to be done?" onChange={onLabelChange} value={label} />
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
