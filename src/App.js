import React from 'react';
import './App.scss';

import Carousel from './components/Carousel';

class App extends React.Component {
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
    infinite: false,
    translate: 0,
  };

  render() {
    const { images, step, frameSize, itemWidth,
      animationDuration, infinite, translate } = this.state;

    const width = itemWidth * step;
    const slidesCount = Math.ceil(10 / step);
    const max = width * slidesCount - width;

    const nextSlide = () => {
      if (translate > -max) {
        this.setState(state => ({
          translate: state.translate - width,
        }));
      } else if (translate === -max && infinite) {
        this.setState({
          translate: 0,
        });
      }
    };

    const prevSlide = () => {
      if (translate === 0 && infinite) {
        this.setState({
          translate: -max,
        });
      } else if (translate < 0) {
        this.setState(state => ({
          translate: state.translate + width,
        }));
      }
    };

    return (
      <div className="App">
        <h1 className="App__header">
          {/* eslint-disable-next-line */}
          Carousel with {images.length} images
        </h1>

        <Carousel
          images={images}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          translate={translate}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
        />
        <div className="App__inputFields">
          <label htmlFor="step">
            Number of images scrolled per click
          </label>
          <input
            type="number"
            defaultValue={step}
            name="step"
            id="step"
            onChange={({ target }) => {
              this.setState({
                step: target.value,
              });
            }}
          />
          <label htmlFor="frameSize">
            Number of images displayed at the same time
          </label>
          <input
            type="number"
            defaultValue={frameSize}
            name="frameSize"
            id="frameSize"
            onChange={({ target }) => {
              this.setState({
                frameSize: target.value,
              });
            }}
          />
          <label htmlFor="itemWidth">
            Width of the one picture
          </label>
          <input
            type="number"
            defaultValue={itemWidth}
            name="itemWidth"
            id="itemWidth"
            onChange={({ target }) => {
              this.setState({
                itemWidth: target.value,
              });
            }}
          />
          <label htmlFor="animationDuration">
            Time in ms to show the new portion of images
          </label>
          <input
            type="number"
            defaultValue={animationDuration}
            name="animationDuration"
            id="animationDuration"
            onChange={({ target }) => {
              this.setState({
                animationDuration: target.value,
              });
            }}
          />
          <label htmlFor="infinite">
            To do the carousel cyclic
          </label>
          <input
            type="checkbox"
            name="infinite"
            id="infinite"
            defaultChecked={infinite && true}
            onChange={({ target }) => {
              this.setState({
                infinite: target.checked,
              });
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;
