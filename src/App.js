/* eslint-disable max-len */
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
    step: 2,
    frameSize: 3,
    itemWidth: 100,
    animationDuration: 1000,
  };

  // eslint-disable-next-line class-methods-use-this
  generateArray(arrayOfImages) {
    const { length } = arrayOfImages;
    const firstPartIMGArray = arrayOfImages.slice(0, length / 2);
    const secondPartIMGArray = arrayOfImages.slice(length / 2);

    const array = secondPartIMGArray.concat(arrayOfImages);

    return array.concat(firstPartIMGArray);
  }

  render() {
    const
      { images,
        step,
        frameSize,
        itemWidth,
        animationDuration } = this.state;

    const newIMGarray = this.generateArray(images);

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>Carousel with {images.length} images</h1>
        <div className="Labels">
          <label>
            Enter step:
            {' '}
            <input
              type="number"
              value={step}
              onChange={(event) => {
                const valueSet = (event.target.value > 2 || event.target.value <= 0)
                  ? 2 : event.target.value;

                this.setState({ step: Number(valueSet) });
              }}
            />
          </label>
          <label>
            Enter frame size:
            {' '}
            <input
              type="number"
              value={frameSize}
              onChange={(event) => {
                const valueSet = (event.target.value > 5 || event.target.value <= 0)
                  ? 5 : event.target.value;

                this.setState({ frameSize: Number(valueSet) });
              }}
            />
          </label>
          <label>
            Enter frame width:
            {' '}
            <input
              type="number"
              value={itemWidth}
              onChange={(event) => {
                const valueSet = (event.target.value > 200 || event.target.value < 50)
                  ? 130 : event.target.value;

                this.setState({ itemWidth: Number(valueSet) });
              }}
              step="50"
            />
          </label>
          <label>
            Animation in ms:
            {' '}
            <input
              type="number"
              value={animationDuration}
              onChange={(event) => {
                const valueSet = (event.target.value < 200)
                  ? 1000 : event.target.value;

                this.setState({ animationDuration: Number(valueSet) });
              }}
              step="100"
            />
          </label>
        </div>

        <Carousel
          images={newIMGarray}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
        />
      </div>
    );
  }
}

export default App;
