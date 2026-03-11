import React from 'react';
import './Carousel.scss';
import classNames from 'classnames';

type Props = {
  imagesSrc: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel = ({
  imagesSrc,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = true,
}: Props) => {
  const [imgStartIndex, setIndex] = React.useState(0);

  const maxIndex = imagesSrc.length - frameSize;

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

  const isPrevDisabled = imgStartIndex === 0;
  const isNextDisabled = imgStartIndex >= maxIndex;

  return (
    <div className="Carousel" style={{ width: `${itemWidth * frameSize}px` }}>
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(-${imgStartIndex * itemWidth}px)`,
          transition: `transform ${animationDuration}ms`,
        }}
      >
        {imagesSrc.map((image, index) => {
          const isHidden =
            index < imgStartIndex || index >= imgStartIndex + frameSize;

          return (
            <li
              key={index + 1}
              className="Carousel__list-item"
              style={{ display: isHidden ? 'none' : 'block' }}
            >
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
