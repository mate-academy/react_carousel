import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step:number,
  frameSize:number,
  itemWidth:number,
  animationDuration:number,
  infinite:boolean,
};

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [pointer, setPointer] = React.useState(0);
  const totalImages = images.length;
  const maxWidthOfWrapper = itemWidth * frameSize;

  React.useEffect(() => {
    setPointer(0);
  }, [frameSize, step]);

  const handlePrev = () => {
    setPointer(prevPointer => {
      const AbsPointer = Math.abs(prevPointer);

      if (AbsPointer < totalImages && AbsPointer > step) {
        return prevPointer + step;
      }

      return 0;
    });
  };

  const handleNext = () => {
    setPointer(prevPointer => {
      const AbsPointer = Math.abs(prevPointer) + 1;

      if (AbsPointer < totalImages - step - (frameSize - step)) {
        return prevPointer - step - (frameSize - step);
      }

      return -1 * images.length + step + (frameSize - step);
    });
  };

  return (
    <div className="Wrapper">
      <div
        className="Carousel Wrapper__Carousel"
        style={{ width: `${maxWidthOfWrapper}px` }}
      >
        <ul
          className="Carousel__list"
          style={
            {
              transform: `translateX(${itemWidth * pointer}px)`,
              transition: `transform ${animationDuration}ms ease`,
              animationIterationCount: `${infinite}`,
            }
          }
        >
          {images.map((image, index) => {
            return (
              <li
                key={`${image}`}
                className="Carousel__item"
              >
                <img
                  src={image}
                  alt={`${index + 1}`}
                  style={{ width: `${itemWidth}px` }}
                />
              </li>
            );
          })}
        </ul>

        <div className="Carousel__btn-wrapper">
          <button
            type="button"
            className={
              pointer !== 0
                ? 'Carousel__btn'
                : 'Carousel__btn Carousel__btn--disable'
            }
            onClick={handlePrev}
          >
            &larr;
          </button>
          <button
            data-cy="next"
            type="button"
            className={
              pointer !== -1 * images.length + step + (frameSize - step)
                ? 'Carousel__btn'
                : 'Carousel__btn Carousel__btn--disable'
            }
            onClick={handleNext}
          >
            &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
