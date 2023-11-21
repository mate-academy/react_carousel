import React from 'react';
import 'bulma';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animation: number;
  infinite: boolean;
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
    animation: 1000,
    infinite: false,
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animation,
      infinite,
    } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title" className="title">
          {`Customizable carousel with ${images.length} images`}
        </h1>

        <div
          className="App__customize"
          style={{ width: '360px' }}
        >
          <span className="App__customize--element content">
            <label htmlFor="widthField">Item Width:</label>
            <input
              id="widthField"
              type="number"
              value={itemWidth}
              onChange={(event) => {
                this.setState({ itemWidth: +event.target.value });
              }}
            />
          </span>

          <span className="App__customize--element content">
            <label htmlFor="frameSize">Frame Size:</label>
            <input
              id="frameSize"
              type="number"
              value={frameSize}
              onChange={(event) => {
                this.setState({ frameSize: +event.target.value });
              }}
            />
          </span>

          <span className="App__customize--element content">
            <label htmlFor="step">Step:</label>
            <input
              id="step"
              type="number"
              value={step}
              onChange={(event) => {
                this.setState({ step: +event.target.value });
              }}
            />
          </span>

          <span className="App__customize--element content">
            <label htmlFor="animation">Animation duration:</label>
            <input
              id="animation"
              type="number"
              value={animation}
              onChange={(event) => {
                this.setState({ animation: +event.target.value });
              }}
            />
          </span>

          <span className="App__customize--element content">
            <label htmlFor="infinite">Cycle:</label>
            <input
              id="infinite"
              type="checkbox"
              defaultChecked={false}
              onChange={() => {
                this.setState({ infinite: !infinite });
              }}
            />
          </span>
        </div>

        <Carousel
          items={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animation={animation}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
