import { useState } from 'react';

import './App.scss';
import Carousel from './components/Carousel';
import { InputField } from './data/Data';

const images = [
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
];

const App = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1
        data-cy="title"
        className="App__title title"
      >
        {`Carousel with ${images.length} images`}
      </h1>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        onChangeCarousel={(value: number, name: InputField) => {
          switch (name) {
            case InputField.STEP:
              setStep(value);
              break;
            case InputField.ANIMATION_DURATION:
              setAnimationDuration(value);
              break;
            case InputField.FRAME_SIZE:
              setFrameSize(value);
              break;
            case InputField.ITEM_WIDTH:
              setItemWidth(value);
              break;
            default:
              break;
          }
        }}
      />
    </div>
  );
};

export default App;
