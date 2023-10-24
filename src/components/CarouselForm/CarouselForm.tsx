import React from 'react';
import './CarouselForm.scss';
import { Carousel } from '../Carousel';

type Props = {
  images: string[];
};

type State = {
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

export class CarouselForm extends React.Component<Props, State> {
  state: Readonly<State> = {
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  updateSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    const stateValue = (name === 'infinite')
      ? event.currentTarget.checked
      : +value;

    this.setState(previousState => ({
      ...previousState,
      [name]: stateValue,
    }));
  };

  render() {
    const { images } = this.props;
    const {
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <>
        <form className="inputForm">
          <label className="inputForm__label" htmlFor="step">
            Step (count):
          </label>
          <input
            id="step"
            name="step"
            className="inputForm__input"
            type="number"
            min="1"
            max={images.length}
            step="1"
            value={step}
            required
            onChange={this.updateSettings}
          />

          <label className="inputForm__label" htmlFor="frameSize">
            Frame size (count):
          </label>
          <input
            id="frameSize"
            name="frameSize"
            className="inputForm__input"
            type="number"
            min="1"
            step="1"
            max={images.length}
            value={frameSize}
            required
            onChange={this.updateSettings}
          />

          <label className="inputForm__label" htmlFor="itemWidth">
            Item width (px):
          </label>
          <input
            id="itemWidth"
            name="itemWidth"
            className="inputForm__input"
            type="number"
            min="50"
            max="200"
            step="10"
            value={itemWidth}
            required
            onChange={this.updateSettings}
          />

          <label className="inputForm__label" htmlFor="animationDuration">
            Animation duration (ms):
          </label>
          <input
            id="animationDuration"
            name="animationDuration"
            className="inputForm__input"
            type="number"
            min="0"
            max="5000"
            step="100"
            value={animationDuration}
            required
            onChange={this.updateSettings}
          />

          <label className="inputForm__label" htmlFor="infinite">
            Is infinite (y/n):
          </label>
          <input
            id="infinite"
            name="infinite"
            className="inputForm__input"
            type="checkbox"
            checked={infinite}
            onChange={this.updateSettings}
          />
        </form>

        <Carousel
          images={images}
          {...this.state}
        />
      </>
    );
  }
}
