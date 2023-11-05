import React from 'react';
import Task from '../task';

const TaskList = ( { todos, onDeleted, onToggleDone } ) => {

    const elements = todos.map((item) => {
        const { id, ...itemProps } = item;
        return (
            <div key={ id }> 
            <Task 
            { ...itemProps }
            onDeleted={ () => onDeleted(id) }
            onToggleDone={ () => onToggleDone(id) }
            /> 
            </div>
        )
      });

return (
    <section className="main">
        <ul className="todo-list">    
        { elements }
        </ul>
    </section>
      );
};

export default TaskList;