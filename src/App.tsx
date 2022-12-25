import { FC, useState } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel/Carousel';
import { CarouselForm } from './components/CarouselForm/CarouselForm';

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

export const App: FC = () => {
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [transform, setTransform] = useState(0);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">
      <h1
        data-cy="title"
        className="title"
      >
        {/* eslint-disable-next-line */}
        Carousel with {images.length} images
      </h1>

      <CarouselForm
        frameSize={frameSize}
        step={step}
        itemWidth={itemWidth}
        infinite={infinite}
        onFrameSizeChange={setFrameSize}
        maxFrameSize={images.length}
        setTransform={setTransform}
        onStepChange={setStep}
        onItemWidthChange={setItemWidth}
        onAnimationDurationChange={setAnimationDuration}
        animationDuration={animationDuration}
        onInfiniteChange={setInfinite}
      />

      <Carousel
        images={images}
        frameSize={frameSize}
        step={step}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        transform={transform}
        infinite={infinite}
        setTransform={setTransform}
      />
    </div>
  );
};
