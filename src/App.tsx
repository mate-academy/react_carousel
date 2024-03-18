import React, { useState } from 'react';
import './App.scss';
// eslint-disable-next-line import/no-named-as-default
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

// class App extends React.Component<{}, State> {
const App: React.FC<State> = () => {
  // state = {
  //   images: [
  //     './img/1.png',
  //     './img/2.png',
  //     './img/3.png',
  //     './img/4.png',
  //     './img/5.png',
  //     './img/6.png',
  //     './img/7.png',
  //     './img/8.png',
  //     './img/9.png',
  //     './img/10.png',
  //   ],
  const [images] = useState([
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
  ]);
  const [step, setStep] = useState(3);
  const [frameSize, setFrameSize] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const [infinite, setInfinite] = useState(false);

  // render() {
  //   const { images } = this.state;

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 className='App__title'>Carousel with {images.length} images</h1>

      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={infinite}
      />

      <div className="Options">
        <div className="stepSelector">
          <label className="Options__label">
            Step
            <input
              type="number"
              id="stepSelector"
              className="Options__form-control"
              min={1}
              max={10}
              value={step}
              onChange={event => setStep(Number(event.target.value))}
            />
          </label>
        </div>

        <div className="frameSizeSelector">
          <label className="Options__label">
            Frame Size
            <input
              type="number"
              id="frameSizeSelector"
              className="Options__form-control"
              min={1}
              max={10}
              value={frameSize}
              onChange={event => setFrameSize(Number(event.target.value))}
            />
          </label>
        </div>
        <div className="widthSelector">
          <label className="Options__label">
            Item width
            <input
              type="number"
              id="widthSelector"
              className="Options__form-control"
              min={130}
              max={260}
              step={10}
              value={itemWidth}
              onChange={event => setItemWidth(Number(event.target.value))}
            />
          </label>
        </div>
        <div className="animationDurationSelector">
          <label className="Options__label">
            Animation Duration
            <input
              type="number"
              id="animationDurationSelector"
              className="Options__form-control"
              min={100}
              max={5000}
              step={100}
              value={animationDuration}
              onChange={event =>
                setAnimationDuration(Number(event.target.value))
              }
            />
          </label>
        </div>
        <div className="infiniteSelector">
          <label className="Options__label">
            Infinite
            <input
              type="checkbox"
              id="infiniteSelector"
              className="Options__form-control"
              checked={infinite}
              onChange={event => setInfinite(event.target.checked)}
            />
          </label>
        </div>
      </div>
    </div>
  );
};
// }

export default App;
