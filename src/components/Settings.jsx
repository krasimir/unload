import React, { useState } from 'react';
import riew from 'riew/react';

import settings from './controller/settings';

function Settings({ settings, changeKeywords, getImage }) {
  const [ message, setMessage ] = useState(null);

  function showMessage(str) {
    setMessage(str);
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  }
  function onKeyDown(e) {
    const value = e.currentTarget.value;
    if (e.keyCode === 13) {
      if (value === '') {
        showMessage('⚠️ Please type some keywords.');
      } else {
        changeKeywords(value);
        showMessage('✅ Saved');
      }
    }
  }
  return (
    <div className='settings'>
      <h2>Settings</h2>
      <p>Interval separated image keywords <small>(hit Enter when you are done)</small></p>
      <input type="text" defaultValue={ settings.keywords } onKeyDown={ onKeyDown }/>
      {message && <p><small>{message}</small></p>}
    </div>
  );
}

export default riew(Settings, settings);
