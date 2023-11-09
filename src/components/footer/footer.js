import React from 'react'
import PropTypes from 'prop-types'

import TaskFilter from '../task-filter'
import './footer.css'

function Footer({ filterChanger, tasksCleaner, todos, filter }) {
  return (
    <footer className="footer">
      <span className="todo-count">{todos} items left</span>
      <TaskFilter filter={filter} filterChanger={filterChanger} />
      <button type="button" className="clear-completed" onClick={tasksCleaner}>
        Clear completed{' '}
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  filterChanger: () => {},
  tasksCleaner: () => {},
  todos: {},
  filter: 'allTasks',
}

Footer.propTypes = {
  filterChanger: PropTypes.func,
  tasksCleaner: PropTypes.func,
  todos: PropTypes.number,
  filter: PropTypes.string,
}

export default Footer
