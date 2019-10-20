import React from 'react';

import Image from './Image.jsx';
import Todos from './Todos.jsx';

export default function App() {
  return (
    <div className='layout'>
      <Todos />
      <Image />
    </div>
  );
};
