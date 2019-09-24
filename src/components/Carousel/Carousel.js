import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Carousel.scss';
import Horse from '../Horse/Horse';
import Button from '../Button/Button';
import Form from '../Form/Form';

export default class Carousel extends Component {
  state = {
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 2000,
    infinite: false,
    carouselCursor: 0,
  };

  componentDidMount() {
    this.setCarouselTimer();
  }

  componentWillUnmount() {
    clearInterval(this.carouselTurn);
  }

  setCarouselTimer = () => {
    this.carouselTurn = setInterval(
      this.nextHorses, this.state.animationDuration
    );
  };

  nextHorses = () => {
    const { step, infinite } = this.state;
    const { horses } = this.props;

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
    const { step, infinite } = this.state;
    const { horses } = this.props;

    clearInterval(this.carouselTurn);

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

    this.setCarouselTimer();
  };

  onNextClick = () => {
    clearInterval(this.carouselTurn);
    this.nextHorses();
    this.setCarouselTimer();
  };

  onInputChange = (e) => {
    const { target } = e;
    const {
      name,
      value,
      checked,
      type,
    } = target;

    clearInterval(this.carouselTurn);

    if (type === 'checkbox') {
      this.setState({
        [name]: checked,
      });
    } else {
      this.setState({
        [name]: Number(value),
      });
    }

    this.setCarouselTimer();
  };

  render() {
    const {
      itemWidth,
      frameSize,
      carouselCursor,
    } = this.state;

    const { horses } = this.props;

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

Carousel.propTypes = {
  horses: PropTypes.arrayOf(PropTypes.string).isRequired,
};
