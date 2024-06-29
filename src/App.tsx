import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
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
    animationDuration: 1000,
    infinite: false,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState({ [name]: +value } as unknown as Pick<State, keyof State>);
  };

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title" className="App__title">
          Carousel with {images.length} images
        </h1>

        <Carousel
          images={this.state.images}
          itemWidth={this.state.itemWidth}
          frameSize={this.state.frameSize}
          step={this.state.step}
          animationDuration={this.state.animationDuration}
          infinite={this.state.infinite}
        />

        <form className="App__form">
          <div className="App__form__group">
            <label htmlFor="itemId">Item width:</label>
            <input
              type="number"
              id="itemId"
              name="itemWidth"
              value={this.state.itemWidth}
              onChange={event => this.handleChange(event)}
            />
          </div>
          <div className="App__form__group">
            <label htmlFor="frameId">Frame size:</label>
            <input
              type="number"
              id="frameId"
              name="frameSize"
              value={this.state.frameSize}
              onChange={event => this.handleChange(event)}
            />
          </div>
          <div className="App__form__group">
            <label htmlFor="stepId">Step:</label>
            <input
              type="number"
              id="stepId"
              name="step"
              step={1}
              value={this.state.step}
              onChange={event => this.handleChange(event)}
            />
          </div>
          <div className="App__form__group">
            <label htmlFor="animationDuration">Animation duration:</label>
            <input
              type="number"
              id="animationDuration"
              name="animationDuration"
              value={this.state.animationDuration}
              onChange={event => this.handleChange(event)}
            />
          </div>
          <div className="App__form__group">
            <label htmlFor="infinite">Infinite:</label>
            <input
              type="checkbox"
              id="infinite"
              name="infinite"
              checked={this.state.infinite}
              onChange={() => this.setState({ infinite: !this.state.infinite })}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default App;
