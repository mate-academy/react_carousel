import React, { useState } from 'react';
import Carousel from './components/Carousel';

const CarouselContainer: React.FC = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
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
    <div>
      <h1>Carousel Settings</h1>
      <label>
        Item Width:
        <input
          type="number"
          value={itemWidth}
          onChange={(e) => setItemWidth(Number(e.target.value))}
        />
      </label>
      <label>
        Frame Size:
        <input
          type="number"
          value={frameSize}
          onChange={(e) => setFrameSize(Number(e.target.value))}
        />
      </label>
      <label>
        Step:
        <input
          type="number"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
      </label>
      <label>
        Animation Duration:
        <input
          type="number"
          value={animationDuration}
          onChange={(e) => setAnimationDuration(Number(e.target.value))}
        />
      </label>
      <label>
        Infinite:
        <input
          type="checkbox"
          checked={infinite}
          onChange={(e) => setInfinite(e.target.checked)}
        />
      </label>
      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
        infinite={infinite}
      />
    </div>
  );
};

export default CarouselContainer;
