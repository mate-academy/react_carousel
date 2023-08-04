import { useEffect, useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  frameSize: number,
  itemWidth: number,
  step: number,
  animationDuration: number,
  infinite: boolean,
};

const Carousel: React.FC<Props> = ({
  images,
  frameSize,
  itemWidth,
  step,
  animationDuration,
  infinite,
}) => {
  const [shift, setShift] = useState(0);

  useEffect(() => {
    setShift(0);
  }, [frameSize, itemWidth, step]);

  const widthPortion = itemWidth * frameSize;
  const widthCarousel = itemWidth * images.length;

  const handleOnClickBack = () => {
    setShift((currentShift) => {
      if (currentShift === 0 && infinite) {
        return -(widthCarousel - itemWidth * frameSize);
      }

      if (currentShift > -(itemWidth * step)) {
        return 0;
      }

      return currentShift + itemWidth * step;
    });
  };

  const handleOnClickForward = () => {
    setShift((currentShift) => {
      if (currentShift <= -(widthCarousel - widthPortion) && infinite) {
        return 0;
      }

      if (currentShift <= -(widthCarousel - widthPortion)
        + itemWidth * step) {
        return -(widthCarousel - widthPortion);
      }

      return currentShift - itemWidth * step;
    });
  };

  return (
    <div
      className="Carousel"
      style={{ width: widthPortion }}
    >
      <div
        className="Carousel__list"
        style={{
          width: `${widthCarousel}px`,
          transform: `translateX(${shift}px)`,
          transition: `transform ${animationDuration}ms`,
        }}
      >
        {images.map(image => (
          <img
            style={{ width: itemWidth }}
            key={image}
            src={image}
            alt="emoji"
          />
        ))}
      </div>

      <button
        onClick={() => handleOnClickBack()}
        className="Carousel__button"
        type="button"
        disabled={shift >= 0 && !infinite}
      >
        Prev
      </button>

      <button
        onClick={() => handleOnClickForward()}
        className="Carousel__button"
        data-cy="Next"
        type="button"
        disabled={shift <= -(widthCarousel - widthPortion) && !infinite}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
