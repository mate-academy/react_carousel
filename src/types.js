import PropTypes from 'prop-types';

export const ImageStyleType = PropTypes.shape({
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
});

export const ImageType = PropTypes.string;

export const FuncType = PropTypes.func;
