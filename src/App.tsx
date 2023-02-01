import React from 'react';
import './App.scss';
import { imagesFromServ } from './ImagesList';
import { Carousel } from './components/Carousel';

interface Image {
  id: number;
  path: string;
}

type State = {
  images: Image[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

export class App extends React.Component <{}, State> {
  state = {
    images: imagesFromServ,
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  setItemWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +event.currentTarget.value });
  };

  setFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: +event.currentTarget.value });
  };

  setStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +event.currentTarget.value });
  };

  setAnmationDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: +event.currentTarget.value });
  };

  setInfinite = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ infinite: event.currentTarget.checked });
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
          className="title"
          data-cy="title"
        >
          Carousel with
          {` ${images.length} `}
          images
        </h1>
        <form className="form">
          <label htmlFor="item-width">Item width</label>
          <input
            type="number"
            name="Item width"
            id="item-width"
            className="form-input"
            defaultValue={itemWidth}
            onChange={this.setItemWidth}
          />
          <label htmlFor="fram-size">Fram size</label>
          <input
            type="number"
            name="Fram size"
            id="fram-size"
            className="form-input"
            defaultValue={frameSize}
            min="1"
            max={images.length}
            onChange={this.setFrameSize}
          />
          <label htmlFor="step">Step</label>
          <input
            type="number"
            name="Step"
            id="step"
            className="form-input"
            defaultValue={step}
            onChange={this.setStep}
          />
          <label htmlFor="animation-duration">Animation duration</label>
          <input
            type="number"
            name="Animation duration"
            id="animation-duration"
            className="form-input"
            defaultValue={animationDuration}
            max="5000"
            onChange={this.setAnmationDuration}
          />
          <label htmlFor="infinite">Infinite</label>
          <input
            type="checkbox"
            name="Infinite"
            id="infinite"
            className="checkbox-field"
            onChange={this.setInfinite}
          />
        </form>
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
