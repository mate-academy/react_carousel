import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

interface StyleDefinition {
  [key: string]: string;
}

export const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 130,
  itemWidth = 130,
  animationDuration,
  infinite = false,
}) => {
  const safeFrameSize = Math.min(frameSize, images.length);

  const safeStep = Math.max(1, Math.min(step, images.length));

  const containerStyle: StyleDefinition = {
    width: `${safeFrameSize * itemWidth}px`,
    overflow: 'hidden',
  };

  let newArrImages: string[];

  if (infinite) {
    newArrImages = [
      ...images.slice(-safeFrameSize),
      ...images,
      ...images.slice(0, safeFrameSize),
    ];
  } else {
    newArrImages = images;
  }

  const [currentIndex, setCurrentIndex] = useState(
    infinite ? safeFrameSize : 0,
  );

  const [position, setPosition] = useState<StyleDefinition>({
    transform: `translateX(${-currentIndex * itemWidth}px)`,
    transition: `transform ${animationDuration}ms ease`,
  });

  if (!images || images.length === 0) {
    return <div className="Carousel__empty">No imagq to display</div>;
  }

  const nextDisabled =
    newArrImages.length <= frameSize ||
    currentIndex + safeFrameSize >= newArrImages.length ||
    currentIndex + safeStep >= newArrImages.length;

  const goNext = () => {
    const tentativeIndex = currentIndex + safeStep;

    // Если не infinite — ограничить максимальный индекс
    const maxIndex = infinite
      ? images.length + safeFrameSize
      : images.length - safeFrameSize;

    const newIndex = Math.min(tentativeIndex, maxIndex);

    setCurrentIndex(newIndex);
    setPosition({
      transform: `translateX(${-newIndex * itemWidth}px)`,
      transition: `transform ${animationDuration}ms ease`,
    });

    if (infinite && tentativeIndex >= images.length) {
      setTimeout(() => {
        const resetIndex = tentativeIndex - images.length;

        setCurrentIndex(resetIndex);
        setPosition({
          transform: `translateX(${-resetIndex * itemWidth}px)`,
          transition: 'none',
        });
      }, animationDuration);
    }
  };

  const goPrev = () => {
    const tentativeIndex = currentIndex - safeStep;

    const minIndex = infinite ? 0 : 0;

    const newIndex = Math.max(tentativeIndex, minIndex);

    setCurrentIndex(newIndex);
    setPosition({
      transform: `translateX(${-newIndex * itemWidth}px)`,
      transition: `transform ${animationDuration}ms ease`,
    });

    if (infinite && tentativeIndex < safeFrameSize) {
      setTimeout(() => {
        const resetIndex = tentativeIndex + images.length;

        setCurrentIndex(resetIndex);
        setPosition({
          transform: `translateX(${-resetIndex * itemWidth}px)`,
          transition: 'none',
        });
      }, animationDuration);
    }
  };

  return (
    <div className="Carousel">
      <button
        className="Carousel__button prev"
        onClick={goPrev}
        disabled={!infinite && currentIndex === 0}
      >
        {'<'}
      </button>
      <div className="Carousel__track" style={containerStyle}>
        <ul className="Carousel__items" style={position}>
          {newArrImages.map((img, i) => (
            <li key={i}>
              <img
                src={img}
                alt={`${i}`}
                width={itemWidth}
                style={{ width: `${itemWidth}px` }}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        data-cy="next"
        className="Carousel__button next"
        onClick={goNext}
        disabled={nextDisabled}
      >
        {'>'}
      </button>
    </div>
  );
};

// export default Carousel;
