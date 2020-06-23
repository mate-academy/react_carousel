import React from 'react';
import { ShapeCarousel } from './Shapes';
import { CarouselImg } from './CarouselImg/CarouselImg';
import './Carousel.css';

const Carousel = props => (
  <div className="Carousel">
    <ul className="Carousel__list">
      <li className="images" style={{ marginLeft: `${props.margin}px` }}>
        <img
          key={props.images[0]}
          src={props.images[0]}
          alt="1"
        />
      </li>
      {props.images.slice(1, props.images.length - 1).map((image, index) => (
        <CarouselImg
          image={image}
          index={index}
          key={image}
          margin={props.margin}
        />
      ))}
    </ul>
    <div>
      <button
        className="left"
        type="button"
        onClick={ev => props.previous(ev)}
      >
        Prev
      </button>
      <button
        className="right"
        type="button"
        onClick={ev => props.previous(ev)}
      >
        Next
      </button>
    </div>
  </div>
);

Carousel.propTypes = ShapeCarousel.isRequired;
export default Carousel;
