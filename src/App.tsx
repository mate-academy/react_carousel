import { Component } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinity: boolean;
}

class App extends Component<{}, State> {
  state: Readonly<State> = {
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
    infinity: false,
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinity,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 className="App__title" data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinity={infinity}
        />

        <div className="App__btn">
          <label
            htmlFor="itemWidthId"
            className="App__label"
          >
            Item Width:
            <input
              name="itemWidthId"
              type="number"
              value={itemWidth}
              min={130}
              max={250}
              step={10}
              onChange={(event) => {
                this.setState({
                  itemWidth: +event.target.value,
                });
              }}
            />
          </label>

          <label
            htmlFor="frameSizeId"
            className="App__label"
          >
            Frame Size:
            <input
              name="frameSizeId"
              type="number"
              value={frameSize}
              min={1}
              max={images.length}
              step={1}
              onChange={(event) => {
                this.setState({
                  frameSize: +event.target.value,
                });
              }}
            />
          </label>

          <label
            htmlFor="stepId"
            className="App__label"
          >
            Step:
            <input
              name="stepId"
              type="number"
              value={step}
              min={1}
              max={images.length}
              step={1}
              onChange={(event) => {
                this.setState({
                  step: +event.target.value,
                });
              }}
            />
          </label>

          <label
            htmlFor="animationDurationId"
            className="App__label"
          >
            Animation Duration:
            <input
              name="animationDurationId"
              type="number"
              value={animationDuration}
              min={500}
              max={5000}
              step={500}
              style={{
                width: '70px',
              }}
              onChange={(event) => {
                this.setState({
                  animationDuration: +event.target.value,
                });
              }}
            />
          </label>

          <label
            htmlFor="infinity"
            className="App__label"
          >
            Infinity:
            <input
              name="infinity"
              type="checkbox"
              onChange={(event) => {
                this.setState({
                  infinity: event.target.checked,
                });
              }}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default App;
