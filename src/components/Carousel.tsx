/* eslint-disable react/no-array-index-key */
import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  animationDuration: number;
  frameSize: number;
  itemWidth: number;
  moveLeft: number
};

class Carousel extends React.PureComponent<Props> {
  render() {
    const {
      images,
      animationDuration,
      frameSize,
      itemWidth,
      moveLeft,
    } = this.props;

    return (
      <ul
        className="Carousel__list"
        style={{
          display: 'flex',
          width: `${frameSize * (itemWidth + 10)}px`,
          overflow: 'hidden',
          transition: `all ${animationDuration}ms ease-out`,
        }}
      >
        {images.map((image, index) => (
          <li
            key={index}
            style={{ listStyleType: 'none' }}
          >
            <img
              className="Carousel__img"
              style={{
                width: `${itemWidth}px`,
                transform: `translateX(${moveLeft}px)`,
                transition: `all ${animationDuration}ms ease-out`,
              }}
              src={image}
              alt={image.slice(6, 7)}
            />
          </li>
        ))}
      </ul>
    );
  }
}

export default Carousel;
