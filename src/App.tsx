import { useState } from 'react';
import imagesFromServer from './api/images.json';
import { Image } from './types/Image';
import { Params } from './types/Params';
import Carousel from './components/Carousel';
import './App.scss';

let visibleImages = [];
const imgLength = imagesFromServer.length;
const baseParams = {
  firstImg: 1,
  step: 3,
  frameSize: 3,
  itemWidth: 130,
  animationDuration: 1000,
  infinite: false,
};

function getPreparedImages(images: Image[], filterParams: Params): Image[] {
  let preparedImages = [...images];
  let firstImgIndex = preparedImages
    .findIndex(img => img.id === filterParams.firstImg);

  if (filterParams.infinite) {
    preparedImages = preparedImages.slice(firstImgIndex)
      .concat(preparedImages.slice(0, firstImgIndex));

    firstImgIndex = preparedImages
      .findIndex(img => img.id === filterParams.firstImg);
  }

  preparedImages = preparedImages
    .slice(firstImgIndex, firstImgIndex + filterParams.frameSize);

  return preparedImages;
}

export const App = () => {
  const [params, setParams] = useState(baseParams);

  const changeParams = (key: string, value: number | boolean) => {
    let validValue = value;

    if (key === 'firstImg' && typeof value === 'number') {
      if (value > imgLength) {
        validValue = value - imgLength;
      }

      if (value <= 0) {
        validValue = value + imgLength;
      }
    }

    setParams(previousParams => {
      return { ...previousParams, [key]: validValue };
    });
  };

  visibleImages = getPreparedImages(imagesFromServer, params);

  return (
    <div className="App">
      <h1 data-cy="title">
        {`Carousel with ${visibleImages.length} images`}
      </h1>

      <Carousel
        images={visibleImages}
        params={params}
        imgLength={imgLength}
        changeCarousel={changeParams}
      />
    </div>
  );
};

export default App;
