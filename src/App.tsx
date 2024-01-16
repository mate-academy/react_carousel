/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

export type Image = string;

const images: Image[] = [
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

export const App = () => {
  const [itemsWidth, setItemsWidth] = useState(130);
  const [steps, setSteps] = useState(3);
  const [frameSize, setFrameSize] = useState(3);

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1>Carousel with {images.length} images</h1>

      <section className="App__inputs">
        <label htmlFor="itemWidth">
          <h2>Items width:</h2>
          <input
            type="number"
            defaultValue={itemsWidth}
            min={itemsWidth}
            onChange={(e) => setItemsWidth(+e.target.value)}
            id="itemWidth"
          />
        </label>

        <label htmlFor="frameSize">
          <h2>Frame size:</h2>
          <input
            type="number"
            id="frameSize"
            defaultValue={frameSize}
            onChange={(e) => setFrameSize(+e.target.value)}
          />
        </label>

        <label htmlFor="step">
          <h2>Step:</h2>
          <input
            type="number"
            id="step"
            defaultValue={steps}
            onChange={(e) => setSteps(+e.target.value)}
          />
        </label>

        <label htmlFor="animationDuration">
          <h2>Animation duration</h2>
          <input type="text" id="animationDuration" />
        </label>
      </section>

      <Carousel
        images={images}
        itemsWidth={itemsWidth}
        frameSize={frameSize}
        steps={steps}
      />
    </div>
  );
};
