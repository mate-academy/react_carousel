import React, { useState } from 'react';
import ClassNames from 'classnames';
import './App.scss';
import Carousel from './components/Carousel';
import Sliders from './components/Sliders';
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
  const [currentI, setCurrentI] = useState([0, 3]);
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [isPrevDisabled, disablePrev] = useState(true);
  const [isNextDisabled, disableNext] = useState(false);
  const [isInfinite, setInfinity] = useState(false);

  const showPrevious = () => {
    if (isInfinite) {
      let from = currentI[0];
      let to = currentI[1];

      if (from - step < 0 || to - step < 0) {
        if (from - step < 0) {
          from = 10 + (from - step);
        } else {
          from -= step;
        }

        if (to - step < 0) {
          to = 10 + (to - step);
        } else {
          to -= step;
        }

        setCurrentI([from, to]);
      } else {
        setCurrentI([from - step, to - step]);
      }
    } else {
      disableNext(false);
      if (currentI[0] - step <= 0) {
        disablePrev(true);
        setCurrentI([0, frameSize]);
      } else {
        setCurrentI([currentI[0] - step, currentI[1] - step]);
      }
    }
  };

  const showNext = () => {
    if (isInfinite) {
      let from = currentI[0];
      let to = currentI[1];

      if (from + step > 9 || to + step > 9) {
        if (from + step > 9) {
          from += step - 10;
        } else {
          from += step;
        }

        if (to + step > 9) {
          to += step - 10;
        } else {
          to += step;
        }

        setCurrentI([from, to]);
      } else {
        setCurrentI([from + step, to + step]);
      }
    } else {
      disablePrev(false);
      if (currentI[1] + step >= 10) {
        disableNext(true);
        setCurrentI([10 - frameSize, 10]);
      } else {
        setCurrentI([currentI[0] + step, currentI[1] + step]);
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
    setItemWidth(+document.querySelector('#itemWidth').value);
  };

  const resetItemWidth = () => {
    setItemWidth(130);
    document.querySelector('#itemWidth').value = 130;
  };

  const applyFrameSize = (event) => {
    !isInfinite && disablePrev(true);
    !isInfinite && disableNext(false);
    setFrameSize(+event.target.value);
    setCurrentI([0, +event.target.value]);
  };

  const applyStep = (event) => {
    setStep(+event.target.value);
  };

  const resetAll = () => {
    setItemWidth(130);
    document.querySelector('#itemWidth').value = 130;
    setFrameSize(3);
    setStep(3);
    setCurrentI([0, 3]);
  };

  const applyInfinity = () => {
    disablePrev(false);
    disableNext(false);
    setInfinity(true);
  };

  const disapplyInfinity = () => {
    disablePrev(true);
    setCurrentI([0, frameSize]);
    setInfinity(false);
  };

  return (
    <div className="App">
      <h1>Carousel</h1>

      <main className="main">
        <Carousel
          images={currentI[0] < currentI[1]
            ? images.filter((_, i) => i >= currentI[0] && i < currentI[1])
            : [
              ...images.filter((_, i) => i >= currentI[0]),
              ...images.filter((_, i) => i < currentI[1]),
            ]}
          itemWidth={itemWidth}
        />

        <Sliders
          showPrevious={showPrevious}
          showNext={showNext}
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
          applyInfinity={applyInfinity}
          disapplyInfinity={disapplyInfinity}
        />
      </main>
    </div>
  );
};

export default App;
