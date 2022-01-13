import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  // infinite: boolean,
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    // infinite: false,
  };

  render() {
    const {
      step,
      images,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 className='Carousel__title'>Carousel</h1>

        <Carousel
          step={step}
          imagesList={images}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
        />
        <div className="input__container">
          <div className="input__label">
            Choose the number of scrolled images
          </div>
          <label htmlFor="step">
            <input
              placeholder="3"
              min={1}
              max={10}
              id="step"
              className="input input__step"
              type="number"
              onChange={(event) => {
                this.setState({ step: +event.target.value });
              }}
            />
          </label>
        </div>
        <div className="input__container">
          <div className="input__label">
            Set the number of displayed pictures
          </div>
          <label htmlFor="frameSize">
            <input
              placeholder="3"
              min={1}
              max={10}
              id="frameSize"
              className="input input__frameSize"
              type="number"
              onChange={(event) => {
                this.setState({ frameSize: +event.target.value });
              }}
            />
          </label>
        </div>
        <div className="input__container">
          <div className="input__label">Set the size of the picture</div>
          <label htmlFor="frameSize">
            <input
              placeholder="130"
              min={30}
              max={500}
              id="frameSize"
              className="input input__frameSize"
              type="number"
              onChange={(event) => {
                this.setState({ itemWidth: +event.target.value });
              }}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default App;
