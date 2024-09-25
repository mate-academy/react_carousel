
import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const App: React.FC = () => {
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

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>
      <label htmlFor="stepId">Step:</label>
      <input id="stepId" type="number" value={3} />

      <label htmlFor="itemId">Item Width:</label>
      <input id="itemId" type="number" value={130} />

      <label htmlFor="frameId">Frame Size:</label>
      <input id="frameId" type="number" value={3} />

      <Carousel
        images={images}
        step={3}
        frameSize={3}
        itemWidth={130}
        animationDuration={1000}
        infinite={false}
      />
    </div>
  );
};

export default App;
