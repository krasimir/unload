import React, { useState } from 'react';
import riew from 'riew/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import FileText from './icons/FileText.jsx';
import ClockIcon from './icons/Clock.jsx';
import Clock from './Clock.jsx';
import Trash from './icons/Trash.jsx';
import todosMode, { MODE_CLOCK, MODE_NODES } from './controller/todosMode';
import { THEME_DARK, THEME_LIGHT } from '../state';
import todosTheme from './controller/todosTheme';
import manageTodos, { getNewTodo } from './controller/todos';
import Todo from './Todo.jsx';
import Plus from './icons/Plus.jsx';
import Sun from './icons/Sun.jsx';
import Moon from './icons/Moon.jsx';

function Todos({ mode, changeMode, todos, toggle, update, reorder, del, add, clearCompleted, theme, changeTheme }) {
  const [ newTodoUI, isNewTodoUIVisible ] = useState(false);
  const completed = todos.filter(({ done }) => done).length;

  const moveTodo = (result) => {
    if (!result.destination) {
      return;
    }
    reorder(
      result.source.index,
      result.destination.index
    );
  };

  const todosList =
    <DragDropContext onDragEnd={ moveTodo }>
      <Droppable droppableId="droppable">
        {
          (provided) => (
            <ul ref={ provided.innerRef } { ...provided.droppableProps }>
              {
                todos
                  .sort((a, b) => a.order - b.order)
                  .map((todo, index) =>
                  (
                    <Draggable key={ todo.id } draggableId={ todo.id } index={ index }>
                      {(provided) => (
                        <div
                          className='mb03'
                          ref={ provided.innerRef }
                          { ...provided.draggableProps }
                          { ...provided.dragHandleProps }>
                            <Todo
                              key={ todo.id }
                              todo={ todo }
                              update={ update }
                              del={ del }
                              toggle={ toggle }/>
                        </div>
                      )}
                    </Draggable>
                  )
                )
              }
              { provided.placeholder }
            </ul>
          )
        }
      </Droppable>
    </DragDropContext>;

  return (
    <div className='todos'>
      <nav className='tac'>
        <a className={ mode === MODE_NODES ? 'selected' : '' } onClick={ () => changeMode(MODE_NODES) }>
          <FileText />
        </a>
        <a className={ mode === MODE_CLOCK ? 'selected' : '' } onClick={ () => changeMode(MODE_CLOCK) }>
          <ClockIcon />
        </a>
        <a onClick={ () => changeTheme(theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT) }>
          { theme === THEME_LIGHT ? <Moon /> : <Sun /> }
        </a>
      </nav>
      <div className={ mode === MODE_CLOCK ? 'vac' : '' }>
        {
          mode === MODE_CLOCK ?
            <Clock /> :
            <React.Fragment>
              { newTodoUI ?
                  <ul className='mb03'>
                    <Todo
                      defaultEditMode
                      todo={ getNewTodo() }
                      onClose={ (todo) => {
                        isNewTodoUIVisible(false);
                        add(todo);
                       } }/>
                  </ul> :
                  <div className='tac mb1'>
                    <a className='todo-action' onClick={ () => isNewTodoUIVisible(true) }><Plus /></a>
                  </div> }
              { todos.length > 0 && todosList }
              <footer className='tac'>
                <span style={ { padding: '0 8px' } }>{ completed }/{ todos.length }</span>
                { completed > 0 &&
                  <React.Fragment>
                    <span> &#183; </span>
                    <a className='todo-action' onClick={ clearCompleted }>
                      <Trash size={ 12 }/> Clear completed
                    </a>
                  </React.Fragment>
                }
              </footer>
            </React.Fragment>
        }
      </div>
    </div>
  );
}
Todos.defaultProps = {
  todos: []
};

export default riew(Todos, todosMode, manageTodos, todosTheme);
