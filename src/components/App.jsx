import React from 'react';
import riew from 'riew/react';

import Image from './Image.jsx';
import Todos from './Todos.jsx';
import { THEME_LIGHT } from '../state';
import todosTheme from './controller/todosTheme';

export default riew(function App({ theme }) {
  return (
    <div className={ `layout ${ theme === THEME_LIGHT ? 'light' : 'dark' }` }>
      <Todos />
      <Image />
    </div>
  );
}, todosTheme);
