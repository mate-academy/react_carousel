import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
}

class App extends React.Component<{}, State> {
  state = {
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

    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
  };

  render() {
    const { images } = this.state;
    const { itemWidth, frameSize, step, animationDuration } = this.state;

    const itemWidthChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      valueToChange: keyof State,
    ) => {
      this.setState(prevState => ({
        ...prevState,
        [valueToChange]: +e.target.value,
      }));
    };

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <form className="form">
          <div className="inputContainer itemWidth">
            <label htmlFor="itemId">Item Width</label>
            <input
              type="text"
              onChange={e => itemWidthChange(e, 'itemWidth')}
              id="itemId"
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="frameId">Frame Size</label>
            <input
              type="text"
              onChange={e => itemWidthChange(e, 'frameSize')}
              id="frameId"
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="stepId">Step</label>
            <input
              type="text"
              onChange={e => itemWidthChange(e, 'step')}
              id="stepId"
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="durationId">Animation Duration</label>
            <input
              type="text"
              onChange={e => itemWidthChange(e, 'animationDuration')}
              id="durationId"
            />
          </div>
        </form>

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
  }
}

export default App;
