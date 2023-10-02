import React, { useState } from 'react';

import './App.scss';
import './services/reset.scss';
import { Carousel } from './components/Carousel';
import { CarouselParameters } from './types/CarouselParameters';
import { getNumbers } from './services/utils';

const defaultCarouselParameters: CarouselParameters = {
  step: 3,
  frameSize: 3,
  itemWidth: 130,
  animationDuration: 1000,
};

const getImagesUrls = getNumbers(1, 10)
  .map(n => `./img/${n}.png`);

export const App: React.FC = () => {
  const [carouselParameters, setCarouselParameters] = (
    useState<CarouselParameters>({ ...defaultCarouselParameters })
  );
  const [isInfinite, setIsInfinite] = useState(false);

  const images = getImagesUrls;

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCarouselParameters({
      ...carouselParameters,
      [name]: +value,
    });
  };

  const handleInfiniteChange = () => {
    setIsInfinite(!isInfinite);
  };

  return (
    <div className="App">
      <h1 data-cy="title">
        {`Carousel with ${images.length} images`}
      </h1>

      <div className="App__inputs">
        <label htmlFor="itemId">
          Enter image width in px: &nbsp;&nbsp;
          <input
            id="itemId"
            name="itemWidth"
            type="number"
            value={carouselParameters.itemWidth}
            onChange={handleFieldChange}
          />
        </label>

        <label htmlFor="frameId">
          Enter number of images on page:&nbsp;&nbsp;
          <input
            id="frameId"
            name="frameSize"
            type="number"
            value={carouselParameters.frameSize}
            min="1"
            max="10"
            onChange={handleFieldChange}
          />
        </label>

        <label htmlFor="stepId">
          Enter number of images scrolled:&nbsp;&nbsp;
          <input
            id="stepId"
            name="step"
            type="number"
            value={carouselParameters.step}
            min="1"
            max="10"
            onChange={handleFieldChange}
          />
        </label>

        <label>
          Enter animation duration time in ms:&nbsp;&nbsp;
          <input
            name="animationDuration"
            type="number"
            value={carouselParameters.animationDuration}
            onChange={handleFieldChange}
          />
        </label>

        <label>
          Do you want infinite scrolling?&nbsp;&nbsp;
          <input
            name="infinite"
            type="checkbox"
            checked={isInfinite}
            onChange={handleInfiniteChange}
          />
        </label>
      </div>

      <Carousel
        images={images}
        step={carouselParameters.step}
        frameSize={carouselParameters.frameSize}
        itemWidth={carouselParameters.itemWidth}
        animationDuration={carouselParameters.animationDuration}
        infinite={isInfinite}
      />
    </div>
  );
};
