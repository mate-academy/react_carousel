import React, { Component } from 'react';
import { Carousel } from '../Carousel/Carousel';
import './Form.scss';

type Props = {
  images: string[],
};

type State = {
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  infinite: boolean,
};

export class Form extends Component<Props, State> {
  state = {
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  };

  updateValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    const stateValue = name === 'infinite'
      ? event.currentTarget.checked
      : value;

    this.setState(prevState => ({
      ...prevState,
      [name]: stateValue,
    }));
  };

  render() {
    const { images } = this.props;
    const {
      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <>
        <form className="Form">
          <label className="Form__lable" htmlFor="itemWidth">
            Item width
          </label>
          <input
            id="itemWidth"
            type="number"
            name="itemWidth"
            className="Form__input"
            step="10"
            value={itemWidth}
            onChange={this.updateValues}
          />

          <label className="Form__lable" htmlFor="frameSize">
            Frame size
          </label>
          <input
            id="frameSize"
            type="number"
            name="frameSize"
            className="Form__input"
            min="1"
            max={images.length}
            value={frameSize}
            onChange={this.updateValues}
          />

          <label className="Form__lable" htmlFor="step">
            Step
          </label>
          <input
            id="step"
            type="number"
            name="step"
            className="Form__input"
            min="1"
            max={images.length}
            value={step}
            onChange={this.updateValues}
          />

          <label className="Form__lable" htmlFor="animationDuration">
            Animation duration
          </label>
          <input
            id="animationDuration"
            type="number"
            name="animationDuration"
            className="Form__input"
            step="500"
            value={animationDuration}
            onChange={this.updateValues}
          />

          <label className="Form__lable" htmlFor="infinite">
            <input
              id="infinite"
              type="checkbox"
              name="infinite"
              className="Form__input Form__checkbox"
              checked={infinite}
              onChange={this.updateValues}
            />

            Infinite
          </label>
        </form>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </>
    );
  }
}
