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
  infinite: boolean
) => [string[], number];

const prepareSlider: PrepareSlider = (
  itemWidth,
  infinite,
) => {
  if (!infinite) {
    return [images, 0];
  }

  const preparedImages = [
    ...images,
    ...images,
    ...images,
  ];

  const initialTranslate = images.length * itemWidth;

  return [
    preparedImages,
    initialTranslate,
  ];
};

const setInitButtonsStance = (infinite: boolean) => {
  if (infinite) {
    return [false, false];
  }

  return [true, false];
};

export const App: React.FC = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);
  const [isAnimationDisabled, setIsAnimationDisabled] = useState(false);

  let [preparedImages, initialTranslate] = prepareSlider(
    itemWidth,
    infinite,
  );

  const [initDecDis, initIncDis] = setInitButtonsStance(infinite);

  const [isDecDisabled, setIsDecDisabled] = useState(initDecDis);
  const [isIncDisabled, setIsIncDisabled] = useState(initIncDis);
  const [translate, setTranslate] = useState(initialTranslate);

  const sliderWidth = {
    width: itemWidth * frameSize,
  };

  const transform = { transform: `translateX(-${translate}px)` };
  const transition = { transition: `transform ${animationDuration}ms` };

  const handleTextInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    const numberedValue = Number(value);

    if (Number.isNaN(numberedValue)) {
      return;
    }

    switch (name) {
      case 'item width':
        setItemWidth(numberedValue);
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

  const handleInfiniteChange = () => {
    setInfinite(currentValue => {
      const newValue = !currentValue;

      [preparedImages, initialTranslate] = prepareSlider(
        itemWidth,
        newValue,
      );

      setTranslate(initialTranslate);

      return newValue;
    });
  };

  const slideToMiddle = () => {
    const maxTranslate = images.length * 2 * itemWidth;

    if (translate >= maxTranslate) {
      setIsAnimationDisabled(currentValue => !currentValue);
      setTranslate(currentValue => currentValue - images.length * itemWidth);
    }
  };

  const slideForward = () => {
    if (!infinite) {
      const maxTranslate = (images.length - frameSize) * itemWidth;
      let nextStep = translate + itemWidth * step;

      if (nextStep >= maxTranslate) {
        nextStep = maxTranslate;
        setIsIncDisabled(true);
      }

      setTranslate(nextStep);

      if (translate > 0) {
        setIsDecDisabled(false);
      }

      return;
    }

    const nextStep = translate + itemWidth * step;

    if (isAnimationDisabled) {
      setIsAnimationDisabled(currentValue => !currentValue);
    }

    setTranslate(() => nextStep);
    slideToMiddle();
  };

  const slideBackward = () => {
    setTranslate(currentValue => {
      let newValue = currentValue - itemWidth * step;

      if (newValue <= 0) {
        newValue = 0;
        setIsDecDisabled(true);
      }

      return newValue;
    });

    setIsIncDisabled(false);
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
        onPageIncrement={slideForward}
        onPageDecrement={slideBackward}
        // onTransitionEnd={slideToMiddle}
        isDecDisabled={isDecDisabled}
        isIncDisabled={isIncDisabled}
        isAnimationDisabled={isAnimationDisabled}
      />
    </div>
  );
};
