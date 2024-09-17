import { ChangeEvent, useState } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';
import { MAX_ITEM_WIDTH } from './utils/config';

export const App = () => {
  const [step, setStep] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [frameSize, setFrameSize] = useState(0);
  const [duration, setDuration] = useState(0);

  const [images] = useState<string[]>([
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

  const handleStepChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setStep(+value);
  };

  const handleItemWidth = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    let newValue: number = +value;

    if (newValue > MAX_ITEM_WIDTH) {
      newValue = MAX_ITEM_WIDTH;
    }

    setItemWidth(newValue);
  };

  const handleItemFrameSize = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setFrameSize(+value);
  };

  const handleAnimationDuration = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setDuration(+value);
  };

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <div className="setup">
        <h2>Setup</h2>

        <label htmlFor="stepId">
          Choose step:
          <input
            id="stepId"
            type="number"
            value={step}
            onChange={handleStepChange}
          />
        </label>

        <label htmlFor="itemId">
          Choose item width:
          <input
            id="itemId"
            type="number"
            value={itemWidth}
            onChange={handleItemWidth}
          />
        </label>

        <label htmlFor="frameId">
          Choose item frame size:
          <input
            type="number"
            id="frameId"
            value={frameSize}
            onChange={handleItemFrameSize}
          />
        </label>

        <label>
          Choose animation duration:
          <input
            type="number"
            value={duration}
            onChange={handleAnimationDuration}
          />
        </label>
      </div>

      <Carousel
        images={images}
        {...(step > 0 && { step })}
        {...(frameSize > 0 && { frameSize })}
        {...(itemWidth > 0 && { itemWidth })}
        {...(duration > 0 && { animationDuration: duration })}
      />
    </div>
  );
};
