/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react';
import './Carousel.scss';

import type { State as CarouselProps } from '../../App';

export const Carousel: FC<CarouselProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  return (
    <div className="Carousel">
      <ul className="Carousel__list">
        {images.map((image, idx) => (
          <li>
            <img src={image} alt={String(idx + 1)} />
          </li>
        ))}
      </ul>

      <button type="button">Prev</button>
      <button type="button" data-cy="next">
        Next
      </button>
    </div>
  );
};

export default Carousel;
