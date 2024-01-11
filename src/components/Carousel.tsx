import React, {
  useEffect,
  useState,
} from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth: number;
  step: number;
  frameSize: number;
  animationDuration: number;
  // infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  // infinite = false,
}) => {
  const [indexImage, setIndexImage] = useState<number>(0);

  const handlePrev = () => {
    return setIndexImage((currentImage) => {
      if (currentImage === 0) {
        return images.length - 1;
      }

      return (currentImage - step);
    });
  };

  const handleNext = () => {
    return setIndexImage((currentImage) => {
      if (currentImage === images.length - 1) {
        return 0;
      }

      return (currentImage + step);
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  });

  return (
    <div className="Carousel">
      <div
        className="Carousel__wrapper"
        style={{
          width: `${itemWidth * frameSize}px`,
          overflow: 'hidden',
          margin: '0 auto',
        }}
      >
        <ul
          className="Carousel__list"
        >
          {images.map((image, index) => (
            <li
              key={image}
              style={{
                transform: `translateX(-${indexImage * itemWidth}px)`,
                transition: `transform ${animationDuration}ms ease-in-out`,
              }}
            >
              <img
                src={image}
                alt={`${index}`}
                style={{
                  height: '130px',
                  width: '130px',
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__container-buttons">
        <button
          type="button"
          className="Carousel__button"
          onClick={handlePrev}
        >
          Prev
        </button>
        {indexImage}

        <button
          type="button"
          className="Carousel__button"
          onClick={handleNext}
          data-cy="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
