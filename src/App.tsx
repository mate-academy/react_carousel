import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

type State = {
  images: string[];
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  step: number;
  infinite: boolean;
};

export class App extends React.Component<{}, State> {
  state: State = {
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
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    step: 3,
    infinite: false,
  };

  changeProp = (event: { target: { value: string; name: string; } }): void => {
    const targetName = event.target.name;
    const { value } = event.target;

    if (targetName === 'itemWidth') {
      this.setState({
        itemWidth: +value,
      });
    }

    if (targetName === 'animationDuration') {
      this.setState({
        animationDuration: +value,
      });
    }

    if (targetName === 'frameSize') {
      this.setState({
        frameSize: +value,
      });
    }

    if (targetName === 'step') {
      this.setState({
        itemWidth: +value,
      });
    }

    if (targetName === 'infinite') {
      if (this.state.infinite === false) {
        this.setState({
          infinite: true,
        });
      } else {
        this.setState({
          infinite: false,
        });
      }
    }
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
      step,
      infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 className="App__title">Carousel with {images.length} images</h1>

        <div
          className="App__carusel-wrapper"
          style={{ width: itemWidth * frameSize }}
        >
          <Carousel
            images={images}
            frameSize={frameSize}
            itemWidth={itemWidth}
            animationDuration={animationDuration}
            step={step}
            infinite={infinite}
          />
        </div>
        <form method="get" className="App__form">
          <span className="App__form-span">Item Width:</span>
          <input
            className="App__form-input"
            name="itemWidth"
            type="number"
            min={100}
            max={200}
            defaultValue={itemWidth}
            onChange={this.changeProp}
          />

          <span className="App__form-span">Frame Size:</span>
          <input
            className="App__form-input"
            name="frameSize"
            type="number"
            min={3}
            max={5}
            defaultValue={frameSize}
            onChange={this.changeProp}
          />

          <span className="App__form-span">Step:</span>
          <input
            className="App__form-input"
            name="syep"
            type="number"
            min={2}
            max={5}
            defaultValue={step}
            onChange={this.changeProp}
          />

          <span className="App__form-span">Animation Duration ms:</span>
          <input
            className="App__form-input"
            name="animationDuration"
            type="number"
            min={1000}
            max={5000}
            defaultValue={animationDuration}
            onChange={this.changeProp}
          />

          <span className="App__form-span">Infinity Animation</span>
          <input
            className="App__form-checkbox"
            name="infinite"
            type="checkbox"
            onChange={this.changeProp}
          />
        </form>
      </div>
    );
  }
}
