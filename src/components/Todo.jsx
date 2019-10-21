import React, { useRef, useEffect, useState } from 'react';
import riew from 'riew/react';

import Trash from './icons/Trash.jsx';
import Square from './icons/Square.jsx';
import SquareCheck from './icons/SquareCheck.jsx';
import Edit from './icons/Edit.jsx';

function Todo({ todo, toggle, update, defaultEditMode, del, onClose }) {
  const field = useRef(null);
  const [ editMode, toggleEditMode ] = useState(defaultEditMode);
  const isItANewTodo = !update && !del;

  useEffect(() => {
    if (editMode) {
      field.current.focus();
      field.current.setSelectionRange(field.current.value.length, field.current.value.length);
    }
  }, [ editMode ]);

  function onFieldChange(e) {
    const newTodo = { ...todo, text: e.target.value };

    if (e.keyCode === 27) {
      toggleEditMode();
      onClose(newTodo);
    } else if (update) {
      update(newTodo);
    }
  }

  function deleteTodo(todo) {
    if (confirm('Are you sure?')) {
      del(todo);
    }
  }

  return (
    <li className={ `todo ${ todo.done ? 'done' : '' } ${ editMode ? 'editing' : '' }` }>
      <div className='content' style={ isItANewTodo ? { display: 'block' } : {} }>
        <div style={ { marginTop: '6px' } }>
          {
            editMode ?
            <div>
              { update && <a className='todo-action' onClick={ () => toggle(todo) }>
                { todo.done ? <SquareCheck size={ 16 }/> : <Square size={ 16 }/> }
              </a> }
              { del && <a className='todo-action' onClick={ () => deleteTodo(todo) }>
                <Trash size={ 16 }/>
              </a> }
            </div> :
            <a className='todo-action' onClick={ () => toggle(todo) }>
              { todo.done ? <SquareCheck size={ 16 }/> : <Square size={ 16 }/> }
            </a>
          }
        </div>
        {
          editMode ?
            <div className='text'>
              <textarea defaultValue={ todo.text } onKeyUp={ onFieldChange } ref={ field }/>
            </div> :
            <div className='text'>
              { todo.text }
            </div>
        }
        <div className='vac'>
          { editMode ?
            null :
            <a className='todo-action edit' onClick={ toggleEditMode }><Edit size={ 16 }/></a>
          }
        </div>
      </div>
    </li>
  );
}

Todo.defaultProps = {
  onClose: () => {}
};

export default riew(Todo);
