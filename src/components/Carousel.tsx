import React from 'react';
import './Carousel.scss';
import classNames from 'classnames';

type Props = {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}: Props) => {
  const [imgStartIndex, setIndex] = React.useState(0);

  const maxIndex = images.length - frameSize;

  const handleNext = () => {
    setIndex(prev => {
      const next = prev + step;

      return infinite ? (next > maxIndex ? 0 : next) : Math.min(next, maxIndex);
    });
  };

  const handlePrev = () => {
    setIndex(prev => {
      const next = prev - step;

      return infinite ? (next < 0 ? maxIndex : next) : Math.max(next, 0);
    });
  };

  const isPrevDisabled = infinite ? false : imgStartIndex === 0;
  const isNextDisabled = infinite ? false : imgStartIndex >= maxIndex;

  return (
    <div className="Carousel" style={{ width: `${itemWidth * frameSize}px` }}>
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(-${imgStartIndex * itemWidth}px)`,
          transition: `transform ${animationDuration}ms`,
        }}
      >
        {images.map((image, index) => {
          return (
            <li key={index + 1} className="Carousel__list-item">
              <img src={image} alt={index.toString()} width={itemWidth} />
            </li>
          );
        })}
      </ul>

      <div className="Buttons">
        <button
          onClick={() => handlePrev()}
          type="button"
          className={classNames('Button Button--left', {
            'Button--disabled': isPrevDisabled,
          })}
          disabled={isPrevDisabled}
        ></button>
        <button
          onClick={() => handleNext()}
          type="button"
          className={classNames('Button Button--right', {
            'Button--disabled': isNextDisabled,
          })}
          disabled={isNextDisabled}
          data-cy="next"
        ></button>
      </div>
    </div>
  );
};

export default Carousel;
