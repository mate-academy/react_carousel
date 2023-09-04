import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const App: React.FC = () => {
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

  const [stepChange, setStepChange] = useState(3);
  const [frameSizeChange, setFrameSizeChange] = useState(3);
  const [itemWidthChange, setItemWidthChange] = useState(130);
  const [duration, setDuration] = useState(1000);

  return (
    <div className="App">
      <h1 className="App__title">{`Carousel with ${images.length} images`}</h1>

      <label htmlFor="step">Choose a step:</label>
      <select
        id="step"
        onChange={(e) => setStepChange(parseInt(e.target.value, 10))}
      >
        <option value="3">3</option>
        <option value="2">2</option>
      </select>
      <label htmlFor="frameSize">Choose a size frame:</label>
      <select
        id="frameSize"
        onChange={(e) => setFrameSizeChange(parseInt(e.target.value, 10))}
      >
        <option value="3">3</option>
        <option value="2">2</option>
      </select>
      <label htmlFor="frameSize">Choose a width:</label>
      <select
        id="frameSize"
        onChange={(e) => setItemWidthChange(parseInt(e.target.value, 10))}
      >
        <option value="130">130</option>
      </select>
      <label htmlFor="frameSize">Choose a duration:</label>
      <select
        id="frameSize"
        onChange={(e) => setDuration(parseInt(e.target.value, 10))}
      >
        <option value="1000">1000</option>
        <option value="1200">1200</option>
      </select>

      <Carousel
        images={images}
        step={stepChange}
        frameSize={frameSizeChange}
        itemWidth={itemWidthChange}
        animationDuration={duration}
      />
    </div>
  );
};

export default App;
