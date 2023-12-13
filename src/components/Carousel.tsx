import React, { useEffect, useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step?: number,
  frameSize?: number,
  itemWidth?: number,
  animationDuration?: number,
  infinite?: boolean,
};

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const styleWidth = {
    width: `${itemWidth}px`,
  };

  useEffect(() => {
    const interval = infinite
      ? setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + step) % images.length);
      }, animationDuration)
      : undefined;

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [currentIndex, images.length, step, animationDuration, infinite]);

  const renderImage = () => {
    const visibleImages = images.slice(currentIndex, currentIndex + frameSize);

    return visibleImages.map((imgUrl, index) => (
      <li key={imgUrl} className="Carousel__list-img">
        <img
          src={imgUrl}
          alt={`${index + 1}`}
          className="image"
          style={styleWidth}
        />
      </li>
    ));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      return (prevIndex - step + images.length) % images.length;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + step) % images.length);
  };

  return (
    <div className="Carousel">
      <ul className="Carousel__list">
        {renderImage()}
      </ul>

      <button
        type="button"
        onClick={handlePrev}
      >
        Prev
      </button>
      <button
        data-cy="next"
        type="button"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
