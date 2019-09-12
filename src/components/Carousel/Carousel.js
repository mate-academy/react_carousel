import React, { Component } from 'react';
import './Carousel.scss';
import { CarouselTypes } from '../../constants/proptypes';
import Horse from '../Horse/Horse';

export default class Carousel extends Component {
  state = {
    horses: [...this.props.horses],
    animationDuration: 1000,
  };

  componentDidMount() {
    const { animationDuration } = this.state;

    this.carouselTurn = setInterval(
      () => this.setState(prevState => (
        {
          horses:
            [...prevState.horses.slice(2), ...prevState.horses.slice(0, 2)],
        })), animationDuration
    );
  }

  componentWillUnmount() {
    clearInterval(this.carouselTurn.close);
  }

  render() {
    const { horses } = this.state;

    return (
      <div className="carousel">
        <h1>
          {`Carousel with ${horses.length} images`}
        </h1>

        <ul className="carousel__list">
          {horses.map((horse, i) => <Horse horse={horse} alt={i} />)}
        </ul>

        <button type="button">Prev</button>
        <button type="button">Next</button>
      </div>
    );
  }
}

Carousel.propTypes = CarouselTypes;
