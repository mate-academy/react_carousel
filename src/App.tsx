import { useState } from 'react';
import './App.scss';

import { images } from './api/images';
import Carousel from './components/Carousel/Carousel';
import Settings from './components/Settings/Settings';

export const App = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [duration, setDuration] = useState(1000);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1
        data-cy="title"
        className="App__title"
      >
        {`Carousel with ${images.length} images`}
      </h1>

      <Settings
        images={images}
        itemWidth={itemWidth}
        itemWithChange={setItemWidth}
        frameSize={frameSize}
        frameSizeChange={setFrameSize}
        step={step}
        stepChange={setStep}
        duration={duration}
        durationChange={setDuration}
      />

      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        duration={duration}
      />
    </div>
  );
};
