import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import './List.scss';

class List extends PureComponent {
  render() {
    const { itemWidth, images, position, animationDuration } = this.props;

    return (
      <ul
        style={{
          transform: `translateX(${position}px)`,
          transition: `transform ${animationDuration}ms`,
        }}
        className="carousel__list"
      >
        {images.map(image => (
          <Item
            key={image}
            itemWidth={itemWidth}
            imageSrc={image}
          />
        ))}
      </ul>
    );
  }
}

List.propTypes = {
  position: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  animationDuration: PropTypes.number.isRequired,
};

export default List;
