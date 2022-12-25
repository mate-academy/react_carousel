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
  const [infinite, setInfinite] = useState(false);
  const [transform, setTransform] = useState(0);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const newFrameSize = Number(formData.get('frameSize'));
    const newStep = Number(formData.get('step'));
    const newFItemWidth = Number(formData.get('itemWidth'));
    const newAnimationDuration = Number(formData.get('animationDuration'));
    const newInfinite = formData.get('infinite') === 'yes';

    setFrameSize(newFrameSize);
    setStep(newStep);
    setItemWidth(newFItemWidth);
    setAnimationDuration(newAnimationDuration);
    setInfinite(newInfinite);

    setTransform(0);
  };

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
        animationDuration={animationDuration}
        maxFrameSize={images.length}
        onFormSubmit={handleFormSubmit}
      />

      <Carousel
        images={images}
        frameSize={frameSize}
        step={step}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={infinite}
        transform={transform}
        setTransform={setTransform}
      />
    </div>
  );
};
