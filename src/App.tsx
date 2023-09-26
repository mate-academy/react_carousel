import React, { useState } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const images = [
  { id: 1, url: './img/1.png' },
  { id: 2, url: './img/2.png' },
  { id: 3, url: './img/3.png' },
  { id: 4, url: './img/4.png' },
  { id: 5, url: './img/5.png' },
  { id: 6, url: './img/6.png' },
  { id: 7, url: './img/7.png' },
  { id: 8, url: './img/8.png' },
  { id: 9, url: './img/9.png' },
  { id: 10, url: './img/10.png' },
];

const App: React.FC = () => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);

  return (
    <div className="App">
      <h1 data-cy="title">
        {`Carousel with ${images.length} images`}
      </h1>

      <form method="post" className="App__form">
        <label htmlFor="widthId">
          ITEM WIDTH:
          <input
            id="widthId"
            type="number"
            name="itemWidth"
            min={130}
            max={1300}
            step={1}
            value={itemWidth}
            onChange={event => setItemWidth(+event.target.value)}
          />
        </label>

        <label htmlFor="frameSizeId">
          FRAME SIZE:
          <input
            id="frameSizeId"
            type="number"
            name="frameSize"
            min={1}
            max={10}
            step={1}
            value={frameSize}
            onChange={event => setFrameSize(+event.target.value)}
          />
        </label>

        <label htmlFor="stepId">
          STEP:
          <input
            id="stepId"
            type="number"
            name="step"
            min="1"
            max="10"
            step="1"
            value="1"
          />
        </label>

        <label htmlFor="animationDurationId">
          ANIMATION DURATION:
          <input
            id="animationDurationId"
            type="number"
            name="animationDuration"
            min="1000"
            max="100000"
            step="100"
            value="1000"
          />
        </label>

        <label htmlFor="infiniteId">
          INFINITE:
          <input
            id="infiniteId"
            type="checkbox"
            name="infinite"
          />
        </label>
      </form>

      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        // step={3}
        // animationDuration={1000}
        // infinite={false}
      />
    </div>
  );
};

// interface State {
//   images: string[];
// }

// class App extends React.Component<{}, State> {
//   state = {
//     images: [
//       './img/1.png',
//       './img/2.png',
//       './img/3.png',
//       './img/4.png',
//       './img/5.png',
//       './img/6.png',
//       './img/7.png',
//       './img/8.png',
//       './img/9.png',
//       './img/10.png',
//     ],
//   };

//   render() {
//     const { images } = this.state;

//     return (
//       <div className="App">
//         {/* eslint-disable-next-line */}
//         <h1>Carousel with {images.length} images</h1>

//         <Carousel />
//       </div>
//     );
//   }
// }

export default App;
