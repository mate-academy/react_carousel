import React, { useState } from 'react';
import './Carousel.scss';
import { Image } from '../../types/image';
import { FormParams } from '../../types/formParams';

interface Props {
  images: Image[]
  visabilityParams: FormParams
}

export const Carousel: React.FC<Props> = ({ images, visabilityParams }) => {
  const [position, setPosition] = useState<number>(0);
  const {
    step, frameSize, itemWidth, animationDuration, infinite,
  } = visabilityParams;

  const onRight = () => {
    const maxPosition = -(images.length - frameSize);

    setPosition(prevPostion => (
      prevPostion - step > maxPosition ? prevPostion - step : maxPosition
    ));

    if (position === maxPosition && infinite) {
      setPosition(0);
    }
  };

  const onLeft = () => {
    const minPosition = 0;

    setPosition(prevPostion => (
      prevPostion + step < minPosition ? prevPostion + step : minPosition
    ));

    if (position === minPosition && infinite) {
      setPosition(-(images.length - frameSize));
    }
  };

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{
          width: `${itemWidth * frameSize}px`,
          transition: `${animationDuration}ms`,
        }}
      >
        {images.map(({ id, url }) => (
          <li
            key={id}
            style={{
              transform: `translateX(${position * itemWidth}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            <img
              src={url}
              alt={`${id}`}
              width={itemWidth}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          className="Carousel__button Carousel__button__left"
          type="button"
          onClick={onLeft}
          aria-label="Button left"
        />

        <button
          className="Carousel__button Carousel__button__right"
          type="button"
          onClick={onRight}
          aria-label="Button right"
        />

      </div>
    </div>
  );
};
