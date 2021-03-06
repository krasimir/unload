import React from 'react';
import riew from 'riew/react';

import loadImage from './controller/loadImage';

function Image({ image, getImage, pinImage, pin }) {
  if (image) {
    return (
      <div className='wallpaper'>
        <div className='image-wrapper'>
          <div style={ { backgroundImage: `url(${ image.data })` } } className='image' />
        </div>
        <div className='image-controls'>
          <div className='pr1'>
            Author: <a href={ image.author.url } target='_blank'>{ image.author.name }</a><br />
            <small>Photo provided by <a href='https://www.pexels.com/' target='_blank'>Pexels</a></small>
          </div>
          <div className='pl1 bl1'>
            <a onClick={ pinImage }>☉ { pin ? 'unpin' : 'pin' }</a><br />
            <a onClick={ () => getImage(true) }>⟳ new</a>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className='image-loading tac'>
      <div className='lds-ring'>
        <div />
        <div />
      </div>
    </div>
  );
}

export default riew(Image, loadImage);
