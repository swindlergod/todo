import React from 'react'
import PropTypes from 'prop-types'
import './task-filter.css'

function TaskFilter({ filter, filterChanger }) {
  const buttons = [
    {
      name: 'All',
      filter: 'allTasks',
      key: 1,
    },
    {
      name: 'Active',
      filter: 'Active',
      key: 2,
    },
    {
      name: 'Completed',
      filter: 'completedTasks',
      key: 3,
    },
  ]

  return (
    <ul className="filters">
      {buttons.map((button) => (
        <li key={button.key}>
          <button
            type="button"
            onClick={() => filterChanger(button.filter)}
            className={filter === button.filter ? 'selected' : null}
            value={button.name}
          >
            {button.name}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default TaskFilter
TaskFilter.defaultProps = {
  filterChanger: () => {},
  filter: 'allTasks',
}

TaskFilter.propTypes = {
  filterChanger: PropTypes.func,
  filter: PropTypes.string,
}
