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

  const [pictures, setPictures] = useState([
    './img/1.png',
    './img/2.png',
    /*   'https://media.glamourmagazine.co.uk/photos/64b6ae8fcd1ad7c51ecf045c/1:1/'
    + 'w_1280,h_1280,c_limit/RYAN%20GOSLING%20EVA%20MENDES%20180723%20default'
    + 'GettyImages-1527942629.jpg', */
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/7.png',
    './img/8.png',
    './img/9.png',
    './img/10.png',
  ]);

  const [newImage, setNewImage] = useState('');

  const changeHadler = (value: number | boolean,
    key: keyof StateProps) => {
    setState(prevState => ({ ...prevState, [key]: value }));
  };

  function isImage(url: string) {
    return (/\.(jpg|jpeg|png|webp|avif|gif|svg)$/).test(url);
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && newImage.length > 0) {
      if (isImage(newImage)) {
        setPictures(oldPics => [newImage, ...oldPics]);
        setNewImage('');
      } else {
        // eslint-disable-next-line no-alert
        alert('image URL is invalid');
        setNewImage('');
      }
    }
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
        animationDuration={state.animationDuration}
      />
      <label htmlFor="itemId">
        <input
          type="number"
          name="itemWidth"
          id="itemId"
          value={state.itemWidth}
          min={50}
          max={500}
          step={10}
          onChange={e => {
            changeHadler(+e.target.value, e.target.name as keyof StateProps);
          }}
        />
        {'  - image size in pixels'}
        <br />
      </label>
      <label htmlFor="frameId">
        <input
          type="number"
          name="frameSize"
          id="frameId"
          value={state.frameSize}
          min={1}
          max={10}
          step={1}
          onChange={e => {
            changeHadler(+e.target.value, e.target.name as keyof StateProps);
          }}
        />
        {' - frame size (quantity of images visible)'}
        <br />
      </label>
      <label htmlFor="stepId">
        <input
          type="number"
          name="step"
          id="stepId"
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
      </label>

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
        }}
      />
      {' - horizontal spacing between the images in pixels'}
      <br />
      <input
        type="text"
        name="newImage"
        id="newImage"
        value={newImage}
        onChange={e => {
          setNewImage(e.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
      {' - paste your image url here'}
    </div>
  );
};

export default App;
