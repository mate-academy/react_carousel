import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

type StateProps = {
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
  imageGap: number,
};

const App: React.FC = () => {
  const [state, setState] = useState<StateProps>({
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
    imageGap: 10,
  } as StateProps);

  const [pictures] = useState([
    './img/1.png',
    './img/2.png',
    'https://media.glamourmagazine.co.uk/photos/64b6ae8fcd1ad7c51ecf045c/1:1/'
    + 'w_1280,h_1280,c_limit/RYAN%20GOSLING%20EVA%20MENDES%20180723%20default'
    + 'GettyImages-1527942629.jpg',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/7.png',
    './img/8.png',
    './img/9.png',
    './img/10.png',
  ]);

  document.documentElement.style.setProperty('--itemLength', `${pictures.length}px`);
  document.documentElement.style.setProperty('--carouselWidth', `${pictures.length * (state.itemWidth + state.imageGap)}px`);
  document.documentElement.style.setProperty('--containerWidth', `${(state.itemWidth + state.imageGap) * (state.frameSize) - state.imageGap}px`);
  document.documentElement.style.setProperty('--animationDuration', `${state.animationDuration}ms`);
  document.documentElement.style.setProperty('--imageGap', `${state.imageGap}px`);

  const changeHadler = (value: number | boolean,
    key: keyof StateProps) => {
    setState(prevState => ({ ...prevState, [key]: value }));
  };

  return (
    <div className="App">
      <h1 data-cy="title">{`Carousel with ${pictures.length} images, ${state.frameSize} frameSize and ${state.step} stepSize`}</h1>

      <Carousel
        images={pictures}
        step={state.step}
        itemWidth={state.itemWidth}
        frameSize={state.frameSize}
        imageGap={state.imageGap}
      />
      <input
        type="number"
        name="itemWidth"
        id="itemWidth"
        value={state.itemWidth}
        min={50}
        max={500}
        step={10}
        onChange={e => {
          changeHadler(+e.target.value, e.target.name as keyof StateProps);
          document.documentElement.style.setProperty('--itemWidth', `${+e.target.value}px`);
        }}
      />
      {'  - image size in pixels'}
      <br />
      <input
        type="number"
        name="frameSize"
        id="frameSize"
        value={state.frameSize}
        min={1}
        max={10}
        step={1}
        onChange={e => {
          changeHadler(+e.target.value, e.target.name as keyof StateProps);
          document.documentElement.style.setProperty('--containerWidth', `${(state.itemWidth + state.imageGap) * state.frameSize - state.imageGap}px`);
        }}
      />
      {' - frame size (quantity of images visible)'}
      <br />
      <input
        type="number"
        name="step"
        id="step"
        value={state.step}
        min={1}
        max={10}
        step={1}
        onChange={e => {
          changeHadler(+e.target.value, e.target.name as keyof StateProps);
        }}
      />
      {' - step size (number of images scrolled per click)'}
      <br />
      <input
        type="number"
        name="animationDuration"
        id="animationDuration"
        value={state.animationDuration}
        min={100}
        max={60000}
        step={100}
        onChange={e => {
          changeHadler(+e.target.value, e.target.name as keyof StateProps);
          document.documentElement.style.setProperty('--animationDuration', `${+e.target.value}ms`);
        }}
      />
      {' - (default 1000) - time in ms to show the new portion of images'}
      <br />
      <input
        type="number"
        name="imageGap"
        id="imageGap"
        value={state.imageGap}
        min={1}
        max={50}
        step={1}
        onChange={e => {
          changeHadler(+e.target.value, e.target.name as keyof StateProps);
          document.documentElement.style.setProperty('--imageGap', `${+e.target.value}px`);
        }}
      />
      {' - horizontal spacing between the images in pixels'}
    </div>
  );
};

export default App;
