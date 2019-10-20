import React, { useRef, useEffect } from 'react';
import riew from 'riew/react';

import manageTodo from './effects/todo';

function Todo({ todo, toggle, update, editMode, toggleEditMode }) {
  const field = useRef(null);

  useEffect(() => {
    if (editMode) {
      field.current.focus();
      field.current.setSelectionRange(field.current.value.length, field.current.value.length);
    }
  }, [ editMode ]);

  function onFieldChange(e) {
    if (e.keyCode === 27) {
      toggleEditMode();
    } else {
      update({ ...todo, text: e.target.value });
    }
  }

  return (
    <li className={ `todo ${ todo.done ? 'done' : '' } ${ editMode ? 'editing' : '' }` }>
      <div className='content'>
        <a className='todo-action' onClick={ () => toggle(todo) }>{ todo.done ? '✔' : '☐' }</a>
        {
          editMode ?
            <div className='text'>
              <textarea defaultValue={ todo.text } onKeyUp={ onFieldChange } ref={ field }/>
            </div> :
            <div className='text'>
              { todo.text }
            </div>
        }
        { editMode ?
          <a className='todo-action' onClick={ toggleEditMode }>✕</a> :
          <a className='todo-action edit' onClick={ toggleEditMode }>···</a>
        }
      </div>
    </li>
  );
}

export default riew(Todo, manageTodo);
