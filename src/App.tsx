import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title">{`Carousel with ${images.length} images`}</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
        />

        <form className="App__remote">
          <label htmlFor="imageNumber">
            <input
              type="range"
              id="imageNumber"
              min="1"
              max={images.length}
              value={frameSize}
              onChange={(e) => this.setState({
                frameSize: +e.target.value,
              })}
            />
            Displayed images number
          </label>

          <label htmlFor="imageWidth">
            <input
              type="range"
              id="imageWidth"
              min="65"
              max="390"
              value={itemWidth}
              onChange={(e) => this.setState({
                itemWidth: +e.target.value,
              })}
            />
            Images width
          </label>

          <label htmlFor="scrollStep">
            <input
              type="range"
              id="scrollStep"
              min="1"
              max={images.length}
              value={step}
              onChange={(e) => this.setState({
                step: +e.target.value,
              })}
            />
            Scroll step
          </label>

          <label htmlFor="animationSpeed">
            <input
              type="range"
              id="animationSpeed"
              min="500"
              max="4000"
              step="500"
              value={animationDuration}
              onChange={(e) => this.setState({
                animationDuration: +e.target.value,
              })}
            />
            Animation duration
          </label>
        </form>
      </div>
    );
  }
}

export default App;
