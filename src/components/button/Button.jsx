import React from 'react';
import './Button.scss';
import PropTypes from 'prop-types';

export default class Button extends React.Component {
  render() {
    const { action, text } = this.props;

    return (

      <button
        type="button"
        className="carousel__button carousel__button--prev"
        onClick={ action }
      >
        { text }
      </button>
    );
  }
}

Button.propTypes = {
  action: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
}
