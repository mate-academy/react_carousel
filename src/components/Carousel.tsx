import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  frameSize: number;
  imageSize: number;
  step: number;
  animationDuration: number;
};

const Carousel: React.FC<Props> = ({
  images,
  frameSize,
  imageSize,
  step,
  animationDuration,
}) => {
  // const [currentImages, setCurrentImages] = useState(images);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide(prevSlide => Math.max(0, prevSlide - step));
  };

  const handleNext = () => {
    setCurrentSlide(prevSlide =>
      Math.min(images.length - frameSize, prevSlide + step),
    );

    // const lastSlide = images.length - frameSize;
    //
    // if (currentSlide === lastSlide && isInfinite) {
    //   setCurrentSlide(0);
    // }
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__container"
        style={{
          width: frameSize * imageSize,
        }}
      >
        <ul className="Carousel__list">
          {images.map((image, index) => (
            <li
              key={index}
              style={{
                transform: `translateX(-${currentSlide * imageSize}px)`,
                transition: `transform ${animationDuration}ms ease`,
              }}
            >
              <img src={`${image}`} alt="1" style={{ width: imageSize }} />
            </li>
          ))}
        </ul>
      </div>
      <button type="button" onClick={handlePrev}>
        Prev
      </button>
      <button type="button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
