import React from 'react';
import riew from 'riew/react';

import manageClock from './controller/clock';

function Clock({ date }) {
  return (
    <div className='clock'>
      <h1>{ date.time }</h1>
      <p>{ date.day }</p>
    </div>
  );
}

export default riew(Clock, manageClock);
