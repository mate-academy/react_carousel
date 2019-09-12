import React, { Component } from 'react';
import './Carousel.scss';
import { CarouselTypes } from '../../constants/proptypes';

import Horse from '../Horse/Horse';
import Button from '../Button/Button';

export default class Carousel extends Component {
  state = {
    horses: [...this.props.horses],
    frameSize: this.props.frameSize,
    animationDuration: this.props.animationDuration,
  };

  componentDidMount() {
    const { frameSize, animationDuration } = this.state;

    this.carouselTurn = setInterval(
      () => this.setState(prevState => (
        {
          horses:
            [
              ...prevState.horses.slice(frameSize),
              ...prevState.horses.slice(0, frameSize),
            ],
        })), animationDuration
    );
  }

  componentWillUnmount() {
    clearInterval(this.carouselTurn);
  }

  onPreviousClick = () => {
    const { frameSize } = this.state;

    this.componentWillUnmount();
    this.setState(prevState => (
      {
        horses:
          [
            ...prevState.horses.slice(-frameSize),
            ...prevState.horses.slice(0, -frameSize),
          ],
      }));
    this.componentDidMount();
  };

  onNextClick = () => {
    const { frameSize } = this.state;

    this.componentWillUnmount();
    this.setState(prevState => (
      {
        horses:
          [
            ...prevState.horses.slice(frameSize),
            ...prevState.horses.slice(0, frameSize),
          ],
      }));
    this.componentDidMount();
  };

  render() {
    const { horses } = this.state;

    return (
      <div className="carousel">
        <ul className="carousel__list">
          {horses.map((horse, i) => <Horse horse={horse} alt={i} />)}
        </ul>
        <div className="carousel__buttons">
          <Button text="Prev" onClick={this.onPreviousClick} />
          <Button text="Next" onClick={this.onNextClick} />
        </div>
      </div>
    );
  }
}

Carousel.propTypes = CarouselTypes;

Carousel.defaultProps = {
  frameSize: 2,
  itemWidth: 130,
  animationDuration: 1000,
};
