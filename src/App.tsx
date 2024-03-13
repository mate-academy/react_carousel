import React, { useState } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

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

//         <Carousel images={images} />
//       </div>
//     );
//   }
// }

interface State {
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}

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

  const initialState = {
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  };

  const [state, setState] = useState<State>(initialState);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState(prevSettings => ({
      ...prevSettings,
      [name]: parseInt(value, 10),
    }));
  };

  const handleInputChangeInfinity = () => {
    setState(prevState => ({
      ...prevState,
      infinite: !prevState.infinite,
    }));
  };

  return (
    <div className="App">
      {/* eslint-disable-next-line */}
      <h1 className='App__title' data-cy='title'>
        Carousel with {images.length} images
      </h1>

      <Carousel
        images={images}
        step={state.step}
        frameSize={state.frameSize}
        itemWidth={state.itemWidth}
        animationDuration={state.animationDuration}
        infinite={state.infinite}
      />

      <div className="App__container">
        <div className="App__input-wrapper">
          <label htmlFor="itemId" className="App__input-title">
            Item width
          </label>
          {/* <p className="App__input-title">Item width</p> */}
          <input
            className="App__input"
            id="itemId"
            type="number"
            name="itemWidth"
            value={state.itemWidth}
            onChange={handleInputChange}
            min={130}
            max={500}
            step={10}
          />
        </div>

        <div className="App__input-wrapper">
          <label htmlFor="frameId" className="App__input-title">
            Frame size
          </label>
          {/* <p className="App__input-title">Frame size</p> */}
          <input
            className="App__input"
            id="frameId"
            type="number"
            name="frameSize"
            value={state.frameSize}
            onChange={handleInputChange}
            min={0}
            max={10}
            step={1}
          />
        </div>

        <div className="App__input-wrapper">
          <label htmlFor="stepId" className="App__input-title">
            Step
          </label>
          {/* <p className="App__input-title">Step</p> */}
          <input
            className="App__input"
            id="stepId"
            type="number"
            name="step"
            value={state.step}
            onChange={handleInputChange}
            min={1}
            max={9}
          />
        </div>

        <div className="App__input-wrapper">
          <p className="App__input-title">Animation duration</p>
          <input
            className="App__input"
            id="durationId"
            type="number"
            name="animationDuration"
            value={state.animationDuration}
            onChange={handleInputChange}
            min={1000}
            step={500}
          />
        </div>

        <div className="App__input-wrapper">
          <p className="App__input-title">Infinite</p>
          <input
            className="App__input App__input-checkbox"
            id="infiniteId"
            type="checkbox"
            name="infinite"
            onChange={handleInputChangeInfinity}
            checked={state.infinite}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
