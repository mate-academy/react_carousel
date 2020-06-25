import React from 'react';
import PropType from 'prop-types';
import { CarouselList } from '../CarouselList/CarouselList';
import styles from './CarouselTrack.module.css';
import { CarouselDefaults, CarouselShape } from '../Shapes/carouselShapes';

export const CarouselTrack = (
  { itemWidth, frameSize, images, amountToShift, animationDuration, infinite },
) => (
  <div
    className={styles.track}
    style={{
      width: `${itemWidth * frameSize}px`,
    }}
  >
    <CarouselList
      images={images}
      imageWidth={itemWidth}
      amountToShift={amountToShift}
      animationDuration={animationDuration}
      infinite={infinite}
    />
  </div>

);

CarouselTrack.defaultProps = CarouselDefaults;

CarouselTrack.propTypes = {
  ...CarouselShape,
  amountToShift: PropType.number.isRequired,
};
