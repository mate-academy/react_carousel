import { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { Options } from './components/Options';

const App = () => {
  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1);
  const [infinite, setInfinite] = useState(false);
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

  return (
    <div className="App">
      <div>
        <h1
          className="title"
          data-cy="title"
        >
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={images}
          step={step || 0}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>

      <Options
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={infinite}
        setStep={setStep}
        setFrameSize={setFrameSize}
        setItemWidth={setItemWidth}
        setAnimDuration={setAnimationDuration}
        setInfinite={setInfinite}
      />
    </div>
  );
};

export default App;
