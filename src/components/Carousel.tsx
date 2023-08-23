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
        className="carousel__list"
        style={{
          width: `${frameSize * (itemWidth + 10)}px`,
          transition: `all ${animationDuration}ms ease-out`,
        }}
      >
        {images.map((image, index) => (
          <li
            className="carousel__element"
            key={image}
          >
            <img
              className="carousel__img"
              style={{
                width: `${itemWidth}px`,
                transform: `translateX(${moveLeft}px)`,
                transition: `all ${animationDuration}ms ease-out`,
              }}
              src={image}
              alt={`icon-${index}`}
            />
          </li>
        ))}
      </ul>
    );
  }
}

export default Carousel;
