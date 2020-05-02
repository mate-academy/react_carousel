import React from 'react';
import PropTypes from 'prop-types';

const ImageItem = ({
  images, currIndex, frameSize, itemWidth, animationDuration,
}) => {
  let liStyle = {
    right: `${currIndex * itemWidth}px`,
  };

  const animationClass = {
    animationDuration: `${animationDuration}ms`,
    animationName: `appearance`,
  };

  const image = images.map((imageSrc, imageIndex) => {
    if ((imageIndex >= currIndex) && (imageIndex < (currIndex + frameSize))) {
      liStyle = {
        ...liStyle,
        ...animationClass,
      };
    } else {
      liStyle = {
        right: `${currIndex * itemWidth}px`,
      };
    }

    return (
      <li style={liStyle} key={imageSrc}>
        <img
          width={itemWidth}
          src={imageSrc}
          alt={imageIndex}
        />
      </li>
    );
  });

  return image;
};

ImageItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  currIndex: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
};

export default ImageItem;
