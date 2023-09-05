import { useState } from 'react';
import imagesFromServer from './data/images.json';

import './App.scss';

import Carousel from './components/Carousel';

import { Image } from './types/Image';
import { Params } from './types/Params';

const defaultSettings = {
  firstImg: 1,
  step: 3,
  frameSize: 3,
  itemWidth: 130,
  animationDuration: 1000,
  infinite: false,
};

function getPreparedImages(img: Image[], filterParams: Params): Image[] {
  const firstImgIndex = img.findIndex(el => el.id === filterParams.firstImg);

  return [...img].slice(firstImgIndex);
}

const App = () => {
  const [params, setParams] = useState(defaultSettings);
  const images = getPreparedImages(imagesFromServer, params);
  const changeParams = (key: string, value: number | boolean) => {
    const validValue = value;

    setParams(previousParams => {
      return { ...previousParams, [key]: validValue };
    });
  };

  return (
    <div className="App">
      <h1 data-cy="title" className="title">
        {`Carousel with ${images.length} images`}
      </h1>

      <Carousel
        images={images}
        params={params}
        changedCarousel={changeParams}
      />

    </div>
  );
};

export default App;
