import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <label className="App__label" htmlFor="itemId">
          Write item width:
          <input
            name="itemWidth"
            type="number"
            id="itemId"
            placeholder="write here..."
            className="App__input App__input--itemWidth"
            onChange={e => {
              this.setState({ itemWidth: +e.target.value });
            }}
          />
        </label>
        <label className="App__label" htmlFor="frameId">
          Write frame size:
          <input
            type="number"
            id="frameId"
            placeholder="write here..."
            className="App__input App__input--frameSize"
            onChange={e => {
              this.setState({ frameSize: +e.target.value });
            }}
          />
        </label>
        <label className="App__label" htmlFor="stepId">
          Write step:
          <input
            type="number"
            id="stepId"
            placeholder="write here..."
            className="App__input App__input--step"
            onChange={e => {
              this.setState({ step: +e.target.value });
            }}
          />
        </label>
        <label className="App__label" htmlFor="durationId">
          Write animation duration:
          <input
            type="number"
            id="durationId"
            placeholder="write here..."
            className="App__input App__input--animationDuration"
            onChange={e => {
              this.setState({ animationDuration: +e.target.value });
            }}
          />
        </label>
        <select
          name="True or False"
          className="App__select"
          onChange={e => {
            if (e.target.value === 'false') {
              this.setState({ infinite: false });
            } else {
              this.setState({ infinite: true });
            }
          }}
        >
          <option value="false">False</option>
          <option value="true">True</option>
        </select>

        <Carousel
          images={this.state.images}
          step={this.state.step}
          frameSize={this.state.frameSize}
          itemWidth={this.state.itemWidth}
          animationDuration={this.state.animationDuration}
          infinite={this.state.infinite}
        />
      </div>
    );
  }
}

export default App;
