import React from 'react';
import PropType from 'prop-types';
import { Image } from '../Image/Image';
import styles from './CarouselList.module.css';
import { CarouselShape } from '../Shapes/carouselShapes';

export const CarouselList = (
  { animationDuration, amountToShift, images, itemWidth },
) => (
  <ul
    className={styles.list}
    style={{
      transition: `transform ${animationDuration}ms ease`,
      transform: `translateX(${amountToShift}px)`,
    }}
  >
    {images.map((image, index) => (
      <li>
        <Image
          key={image}
          image={image}
          imageWidth={itemWidth}
          alt={index + 1}
        />
      </li>
    ))}
  </ul>
);

CarouselList.propTypes = {
  ...CarouselShape,
  amountToShift: PropType.number.isRequired,
};
