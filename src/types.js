import PropTypes from 'prop-types';

export const imageStyleType = PropTypes.shape({
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
});

export const imageType = PropTypes.string;
