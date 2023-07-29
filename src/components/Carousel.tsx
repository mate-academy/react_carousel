import React, { useEffect, useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
};

const Carousel: React.FC<Props> = ({ images }) => {
  const [itemWidth, setItemWidth] = useState('130');
  const [debauncedItemWidth, setDebauncedItemWidth] = useState(itemWidth);
  const [frameSize, setFrameSize] = useState('3');
  const [debauncedFrameSize, setDebauncedFrameSize] = useState(frameSize);
  const [step, setStep] = useState('3');
  const [animationDuration, setAnimationDuration] = useState('1000');
  const [offset, setOffset] = useState(0);

  const maxOffset = 100 - ((100 / images.length) * Number(frameSize));

  const isFirstImage = offset === 0;
  const isLastImage = offset === maxOffset;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebauncedItemWidth(itemWidth);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [itemWidth]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (offset > maxOffset) {
        setOffset(maxOffset);
      }

      setDebauncedFrameSize(frameSize);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [frameSize]);

  const offsetStep = (100 / images.length) * Number(step);

  const carouselListStyle = {
    transform: `translateX(-${offset}%)`,
    width: `${Number(debauncedItemWidth) * images.length}px`,
    transition: `transform ${animationDuration}ms`,
  };

  const handleNextClick = () => {
    setOffset(prevOffset => {
      return prevOffset + offsetStep > maxOffset
        ? maxOffset
        : prevOffset + offsetStep;
    });
  };

  const handlePrevClick = () => {
    setOffset(prevOffset => {
      return prevOffset - offsetStep < 0
        ? 0
        : prevOffset - offsetStep;
    });
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__list-wrapper"
        style={{ width: `${Number(debauncedItemWidth) * Number(debauncedFrameSize)}px` }}
      >
        <ul className="Carousel__list" style={carouselListStyle}>
          {images.map((image, index) => (
            <li key={image}>
              <img
                src={image}
                alt={String(index)}
                style={{ width: `${debauncedItemWidth}px` }}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        className="Carousel__button"
        type="button"
        onClick={handlePrevClick}
        disabled={isFirstImage}
      >
        Prev
      </button>

      <button
        className="Carousel__button"
        type="button"
        data-cy="next"
        onClick={handleNextClick}
        disabled={isLastImage}
      >
        Next
      </button>

      <ul className="Carousel__params">
        <li>
          <label htmlFor="itemID">Width of image: </label>

          <input
            id="itemID"
            type="text"
            value={itemWidth}
            onChange={(e) => setItemWidth(e.target.value)}
          />
        </li>

        <li>
          <label htmlFor="frameID">Size of frame: </label>

          <input
            id="frameID"
            type="text"
            value={frameSize}
            onChange={(e) => setFrameSize(e.target.value)}
          />
        </li>

        <li>
          <label htmlFor="stepID">Step of scroll: </label>

          <input
            id="stepID"
            type="text"
            value={step}
            onChange={(e) => setStep(e.target.value)}
          />
        </li>

        <li>
          <label htmlFor="animationDuration">
            Duration of animation (ms):
          </label>

          <input
            id="animationDuration"
            type="text"
            value={animationDuration}
            onChange={(e) => setAnimationDuration(e.target.value)}
          />
        </li>
      </ul>
    </div>
  );
};

export default Carousel;
