import React from 'react';
import riew from 'riew/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import FileText from './icons/FileText.jsx';
import ClockIcon from './icons/Clock.jsx';
import Clock from './Clock.jsx';
import todosMode, { MODE_CLOCK, MODE_NODES } from './effects/todosMode';
import manageTodos from './effects/todos';
import Todo from './Todo.jsx';

function Todos({ mode, changeMode, todos, toggle, update, reorder, del }) {
  const moveTodo = (result) => {
    if (!result.destination) {
      return;
    }
    reorder(
      result.source.index,
      result.destination.index
    );
  };

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
      {
        mode === MODE_CLOCK ?
          <Clock /> :
          <DragDropContext onDragEnd={ moveTodo }>
            <Droppable droppableId="droppable">
              {
                (provided) => (
                  <ul
                    ref={ provided.innerRef }
                    { ...provided.droppableProps }>
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
      }
    </div>
  );
}

export default riew(Todos, todosMode, manageTodos);
