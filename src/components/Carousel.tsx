import React, { useEffect, useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const maxIndex = 9 - frameSize + 1;

  useEffect(() => {
    if (currentImgIndex + frameSize > 9) {
      setCurrentImgIndex(maxIndex);
    }
  }, [frameSize, itemWidth]);

  useEffect(() => {
    if (currentImgIndex + step > 9) {
      setCurrentImgIndex(maxIndex);
    }
  }, [currentImgIndex]);

  function handleNext() {
    setCurrentImgIndex(prevImgIndex => prevImgIndex + step);

    if (infinite && currentImgIndex === maxIndex) {
      setCurrentImgIndex(0);
    } else if (currentImgIndex + step > 9
        || currentImgIndex + frameSize + step > 9) {
      setCurrentImgIndex(maxIndex);
    }
  }

  function handlePrev() {
    setCurrentImgIndex(prevImgIndex => prevImgIndex - step);

    if (infinite && currentImgIndex === 0) {
      setCurrentImgIndex(maxIndex);
    } else if (currentImgIndex - step < 0) {
      setCurrentImgIndex(0);
    }
  }

  return (
    <>
      <div className="Carousel" style={{ maxWidth: `${frameSize * itemWidth}px` }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${-(currentImgIndex * itemWidth)}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >

          {images.map((imageSrc, index) => (
            <li key={imageSrc}>
              <img
                src={imageSrc}
                alt={index.toString()}
                style={{ width: itemWidth }}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="buttons">
        <button
          type="button"
          onClick={handlePrev}
          disabled={!infinite && currentImgIndex === 0}
        >
          <i className="fas fa-angle-double-left" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={!infinite && currentImgIndex === maxIndex}
        >
          <i className="fas fa-angle-double-right" />
        </button>
      </div>
    </>
  );
};

export default Carousel;
