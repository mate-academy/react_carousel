import React from 'react';
import './Carousel.scss';

type Props = {
  imagesList: string[];
  frameSize: number;
  itemWidth: number;
  animationDuration: number,
  offset: number,
};

const Carousel: React.FC<Props> = (props) => (
  <div
    className="Carousel"
    style={{
      width: props.frameSize * props.itemWidth,
    }}
  >
    <ul className="Carousel__list" style={{ transform: `translateX(${props.offset}px)`, transition: `${props.animationDuration}ms` }}>
      {props.imagesList.map((item, index) => (
        <>
          <li>
            <img
              src={item}
              alt={index.toString()}
              className="Carousel__item"
              style={{ width: props.itemWidth }}
            />
          </li>
        </>
      ))}
    </ul>
  </div>
);

export default Carousel;
