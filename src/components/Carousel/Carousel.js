import React, { Component } from 'react';
import './Carousel.scss';
import { CarouselTypes } from '../../constants/proptypes';

import Horse from '../Horse/Horse';
import Button from '../Button/Button';
import Form from '../Form/Form';

export default class Carousel extends Component {
  state = {
    horses: [...this.props.horses],
    step: this.props.step,
    frameSize: this.props.frameSize,
    itemWidth: this.props.itemWidth,
    animationDuration: this.props.animationDuration,
    infinite: this.props.infinite,
    carouselCursor: 0,
  };

  componentDidMount() {
    const { animationDuration } = this.state;

    this.carouselTurn = setInterval(
      this.nextHorses, animationDuration
    );
  }

  componentWillUnmount() {
    clearInterval(this.carouselTurn);
  }

  nextHorses = () => {
    const { horses, step, infinite } = this.state;

    this.setState((prevState) => {
      let nextStep = prevState.carouselCursor + step;

      if (infinite && nextStep === horses.length) {
        nextStep = 0;
      }

      if (horses.length - nextStep <= step) {
        nextStep = horses.length - step;
      }

      return ({ carouselCursor: nextStep });
    });
  };

  onPreviousClick = () => {
    const { horses, step, infinite } = this.state;

    this.componentWillUnmount();

    this.setState((prevState) => {
      let nextStep = prevState.carouselCursor - step;

      if (infinite && nextStep === -step) {
        nextStep = horses.length - step;
      }

      if (nextStep < 0) {
        nextStep = 0;
      }

      return (
        { carouselCursor: nextStep });
    });

    this.componentDidMount();
  };

  onNextClick = () => {
    this.componentWillUnmount();
    this.nextHorses();
    this.componentDidMount();
  };

  onInputChange = (e) => {
    const { target } = e;
    const { name, value, checked } = target;

    // eslint-disable-next-line no-console
    console.log(name);

    this.componentWillUnmount();

    if (name === 'infinite') {
      // eslint-disable-next-line no-console
      console.log(name);
      this.setState({
        [name]: checked,
      });
    } else {
      this.setState({
        [name]: Number(value),
      });
    }

    this.componentDidMount();
  };

  render() {
    const {
      horses, itemWidth, frameSize, carouselCursor,
    } = this.state;

    return (
      <div className="carousel" style={{ width: frameSize * itemWidth }}>
        <ul
          className="carousel__list"
          style={{ left: -(carouselCursor * itemWidth) }}
        >
          {horses.map((horse, i) => (
            <Horse key={horse} horse={horse} alt={i} itemSize={itemWidth} />
          ))}
        </ul>
        <div className="carousel__buttons">
          <Button text="Prev" onClick={this.onPreviousClick} />
          <Button text="Next" onClick={this.onNextClick} />
        </div>
        <Form onChange={this.onInputChange} />
      </div>
    );
  }
}

Carousel.propTypes = CarouselTypes;

Carousel.defaultProps = {
  step: 3,
  frameSize: 3,
  itemWidth: 130,
  animationDuration: 2000,
  infinite: true,
};
