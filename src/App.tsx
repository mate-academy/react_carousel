import React, { ChangeEvent, KeyboardEvent } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
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

  changeFrameSize = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      frameSize: +event.target.value,
    });
  };

  changeFrameStep = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      step: +event.target.value,
    });
  };

  changeItemWidth = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      itemWidth: +event.target.value,
    });
  };

  changeAnimationDuration = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      animationDuration: +event.target.value,
    });
  };

  changeInfinite = () => {
    this.setState((prevState) => (
      { infinite: !prevState.infinite }
    ));
  };

  blockInput = (event: KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
  };

  render() {
    const { images } = this.state;

    return (
      <>
        <div className="App">
          <h1 data-cy="title">{`Carousel with ${images.length} images`}</h1>
          <Carousel
            images={images}
            step={this.state.step}
            frameSize={this.state.frameSize}
            itemWidth={this.state.itemWidth}
            animationDuration={this.state.animationDuration}
            infinite={this.state.infinite}
          />
        </div>

        <div className="settings">
          <h3>Carousel settings:</h3>
          <label>
            Item Width:
            <input
              type="number"
              min="1"
              max={`${images.length}`}
              value={this.state.frameSize}
              onInput={this.changeFrameSize}
              onKeyDown={this.blockInput}
            />
          </label>

          <label>
            Scrolling step:
            <input
              type="number"
              min="1"
              max={`${images.length}`}
              value={this.state.step}
              onInput={this.changeFrameStep}
              onKeyDown={this.blockInput}
            />
          </label>

          <label>
            Item width:
            <input
              type="number"
              min="50"
              max="250"
              step="10"
              value={this.state.itemWidth}
              onInput={this.changeItemWidth}
              onKeyDown={this.blockInput}
            />
          </label>

          <label>
            Animation duration(ms):
            <input
              type="number"
              min="0"
              max="5000"
              step="500"
              value={this.state.animationDuration}
              onInput={this.changeAnimationDuration}
              onKeyDown={this.blockInput}
            />
          </label>

          <label>
            Infinite scroll:
            <input
              type="checkbox"
              checked={this.state.infinite}
              onChange={this.changeInfinite}
            />
          </label>
        </div>
      </>
    );
  }
}

export default App;
