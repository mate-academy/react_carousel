import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}
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

class App extends React.Component<{}, State> {
  state = {
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  };

  handleChangeStep = (event:React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +event.target.value });
  };

  handleChangeFrameSize = (event:React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: +event.target.value });
  };

  handleChangeItemWidth = (event:React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +event.target.value });
  };

  handleChangeAnimation = (event:React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: +event.target.value });
  };

  handleChangeInfinity = () => {
    this.setState({ infinite: true });
  };

  render() {
    const {
      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title">
          {`Carousel with ${images.length} images`}
        </h1>
        <label htmlFor="stepId" className="App__input">
          Step:
          <input
            id="stepId"
            type="number"
            value={step}
            min="1"
            max="10"
            step="1"
            onChange={this.handleChangeStep}
          />
        </label>
        <label htmlFor="frameId" className="App__input">
          Frame size:
          <input
            id="frameId"
            type="number"
            value={frameSize}
            min="1"
            max="10"
            step="1"
            onChange={this.handleChangeFrameSize}
          />
        </label>
        <label htmlFor="itemId" className="App__input">
          Item width:
          <input
            id="itemId"
            type="number"
            value={itemWidth}
            min="130"
            max="2000"
            step="10"
            onChange={this.handleChangeItemWidth}
          />
        </label>
        <label className="App__input">
          Animation Duration:
          <input
            type="number"
            min="1000"
            max="2000"
            step="100"
            value={animationDuration}
            onChange={this.handleChangeAnimation}
          />
        </label>
        <label className="App__input">
          Infinity:
          <input
            type="checkbox"
            name="infinite"
            checked={infinite}
            onChange={(event) => {
              this.setState({
                infinite: event.target.checked,
              });
            }}
          />
        </label>
        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
