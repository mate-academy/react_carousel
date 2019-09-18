import React, { Component } from 'react';
import './Horse.scss';
import { HorseTypes } from '../../constants/proptypes';

export default class Horse extends Component {
  state = {
    horse: this.props.horse,
    alt: this.props.alt,
    itemSize: this.props.itemSize,
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.itemSize !== this.state.itemSize) {
      this.setState({ itemSize: nextProps.itemSize });

      return true;
    }

    return false;
  }

  render() {
    const { horse, alt, itemSize } = this.state;

    return (
      <li>
        <img
          className="carousel__horse"
          src={horse}
          alt={alt}
          style={{
            width: itemSize,
            height: itemSize,
          }}
        />
      </li>
    );
  }
}

Horse.propTypes = HorseTypes;
