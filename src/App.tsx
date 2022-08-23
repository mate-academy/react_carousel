/* eslint-disable default-case */
import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  step:string;
  frameSize:string;
  itemWidth:string;
  animationDuration:string;
  infinite:boolean;
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
    step: '3',
    frameSize: '3',
    itemWidth: '130',
    animationDuration: '1000',
    infinite: false,
  };

  handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    switch (event.currentTarget.id) {
      case 'step':
        this.setState({ step: event.currentTarget.value });
        break;
      case 'frameSize':
        this.setState({ frameSize: event.currentTarget.value });
        break;
      case 'itemWidth':
        this.setState({ itemWidth: event.currentTarget.value });
        break;
      case 'animationDuration':
        this.setState({ animationDuration: event.currentTarget.value });
        break;
      case 'infinite':
        this.setState({ infinite: event.currentTarget.checked });
        break;
    }
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
        {/* eslint-disable-next-line */}
        <h1 className="App__title" data-cy="title">Carousel with {images.length} images</h1>

        <div className="App__box">
          <label htmlFor="step">
            Step - number of images scrolled per click
          </label>
          <input
            className="App__input"
            type="number"
            id="step"
            value={step}
            min="1"
            max="10"
            onChange={this.handleChange}
          />

          <label htmlFor="frameSize">
            Frame size - number of images displayed at the same time
          </label>
          <input
            className="App__input"
            type="number"
            id="frameSize"
            value={frameSize}
            min="1"
            max="10"
            onChange={this.handleChange}
          />

          <label htmlFor="itemWidth">
            Item width - customize image width
          </label>
          <input
            className="App__input"
            type="number"
            id="itemWidth"
            value={itemWidth}
            min="130"
            max="200"
            step="10"
            onChange={this.handleChange}
          />

          <label htmlFor="animationDuration">
            Animation duration - time in ms to show the new portion
          </label>
          <input
            className="App__input"
            type="number"
            id="animationDuration"
            value={animationDuration}
            min="1000"
            max="3000"
            step="500"
            onChange={this.handleChange}
          />

          <label htmlFor="infinite">Infinite</label>
          <input
            className="App__input"
            type="checkbox"
            id="infinite"
            checked={infinite}
            onChange={this.handleChange}
          />
        </div>

        <Carousel
          images={images}
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
