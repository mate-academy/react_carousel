import React, { useState, ChangeEvent } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel/Carousel';
import { Controls } from './components/Controls/Controls';

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

type PrepareSlider = (
  itemWidth: number,
  infinite: boolean,
) => [string[], number];

const prepareSlider: PrepareSlider = (
  itemWidth,
  infinite,
) => {
  if (!infinite) {
    return [images, 0];
  }

  const preparedImages = images.concat(images, images);

  const initialTranslate = images.length * itemWidth;

  return [
    preparedImages,
    initialTranslate,
  ];
};

const minSlideWIdth = 65;

export const App: React.FC = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);
  const [isAnimationDisabled, setIsAnimationDisabled] = useState(false);
  const [isDecDisabled, setIsDecDisabled] = useState(true);
  const [isIncDisabled, setIsIncDisabled] = useState(false);

  let [preparedImages, initialTranslate] = prepareSlider(
    itemWidth,
    infinite,
  );

  const [translate, setTranslate] = useState(initialTranslate);

  const maxTranslate = (images.length - frameSize) * itemWidth;

  const sliderWidth = {
    width: itemWidth * frameSize,
  };
  const transform = {
    transform: `translateX(-${translate}px)`,
  };
  const transition = {
    transition: `transform ${animationDuration}ms`,
  };

  const handleTextInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    const numberedValue = Number(value);

    switch (name) {
      case 'item width':
        setItemWidth(currentValue => {
          let newValue = currentValue;

          if (numberedValue < minSlideWIdth) {
            newValue = minSlideWIdth;
          }

          return newValue;
        });
        break;

      case 'frame size':
        setFrameSize(numberedValue);

        if (numberedValue >= images.length) {
          setIsIncDisabled(true);
        }

        break;

      case 'slider step':
        setStep(numberedValue);
        break;

      case 'animation duration':
        setAnimationDuration(numberedValue);
        break;

      default:
        throw new Error('An error occured');
    }
  };

  const enableAnimation = () => {
    setIsAnimationDisabled(false);
  };

  const disableAnimation = () => {
    setIsAnimationDisabled(true);
  };

  const handleInfiniteChange = () => {
    setInfinite(currentValue => {
      const newValue = !currentValue;

      [preparedImages, initialTranslate] = prepareSlider(
        itemWidth,
        newValue,
      );

      setIsAnimationDisabled(true);
      setTranslate(initialTranslate);

      if (newValue) {
        setIsDecDisabled(false);
        setIsIncDisabled(false);
      } else {
        setIsDecDisabled(true);
        setIsIncDisabled(false);
      }

      return newValue;
    });
  };

  const slideBackToMiddle = () => {
    const maxInfTranslate = images.length * 2 * itemWidth;

    if (translate >= maxInfTranslate) {
      disableAnimation();
      setTranslate(currentValue => currentValue - images.length * itemWidth);
    }
  };

  const slideForwToMiddle = () => {
    const minInfTranslate = images.length * itemWidth;

    if (translate <= minInfTranslate) {
      disableAnimation();
      setTranslate(currentValue => currentValue + images.length * itemWidth);
    }
  };

  const slideForward = async () => {
    if (!infinite) {
      enableAnimation();

      let nextStep = translate + itemWidth * step;

      if (nextStep >= maxTranslate) {
        nextStep = maxTranslate;
        setIsIncDisabled(true);
      }

      setTranslate(nextStep);

      if (nextStep > 0) {
        setIsDecDisabled(false);
      }

      return;
    }

    // here the slider must go back without animation for 10 elements before continuing scrolling forward
    // the problem is React merges both actions if I call the functions consecutively
    // the only my desision for now is to call the second part in setTimeout. And it's bad
    slideBackToMiddle();

    setTimeout(() => {
      enableAnimation();
      setTranslate(currentValue => currentValue + itemWidth * step);
    }, 0);
  };

  const slideBackward = () => {
    if (!infinite) {
      enableAnimation();

      let nextStep = translate - itemWidth * step;

      if (nextStep <= 0) {
        nextStep = 0;
        setIsDecDisabled(true);
      }

      setTranslate(nextStep);

      if (nextStep < maxTranslate) {
        setIsIncDisabled(false);
      }

      return;
    }

    // here the slider must go forward without animation for 10 elements before continuing scrolling backwards
    // the problem is React merges both actions if I call the functions consecutively
    // the only my desision for now is to call the second part in setTimeout. And it's bad
    slideForwToMiddle();

    setTimeout(() => {
      enableAnimation();
      setTranslate(currentValue => currentValue - itemWidth * step);
    }, 0);
  };

  return (
    <div className="App">
      <h1 data-cy="title">
        {`Carousel with ${images.length} images`}
      </h1>

      <Controls
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
        infinite={infinite}
        onTextImputChange={handleTextInputChange}
        onCheckInputChange={handleInfiniteChange}
      />

      <Carousel
        images={preparedImages}
        itemWidth={itemWidth}
        sliderWidth={sliderWidth}
        transform={transform}
        transition={transition}
        onSlideForward={slideForward}
        onSlideBackward={slideBackward}
        isDecDisabled={isDecDisabled}
        isIncDisabled={isIncDisabled}
        isAnimationDisabled={isAnimationDisabled}
      />
    </div>
  );
};
