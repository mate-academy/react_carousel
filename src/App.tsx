import React, { useState } from 'react';
import { Carousel } from './components/Carousel';

export const App: React.FC = () => {
  const [state, setState] = useState({
    images: [
      './img/1.png',
      './img/2.png',
      './img/3.png',
      './img/4.png',
      './img/5.png',
      './img/6.png',
      './img/7.png',
      './img/8.png',
      './img/9.png',
      './img/10.png',
    ],
    imageWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: true,
  });

  const toggleInfinite = () => {
    setState(prevState => ({ ...prevState, infinite: !prevState.infinite }));
  };

  const {
    images,
    imageWidth,
    frameSize,
    step,
    animationDuration,
    infinite,
  } = state;

  const handleInputChange = (field: string, value: number) => {
    setState(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <div className="App">
      <h1 data-cy="title">
        Carousel with
        {images.length}
        images
      </h1>
      <form style={{ margin: '20px', display: 'inline-block' }}>
        <div>
          <label htmlFor="itemId">
            Item Width:&nbsp;
            <input
              type="number"
              name="itemId"
              value={imageWidth}
              onChange={(e) => handleInputChange('imageWidth',
                Number(e.target.value))}
            />
          </label>
        </div>
        <div>
          <label htmlFor="frameId">
            Frame Size:&nbsp;
            <input
              type="number"
              name="frameId"
              value={frameSize}
              onChange={(e) => handleInputChange('frameSize',
                Number(e.target.value))}
            />
          </label>
        </div>
        <div>
          <label htmlFor="stepId">
            Step:&nbsp;
            <input
              type="number"
              name="stepId"
              value={step}
              onChange={(e) => handleInputChange('step',
                Number(e.target.value))}
            />
          </label>
        </div>
        <div>
          <label htmlFor="animationDuration">
            Animation Duration:&nbsp;
            <input
              type="number"
              name="animationDuration"
              value={animationDuration}
              onChange={(e) => handleInputChange('animationDuration',
                Number(e.target.value))}
            />
          </label>
        </div>
        <div>
          <label>
            Infinite Scroll:
            <input
              type="checkbox"
              checked={infinite}
              onChange={() => toggleInfinite()}
            />
          </label>
        </div>
      </form>
      <Carousel
        step={step}
        images={images}
        frameSize={frameSize}
        imageWidth={imageWidth}
        animationDuration={animationDuration}
        infinite={infinite}
      />
    </div>
  );
};
