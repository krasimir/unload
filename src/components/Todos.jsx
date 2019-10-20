import React from 'react';
import riew from 'riew/react';

import FileText from './icons/FileText.jsx';
import ClockIcon from './icons/Clock.jsx';
import Clock from './Clock.jsx';
import todosMode, { MODE_CLOCK, MODE_NODES } from './effects/todosMode';
import manageTodos from './effects/todos';
import Todo from './Todo.jsx';

function Todos({ mode, changeMode, todos, toggle, update }) {
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
          (
            <ul>
              {
                todos.map(todo => <Todo key={ todo.id } todo={ todo } toggle={ toggle } update={ update }/>)
              }
            </ul>
          )
      }
    </div>
  );
}

export default riew(Todos, todosMode, manageTodos);
