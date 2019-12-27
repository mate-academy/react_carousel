import React, { useState } from 'react';
import ClassNames from 'classnames';
import './App.scss';
import Carousel from './components/Carousel';
import Controls from './components/Sliders';
import Form from './components/Form';

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
  const [currentInterval, setCurrentInterval] = useState([0, 3]);
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [isPrevDisabled, disablePrev] = useState(true);
  const [isNextDisabled, disableNext] = useState(false);
  const [isInfinite, setInfinity] = useState(false);

  const inputWidthValue = React.createRef();

  const scroll = (sideToScroll) => {
    let indexFrom = currentInterval[0];
    let indexTo = currentInterval[1];
    const minIndex = 0;
    const maxIndex = 9;
    const lastImage = 10;

    if (isInfinite) {
      if (sideToScroll === 'left') {
        if (indexFrom - step < minIndex || indexTo - step < minIndex) {
          if (indexFrom - step < minIndex) {
            indexFrom = 10 + (indexFrom - step);
          } else {
            indexFrom -= step;
          }

          if (indexTo - step < minIndex) {
            indexTo = 10 + (indexTo - step);
          } else {
            indexTo -= step;
          }

          setCurrentInterval([indexFrom, indexTo]);
        } else {
          setCurrentInterval([indexFrom - step, indexTo - step]);
        }
      } else if (sideToScroll === 'right') {
        if (indexFrom + step > maxIndex || indexTo + step > maxIndex) {
          if (indexFrom + step > maxIndex) {
            indexFrom += step - 10;
          } else {
            indexFrom += step;
          }

          if (indexTo + step > maxIndex) {
            indexTo += step - 10;
          } else {
            indexTo += step;
          }

          setCurrentInterval([indexFrom, indexTo]);
        } else {
          setCurrentInterval([indexFrom + step, indexTo + step]);
        }
      }
    } else if (sideToScroll === 'left') {
      disableNext(false);
      if (currentInterval[0] - step <= minIndex) {
        disablePrev(true);
        setCurrentInterval([minIndex, frameSize]);
      } else {
        setCurrentInterval([
          currentInterval[0] - step,
          currentInterval[1] - step,
        ]);
      }
    } else if (sideToScroll === 'right') {
      disablePrev(false);
      if (currentInterval[1] + step >= lastImage) {
        disableNext(true);
        setCurrentInterval([lastImage - frameSize, lastImage]);
      } else {
        setCurrentInterval([
          currentInterval[0] + step,
          currentInterval[1] + step,
        ]);
      }
    }
  };

  const prevButtonClass = ClassNames(
    { buttons__button: true },
    { 'buttons__button--disabled': isPrevDisabled }
  );

  const nextButtonClass = ClassNames(
    { buttons__button: true },
    { 'buttons__button--disabled': isNextDisabled }
  );

  const applyItemWidth = () => {
    setItemWidth(+inputWidthValue.current.value);
  };

  const resetItemWidth = () => {
    setItemWidth(130);
    inputWidthValue.current.value = 130;
  };

  const applyFrameSize = (event) => {
    !isInfinite && disablePrev(true);
    !isInfinite && disableNext(false);
    setFrameSize(+event.target.value);
    setCurrentInterval([0, +event.target.value]);
  };

  const applyStep = (event) => {
    setStep(+event.target.value);
  };

  const resetAll = () => {
    setItemWidth(130);
    inputWidthValue.current.value = 130;
    setFrameSize(3);
    setStep(3);
    setCurrentInterval([0, 3]);
  };

  const toggleInfinityMode = () => {
    if (isInfinite) {
      disablePrev(true);
      setCurrentInterval([0, frameSize]);
    } else {
      disablePrev(false);
      disableNext(false);
    }

    setInfinity(!isInfinite);
  };

  return (
    <div className="App">
      <h1>Carousel</h1>

      <main className="main">
        <Carousel
          images={currentInterval[0] < currentInterval[1]
            ? images.filter((_, i) => i >= currentInterval[0]
              && i < currentInterval[1])
            : [
              ...images.filter((_, i) => i >= currentInterval[0]),
              ...images.filter((_, i) => i < currentInterval[1]),
            ]}
          itemWidth={itemWidth}
        />

        <Controls
          scroll={scroll}
          prevClass={prevButtonClass}
          nextClass={nextButtonClass}
        />

        <Form
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          isInfinite={isInfinite}
          applyItemWidth={applyItemWidth}
          resetItemWidth={resetItemWidth}
          applyFrameSize={applyFrameSize}
          applyStep={applyStep}
          resetAll={resetAll}
          toggleInfinityMode={toggleInfinityMode}
          inputWidthValue={inputWidthValue}
        />
      </main>
    </div>
  );
};

export default App;
