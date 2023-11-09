import React from 'react'
import PropTypes from 'prop-types'
import './task-filter.css'

function TaskFilter({ filter, filterChanger }) {
  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          onClick={() => filterChanger('allTasks')}
          className={filter === 'allTasks' ? 'selected' : null}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => filterChanger('Active')}
          className={filter === 'Active' ? 'selected' : null}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => filterChanger('completedTasks')}
          className={filter === 'completedTasks' ? 'selected' : null}
        >
          Completed
        </button>
      </li>
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
