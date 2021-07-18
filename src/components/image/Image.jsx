import React from 'react';
import PropTypes from 'prop-types';
import './image.scss';

export default class Image extends React.Component {
  render() {
    const { src, style } = this.props;

    return (
      <img
        src={src}
        alt="smile here"
        className="carousel__images"
        style={style}
      />
    );
  }
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  style: PropTypes.shape({
    height: PropTypes.string.isRequired
  }).isRequired
}
