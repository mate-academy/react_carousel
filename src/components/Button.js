import React from 'react';
import PropTypes from 'prop-types';

class Buttons extends React.PureComponent {
  render() {
    const { swipe } = this.props;

    return (
      <div className="container">
        <button
          type="button"
          className="button prev"
          onClick={() => swipe(1)}
        >
          Prev
        </button>
        <button
          type="button"
          className="button next"
          onClick={() => swipe(-1)}
        >
          Next
        </button>
      </div>
    );
  }
}

Buttons.propTypes = {
  swipe: PropTypes.func.isRequired,
};

export default Buttons;
