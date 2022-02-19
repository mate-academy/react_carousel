import React, { useState, useEffect } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
};

const Carousel: React.FC<Props> = ({ images }) => {
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [infiniteLoop, setInfiniteLoop] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  useEffect(() => {
    if (infiniteLoop) {
      if (currentIndex === frameSize || currentIndex === images.length) {
        setTransitionEnabled(true);
      }
    }
  }, [currentIndex, infiniteLoop, frameSize, images.length]);

  const infiniteLoopCheckHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfiniteLoop(e.target.checked);
    setCurrentIndex(prevState => prevState + step);
  };

  const next = () => {
    const maxIndex = (infiniteLoop) ? images.length + frameSize : images.length - frameSize;

    if (currentIndex + step > maxIndex) {
      setCurrentIndex(maxIndex);
    } else {
      setCurrentIndex(prevState => prevState + step);
    }
  };

  const prev = () => {
    if (infiniteLoop || currentIndex > 0) {
      if (currentIndex - step < 0) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(prevState => prevState - step);
      }
    }
  };

  const handleTransitionEnd = () => {
    if (infiniteLoop) {
      if (currentIndex === 0) {
        setTransitionEnabled(false);
        setCurrentIndex(images.length);
      } else if (currentIndex === images.length + frameSize) {
        setTransitionEnabled(false);
        setCurrentIndex(frameSize);
      }
    }
  };

  const renderExtraPrev = () => {
    const output = [];

    for (let index = 0; index < frameSize; index += 1) {
      output.push(images[images.length - 1 - index]);
    }

    output.reverse();

    return output;
  };

  const extraPrev = renderExtraPrev();

  const renderExtraNext = () => {
    const output = [];

    for (let index = 0; index < frameSize; index += 1) {
      output.push(images[index]);
    }

    return output;
  };

  const extraNext = renderExtraNext();

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <button
          type="button"
          className="button-arrow"
          disabled={currentIndex <= 0 && !infiniteLoop}
          onClick={prev}
        >
          &lt;
        </button>
        <div
          className="carousel-content-wrapper"
          style={{ width: `${frameSize * itemWidth}px` }}
        >
          <div
            className={`carousel-content item-count-${frameSize}`}
            style={{
              transform: `translateX(-${currentIndex * (100 / frameSize)}%)`,
              transition: !transitionEnabled ? 'none' : undefined,
            }}
            onTransitionEnd={() => handleTransitionEnd()}
          >
            {infiniteLoop && extraPrev.map(item => (
              <img
                key={`${item}`}
                src={`${item}`}
                alt="smiley"
              />
            ))}
            {images.map(image => (
              <img
                key={`${image}`}
                src={`${image}`}
                alt="smiley"
              />
            ))}
            {infiniteLoop && extraNext.map(item => (
              <img
                key={`${item}`}
                src={`${item}`}
                alt="smiley"
              />
            ))}
          </div>
        </div>
        <button
          type="button"
          className="button-arrow"
          disabled={currentIndex >= images.length - frameSize && !infiniteLoop}
          onClick={next}
        >
          &gt;
        </button>
      </div>
      <form className="form">
        <label
          className="label"
          htmlFor="step"
        >
          Step:
          {' '}
          <input
            type="number"
            className="input__number"
            id="step"
            name="step"
            min={1}
            max={frameSize}
            value={step}
            onChange={e => setStep(+e.target.value)}
          />
        </label>
        <label
          className="label"
          htmlFor="frameSize"
        >
          Frame Size:
          {' '}
          <input
            type="number"
            className="input__number"
            id="frameSize"
            name="frameSize"
            min={1}
            max={5}
            value={frameSize}
            onChange={e => setFrameSize(+e.target.value)}
          />
        </label>
        <label
          className="label"
          htmlFor="itemWidth"
        >
          Item Width:
          {' '}
          <input
            type="range"
            className="input__range"
            id="itemWidth"
            name="itemWidth"
            min={100}
            max={200}
            value={itemWidth}
            onChange={e => setItemWidth(+e.target.value)}
          />
        </label>
        <label htmlFor="infinite">
          Infinite:
          {' '}
          <input
            type="checkbox"
            className="input__checkbox"
            id="infinite"
            name="infinite"
            checked={infiniteLoop}
            // onChange={e => setInfiniteLoop(e.target.checked)}
            onChange={infiniteLoopCheckHandler}
          />
        </label>
      </form>
    </div>
  );
};

export default Carousel;
