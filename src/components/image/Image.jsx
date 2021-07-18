import React from 'react';
import PropTypes from 'prop-types';
import './image.scss';

export default class Image extends React.Component {
  render() {
    const { src, key, style } = this.props;

    return (
      <img
        key={key}
        src={src}
        alt="smile here"
        className="carousel__images"
        style={style}
      />
    );
  }
}

Image.propTypes = {
  key: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  style: PropTypes.shape({
    height: PropTypes.string.isRequired
  }).isRequired
}
