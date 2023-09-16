import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';
// import { State } from './interface';

// class App extends React.Component<{}, State> {
//   state = {
//     images: [
//       './img/1.png',
//       './img/2.png',
//       './img/3.png',
//       './img/4.png',
//       './img/5.png',
//       './img/6.png',
//       './img/7.png',
//       './img/8.png',
//       './img/9.png',
//       './img/10.png',
//     ],
//     frameSize: 3,
//     itemWidth: 130,
//     step: 3,
//     animationDuration: 1000,
//     infinite: false,
//   };

//   render() {
//     const {
//       images,
//       frameSize,
//       itemWidth,
//       step,
//       animationDuration,
//       infinite,
//     } = this.state;
const App : React.FC = () => {
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
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  return (
    <div className="App">

      <Carousel
        images={images}
        frameSize={frameSize}
        itemWidth={itemWidth}
        step={step}
        animationDuration={animationDuration}
        infinite={infinite}
      />
      <div className="input_container">
        <label
          htmlFor="frame"
        >
          Frame Size
          <input
            id="frame"
            type="number"
            min={1}
            max={10}
            value={frameSize}
            onChange={(event) => {
              setFrameSize(+event.target.value);
            }}
          />
        </label>
        <label
          htmlFor="width"
        >
          Item Width
          <input
            id="width"
            type="number"
            min={130}
            max={260}
            step={1}
            value={itemWidth}
            onChange={(event) => {
              setItemWidth(+event.target.value);
            }}
          />
        </label>

        <label
          htmlFor="step"
        >
          Step
          <input
            id="step"
            type="number"
            min={1}
            max={10}
            step={1}
            value={step}
            onChange={(event) => {
              setStep(+event.target.value);
            }}
          />
        </label>

        <label
          htmlFor="delay"
        >
          Delay
          <input
            id="delay"
            type="number"
            min={1}
            step={10}
            value={animationDuration}
            onChange={(event) => {
              setAnimationDuration(+event.target.value);
            }}
          />
        </label>

        <label
          htmlFor="infinite"
        >
          Infinite
          <input
            type="checkbox"
            id="infinite"
            onChange={(event) => {
              setInfinite(event.target.checked);
            }}
          />
        </label>
      </div>
    </div>
  );
};

export default App;
