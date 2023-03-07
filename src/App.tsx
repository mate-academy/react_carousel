import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

export interface State {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
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
    infinite: false,
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        <h1
          style={{ textAlign: 'center' }}
        >
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <form
          action="post"
          className="App__Form"
          style={{ width: '390px' }}
        >
          <label className="App__Form-input">
            Item Width
            <input
              type="number"
              value={itemWidth}
              onChange={(event) => {
                this.setState({
                  itemWidth: +(event.currentTarget.value),
                });
              }}
            />
          </label>
          <label className="App__Form-input">
            Frame Size
            <input
              type="number"
              value={frameSize}
              onChange={(event) => {
                this.setState({
                  frameSize: +(event.currentTarget.value),
                });
              }}
            />
          </label>
          <label className="App__Form-input">
            Step
            <input
              type="number"
              value={step}
              onChange={(event) => {
                this.setState({
                  step: +(event.currentTarget.value),
                });
              }}
            />
          </label>
          <label className="App__Form-input">
            Animation Duration
            <input
              type="number"
              value={animationDuration}
              onChange={(event) => {
                this.setState({
                  animationDuration: +(event.currentTarget.value),
                });
              }}
            />
          </label>
          <label className="App__Form-input">
            Infinite
            <input
              type="checkbox"
              onChange={() => {
                this.setState({ infinite: !infinite });
              }}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default App;
