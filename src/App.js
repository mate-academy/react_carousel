import React from 'react';
import './App.css';

import Carousel from './components/Carousel';

const App = () => (
  <div className="App">
    <Carousel
      itemWidth={130}
      frameSize={3}
      step={3}
      infinite={false}
      animationDuration={1000}
    />
  </div>
);

export default App;
