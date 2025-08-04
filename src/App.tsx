import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/carousel/Carousel';

import img1 from './images/img_1.png';
import img2 from './images/img_2.png';
import img3 from './images/img_3.png';
import img4 from './images/img_4.png';
import img5 from './images/img_5.png';
import img6 from './images/img_6.png';
import img7 from './images/img_7.png';
import img8 from './images/img_8.png';
import img9 from './images/img_9.png';
import img10 from './images/img_10.png';

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

const App: React.FC = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(2);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

  return (
    <div className="App">
      <h1 className="title" data-cy="title">
        Carousel
      </h1>

      <div className="settings">
        <h2 className="h2">Налаштування каруселі</h2>
        <label>
          Ширина елемента:
          <input
            type="number"
            value={itemWidth}
            onChange={e => setItemWidth(+e.target.value)}
          />
        </label>
        <label>
          Розмір фрейму:
          <input
            type="number"
            value={frameSize}
            onChange={e => setFrameSize(+e.target.value)}
          />
        </label>
        <label>
          Крок:
          <input
            type="number"
            value={step}
            onChange={e => setStep(+e.target.value)}
          />
        </label>
        <label>
          Тривалість анімації:
          <input
            type="number"
            value={animationDuration}
            onChange={e => setAnimationDuration(+e.target.value)}
          />
        </label>
      </div>

      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
        infinite={false}
        theme={'green'}
      />
    </div>
  );
};

export default App;
