import React, { Component } from 'react';
import './Horse.scss';
import { HorseTypes } from '../../constants/proptypes';

export default class Horse extends Component {
  state = {
    horse: this.props.horse,
    alt: this.props.alt,
    itemWidth: this.props.itemWidth,
  };

  render() {
    const {
      horse, alt, itemWidth,
    } = this.state;

    return (
      <li>
        <img
          className="carousel__horse"
          src={horse}
          alt={alt}
          style={{
            width: itemWidth,
            height: itemWidth,
          }}
        />
      </li>
    );
  }
}

Horse.propTypes = HorseTypes;
