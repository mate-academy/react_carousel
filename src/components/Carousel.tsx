import { useEffect, useState } from 'react';
import './Carousel.scss';
// import cn from 'classnames';

interface A {
  images: string[],
  itemWidth: number,
  getWidth: (value: number) => void;
  getFrame: (value: number) => void;
  getStep: (value: number) => void;
  getAnimationDuration:(value: number) => void;
  makeInfinite: (value: boolean) => void;
  step: number,
  frameSize: number,
  animationDuration: number,
  infinite: boolean,
}

const getIndex = (index: number) => {
  const result = index + 1;

  return result.toString();
};

const Carousel = (
  {
    images,
    itemWidth,
    getWidth,
    getFrame,
    getStep,
    getAnimationDuration,
    makeInfinite,
    step,
    frameSize,
    animationDuration,
    infinite,
  }:A,
) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const dis = (images.length - frameSize) * itemWidth === scrollPosition;

  const scrolLeft = () => {
    const width = itemWidth * step;
    let newPosition = scrollPosition - width;

    if (newPosition < 0) {
      if (infinite) {
        newPosition = (images.length - frameSize) * itemWidth;
      } else {
        newPosition = 0;
      }
    }

    setScrollPosition(newPosition);
  };

  const scrolRight = () => {
    const width = itemWidth * step;
    let newPosition = scrollPosition + width;

    if (newPosition > (images.length - frameSize) * itemWidth) {
      if (infinite) {
        newPosition = 0;
      } else {
        newPosition = (images.length - frameSize) * itemWidth;
      }
    }

    setScrollPosition(newPosition);
  };

  useEffect(() => {
    const carusel = document.querySelector('.Carousel') as HTMLElement;
    const items = document.querySelectorAll('img');
    const element = document.querySelector('.Carousel__list') as HTMLElement;

    items.forEach((item) => {
      const result = item;

      result.style.width = `${itemWidth}px`;
    });

    element.style.transform = `translate(-${scrollPosition}px)`;
    element.style.transitionDuration = `${animationDuration}ms`;

    carusel.style.width = `${frameSize * itemWidth}px`;
  }, [itemWidth, scrollPosition, frameSize, step,
    animationDuration, infinite]);

  return (
    <>
      <div className="Carousel">
        <ul className="Carousel__list">
          {images.map((image, index) => (
            <li key={image}>
              <img
                src={image}
                alt={getIndex(index)}
              />
            </li>
          ))}
        </ul>
        <div className="Carousel__buttons">
          <button
            type="button"
            onClick={scrolLeft}
            disabled={scrollPosition === 0 && !infinite}
          >
            ← Prew
          </button>
          <button
            type="button"
            onClick={scrolRight}
            disabled={dis && !infinite}
          >
            Next →
          </button>
        </div>
      </div>
      <div className="Carousel-inputs">
        <label
          htmlFor="width"
        >
          Item width:
        </label>
        <input
          type="text"
          id="width"
          value={itemWidth}
          onChange={(event) => getWidth(+event.target.value)}
        />
        <label
          htmlFor="frameSize"
        >
          Frame size:
        </label>
        <input
          id="frameSize"
          type="text"
          value={frameSize}
          onChange={(event) => getFrame(+event.target.value)}
        />
        <label
          htmlFor="step"
        >
          Step:
        </label>
        <input
          id="step"
          type="text"
          value={step}
          onChange={(event) => getStep(+event.target.value)}
        />
        <label
          htmlFor="animationduration"
        >
          Animation duration:
        </label>
        <input
          type="text"
          id="animationduration"
          value={animationDuration}
          onChange={(event) => {
            getAnimationDuration(+event.currentTarget.value);
          }}
        />
        <label htmlFor="infinite">
          Infinite:
        </label>
        <input
          id="infinite"
          type="checkbox"
          // value={infinite}
          onChange={() => {
            makeInfinite(!infinite);
          }}
        />
      </div>
    </>
  );
};

export default Carousel;
