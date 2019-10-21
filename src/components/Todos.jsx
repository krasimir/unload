import React, { useState } from 'react';
import riew from 'riew/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import FileText from './icons/FileText.jsx';
import ClockIcon from './icons/Clock.jsx';
import Clock from './Clock.jsx';
import todosMode, { MODE_CLOCK, MODE_NODES } from './effects/todosMode';
import manageTodos, { getNewTodo } from './effects/todos';
import Todo from './Todo.jsx';
import Plus from './icons/Plus.jsx';

function Todos({ mode, changeMode, todos, toggle, update, reorder, del, add }) {
  const [ newTodoUI, isNewTodoUIVisible ] = useState(false);

  const moveTodo = (result) => {
    if (!result.destination) {
      return;
    }
    reorder(
      result.source.index,
      result.destination.index
    );
  };

  const todosList = () => (
    <DragDropContext onDragEnd={ moveTodo }>
      <Droppable droppableId="droppable">
        {
          (provided) => (
            <ul ref={ provided.innerRef } { ...provided.droppableProps }>
              {
                todos.map((todo, index) =>
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
    </DragDropContext>
  );

  return (
    <div className='todos'>
      <nav className='tac'>
        <a className={ mode === MODE_NODES ? 'selected' : '' } onClick={ () => changeMode(MODE_NODES) }>
          <FileText />
        </a>
        <a className={ mode === MODE_CLOCK ? 'selected' : '' } onClick={ () => changeMode(MODE_CLOCK) }>
          <ClockIcon />
        </a>
      </nav>
      <div>
        {
          mode === MODE_CLOCK ?
            <Clock /> :
            <React.Fragment>
              { todos.length > 0 && todosList() }
              { newTodoUI ?
                  <ul>
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
            </React.Fragment>
        }
      </div>
    </div>
  );
}
Todos.defaultProps = {
  todos: []
};

export default riew(Todos, todosMode, manageTodos);
