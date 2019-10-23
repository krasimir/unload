const USE_MOCK = false;
const AK = '563492ad6f917000010000018fedee73b8fd45eeab685d32eabdaa57';
const LS_IMAGE_ITEM = 'unload_image';
const LS_DATA_ITEM = 'unload_data';

import mockedAPIResponse from '../../_mocks/curated.json';

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = [].slice.call(new Uint8Array(buffer));

  bytes.forEach((b) => binary += String.fromCharCode(b));

  return window.btoa(binary);
};

export default async function loadImage({ data, state }) {
  const pin = state(!!localStorage.getItem(LS_IMAGE_ITEM));
  const image = state(null);
  const getImage = image.mutate(() => null).mutate(async (current, shouldFetchANewOne) => {
    let data;

    if (pin()) {
      return JSON.parse(localStorage.getItem(LS_IMAGE_ITEM));
    }

    try {
      if (USE_MOCK) {
        data = mockedAPIResponse;
      } else {
        if (!localStorage.getItem(LS_DATA_ITEM) || shouldFetchANewOne) {
          data = await (await fetch(
            'https://api.pexels.com/v1/curated?per_page=30&page=1',
            { headers: { Authorization: AK } }
          )).json();
          localStorage.setItem(LS_DATA_ITEM, JSON.stringify(data));
        } else {
          data = JSON.parse(localStorage.getItem(LS_DATA_ITEM));
        }
      }

      const photo = data.photos[random(0, 20)];
      const res = await fetch(photo.src.original + '?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1200');
      const buffer = await res.arrayBuffer();
      const base64Flag = 'data:image/jpeg;base64,';
      const imageStr = arrayBufferToBase64(buffer);

      unpinImage();

      return {
        data: base64Flag + imageStr,
        author: {
          url: photo.photographer_url,
          name: photo.photographer
        }
      };
    } catch (err) {
      console.log(err);
      if (localStorage.getItem(LS_IMAGE_ITEM)) {
        return JSON.parse(localStorage.getItem(LS_IMAGE_ITEM));
      }
      return null;
    }
  });
  const pinImage = pin.mutate(current => {
    if (!current && image() !== null) {
      localStorage.setItem(LS_IMAGE_ITEM, JSON.stringify(image()));
    } else if (current) {
      localStorage.removeItem(LS_IMAGE_ITEM);
    }
    return !current;
  });
  const unpinImage = pin.mutate(() => {
    localStorage.removeItem(LS_IMAGE_ITEM);
    return false;
  });

  data({ image, getImage, pinImage: () => pinImage(), pin });
  getImage();
};
