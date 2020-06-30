import React from 'react';
import { CarouselTypes } from '../Shape/propTypes';
import './Carousel.css';
import { Buttons } from '../Buttons/Buttons';

export class Carousel extends React.PureComponent {
  render() {
    const {
      images,
      CarouselWidth,
      animation,
      next,
      prev,
      transform,
      itemWidth,
    } = this.props;

    const carouselListStyle = {
      transform: `translateX(-${transform}px)`,
      transition: `transform ${animation}ms`,
    };

    return (
      <div className="wrapper">
        <div className="Carousel" style={{ width: `${CarouselWidth}px` }}>
          <ul className="Carousel__list" style={carouselListStyle}>
            {images.map((image, imgIndex) => (
              <li className="Carousel__item">
                <img
                  src={image}
                  alt={imgIndex}
                  style={{ width: `${itemWidth}px` }}
                />
              </li>
            ))}
          </ul>

          <Buttons next={next} prev={prev} />
        </div>
      </div>
    );
  }
}

Carousel.propTypes = CarouselTypes;
