import React, { useRef, useEffect, useState } from 'react';
import riew from 'riew/react';

import Trash from './icons/Trash.jsx';
import Square from './icons/Square.jsx';
import SquareCheck from './icons/SquareCheck.jsx';
import Edit from './icons/Edit.jsx';

function formatText(text) {
  text = text.replace(/\n/gi, '<br />');
  text = linkify(text);

  return text;
}

function linkify(inputText) {
  var replacedText, replacePattern1, replacePattern2, replacePattern3;

  replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
  replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

  replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
  replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

  replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
  replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

  return replacedText;
}

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

    if (e.keyCode === 27 || (e.keyCode === 13 && e.ctrlKey)) {
      toggleEditMode();
      onClose(newTodo);
    } else if (update) {
      update(newTodo);
    }
  }
  function onBlur() {
    const newTodo = { ...todo, text: field.current.value };

    toggleEditMode();
    onClose(newTodo);
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
            null :
            <a className='todo-action' onClick={ () => toggle(todo) }>
              { todo.done ? <SquareCheck size={ 16 }/> : <Square size={ 16 }/> }
            </a>
          }
        </div>
        {
          editMode ?
            <div className='text'>
              <textarea defaultValue={ todo.text } onKeyUp={ onFieldChange } ref={ field } onBlur={ onBlur } />
            </div> :
            <div className='text' dangerouslySetInnerHTML={ { __html: formatText(todo.text) } } />
        }
        <div className='vac'>
          { editMode ?
            null :
            <div className='cf options'>
              { del && <a className='todo-action right' onClick={ () => deleteTodo(todo) }>
                <Trash size={ 16 }/>
              </a> }
              <a className='todo-action edit right' onClick={ toggleEditMode }><Edit size={ 16 }/></a>
            </div>
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
