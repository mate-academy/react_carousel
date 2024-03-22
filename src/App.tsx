import { useState } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

export const App = () => {
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
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);
  const lengthOfImages = images.length;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'itemWidth':
        setItemWidth(Number(value));
        break;
      case 'frameSize':
        setFrameSize(Number(value));
        break;
      case 'step':
        setStep(Number(value));
        break;
      case 'animationDuration':
        setAnimationDuration(Number(value));
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {lengthOfImages} images</h1>
      <div className="inputs">
        <label htmlFor="itemId">Item width</label>
        <input
          id="itemId"
          type="number"
          name="itemWidth"
          value={itemWidth}
          onChange={handleInputChange}
        />

        <label htmlFor="frameId">Frame size</label>
        <input
          id="frameId"
          type="number"
          name="frameSize"
          value={frameSize}
          min={1}
          max={lengthOfImages}
          onChange={handleInputChange}
        />

        <label htmlFor="stepId">Step</label>
        <input
          id="stepId"
          type="number"
          name="step"
          value={step}
          min={1}
          max={lengthOfImages}
          onChange={handleInputChange}
        />

        <label htmlFor="animationDurationId">Animation duration</label>
        <input
          id="animationDurationId"
          type="number"
          name="animationDuration"
          value={animationDuration}
          onChange={handleInputChange}
        />
      </div>
      <Carousel
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        infinite={false}
      />
    </div>
  );
};
