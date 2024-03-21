import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
}

const App: React.FC = () => {
  const [data] = useState<State>({
    images: [
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
    ],
  });

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 data-cy="title">Carousel with {data.images.length} images</h1>

      <Carousel
        images={data.images}
        step={3}
        frameSize={3}
        itemWidth={130}
        animationDuration={300}
        infinite={false}
      />
    </div>
  );
};

export default App;
