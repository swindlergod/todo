import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import './task.css'

export default function Task({ onDeleted, onToggleDone, todo, taskEditor, startTimer, pauseTimer, seconds, minutes }) {
  const [edit, setEdit] = useState(false)
  const [value, setValue] = useState('')

  const handleClick = (e) => {
    e.stopPropagation()
    onDeleted(todo.id)
  }

  const handleEdit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    taskEditor(todo.id, value)
    setValue('')
    setEdit(false)
  }

  const time = formatDistanceToNow(todo.date, { includeSeconds: true })

  return (
    <li className={todo.done ? 'completed' : edit ? 'editing' : null}>
      <div className="view">
        <input
          id={todo.id}
          className="toggle"
          type="checkbox"
          checked={todo.done}
          onChange={(event) => onToggleDone(todo.id, event.target.checked)}
        />
        <label htmlFor={todo.id}>
          <span className="title">{todo.label}</span>
          <span className="description time">
            <button
              type="button"
              className="icon icon-play"
              onClick={startTimer}
              label="play"
              disabled={todo.started}
            />
            <button
              type="button"
              className="icon icon-pause"
              onClick={pauseTimer}
              label="pause"
              disabled={!todo.started}
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
          onClick={() => {
            setValue(todo.label)
            setEdit(!edit)
          }}
        />
        <button type="button" className="icon icon-destroy" onClick={handleClick} aria-label="destroy" />
      </div>
      {edit && (
        <form onSubmit={handleEdit}>
          <input onChange={(e) => setValue(e.target.value)} type="text" className="edit" value={value} />
        </form>
      )}
    </li>
  )
  // render() {
  //   const { onDeleted, onToggleDone, todo, taskEditor, startTimer, pauseTimer, seconds, minutes, started } = this.props
  //   const { label, id, done, date } = todo
  //   const { edit, value } = this.state

  //   const handleClick = (e) => {
  //     e.stopPropagation()
  //     onDeleted(id)
  //   }

  //   const handleEdit = (e) => {
  //     e.preventDefault()
  //     e.stopPropagation()
  //     taskEditor(id, value)
  //     this.setState({ value: '' })
  //     this.setState({ edit: false })
  //   }

  //   const time = formatDistanceToNow(date, { includeSeconds: true })

  //   return (
  //     <li className={done ? 'completed' : edit ? 'editing' : null}>
  //       <div className="view">
  //         <input
  //           id={id}
  //           className="toggle"
  //           type="checkbox"
  //           checked={done}
  //           onChange={(event) => onToggleDone(id, event.target.checked)}
  //         />
  //         <label htmlFor={id}>
  //           <span className="title">{label}</span>
  //           <span className="description time">
  //             <button type="button" className="icon icon-play" onClick={startTimer} label="play" disabled={started} />
  //             <button
  //               type="button"
  //               className="icon icon-pause"
  //               onClick={pauseTimer}
  //               label="pause"
  //               disabled={!started}
  //             />
  //             <span>
  //               {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
  //             </span>
  //           </span>
  //           <span className="description"> {time} </span>
  //         </label>
  //         <button
  //           type="button"
  //           className="icon icon-edit"
  //           aria-label="edit"
  //           onClick={() => this.setState(() => ({ edit: !edit, value: label }))}
  //         />
  //         <button type="button" className="icon icon-destroy" onClick={handleClick} aria-label="destroy" />
  //       </div>
  //       {edit && (
  //         <form onSubmit={handleEdit}>
  //           <input
  //             onChange={(e) => this.setState({ value: e.target.value })}
  //             type="text"
  //             className="edit"
  //             value={value}
  //           />
  //         </form>
  //       )}
  //     </li>
  //   )
  // }
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
