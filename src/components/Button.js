import React from 'react';
import PropTypes from 'prop-types';

class Buttons extends React.PureComponent {
  render() {
    const { prev, next } = this.props;

    return (
      <div className="container">
        <button
          type="button"
          className="button prev"
          onClick={prev}
        >
          Prev
        </button>
        <button
          type="button"
          className="button next"
          onClick={next}
        >
          Next
        </button>
      </div>
    );
  }
}

Buttons.propTypes = {
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};

export default Buttons;
