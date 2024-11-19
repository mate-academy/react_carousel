import React, { useRef, useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const getAlt = (str: string) => {
  const arr = str.split('/');
  const last = arr[arr.length - 1];

  return last.split('.png')[0];
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [visibleImages, setVisibleImages] = useState(images);
  const [curStep, setCurStep] = useState(step);
  const [curFrameSize, setCurFrameSize] = useState(frameSize);
  const [curItemWidth, setCurItemWidth] = useState(itemWidth);
  const [curAnimationDuration, setCurAnimationDuration] =
    useState(animationDuration);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    const numberValue = +value;

    switch (name) {
      case 'step': {
        setCurStep(numberValue);
        break;
      }

      case 'frameSize': {
        setCurFrameSize(numberValue);
        break;
      }

      case 'itemWidth': {
        setCurItemWidth(numberValue);
        break;
      }

      case 'animationDuration': {
        setCurAnimationDuration(numberValue);
        break;
      }

      default:
    }
  };

  const duplicateImagesAfter = () => {
    setVisibleImages([...visibleImages, ...images]);
  };

  const duplicateImagesBefore = () => {
    setVisibleImages([...images, ...visibleImages]);
  };

  const carouselRef = useRef<HTMLUListElement>(null);

  const handleMove = (left: boolean) => {
    const carousel = carouselRef.current as HTMLUListElement;

    if (!carousel) {
      return;
    }

    const direction = left ? 1 : -1;

    const targetScrollLeft =
      carousel.scrollLeft + direction * curItemWidth * curStep;

    const totalFrames = 60;
    const intervalDuration = curAnimationDuration / totalFrames;
    const distancePerFrame =
      (targetScrollLeft - carousel.scrollLeft) / totalFrames;

    let frame = 0;

    const interval = setInterval(() => {
      frame++;
      carousel.scrollLeft += distancePerFrame;

      if (frame >= totalFrames) {
        clearInterval(interval);
      }
    }, intervalDuration);

    const nextScroll = targetScrollLeft + direction * curItemWidth * curStep;

    if (infinite) {
      if (nextScroll > carousel.scrollWidth) {
        duplicateImagesAfter();
      }

      if (nextScroll < 0) {
        duplicateImagesBefore();
      }
    }
  };

  const handleNext = () => {
    handleMove(true);
  };

  const handlePrev = () => {
    handleMove(false);
  };

  return (
    <>
      <div className="Carousel">
        <button
          type="button"
          className="Carousel__button"
          onClick={handlePrev}
          style={{
            width: curItemWidth,
            height: curItemWidth,
            borderRadius: curItemWidth,
          }}
        >
          {`\u2190`}
        </button>
        <ul
          className="Carousel__list"
          ref={carouselRef}
          style={{
            width: curFrameSize * curItemWidth,
          }}
        >
          {visibleImages.map(img => (
            <li key={getAlt(img)}>
              <img
                src={img}
                alt={getAlt(img)}
                style={{
                  width: curItemWidth,
                }}
                width={curItemWidth}
              />
            </li>
          ))}
        </ul>

        <button
          type="button"
          data-cy="next"
          className="Carousel__button"
          onClick={handleNext}
          style={{
            width: curItemWidth,
            height: curItemWidth,
            borderRadius: curItemWidth,
          }}
        >
          {`\u2192`}
        </button>
      </div>

      <div>
        <label htmlFor="itemId">Item width:</label>
        <input
          id="itemId"
          name="itemWidth"
          type="number"
          className="App__input"
          onChange={handleChange}
          min={1}
        />
      </div>

      <div>
        <label htmlFor="frameId">Frame size:</label>
        <input
          id="frameId"
          name="frameSize"
          type="number"
          className="App__input"
          onChange={handleChange}
          min={1}
          max={images.length}
        />
      </div>

      <div>
        <label htmlFor="stepId">Step:</label>
        <input
          id="stepId"
          name="step"
          type="number"
          className="App__input"
          onChange={handleChange}
          min={1}
          max={images.length}
        />
      </div>

      <div>
        <label htmlFor="animationId">Animation duration:</label>
        <input
          id="animationId"
          name="animationDuration"
          type="number"
          className="App__input"
          onChange={handleChange}
          min={0}
        />
      </div>
    </>
  );
};

export default Carousel;
