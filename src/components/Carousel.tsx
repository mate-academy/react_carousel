import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
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
  const [currentIndex, setCurrentIndex] = useState(infinite ? frameSize : 0);
  const gap = 20;
  const listRef = useRef<HTMLUListElement | null>(null);
  const caruselWidth = itemWidth * frameSize + (frameSize - 1) * gap;
  const imagesPrep = infinite
    ? [...images.slice(-frameSize), ...images, ...images.slice(0, frameSize)]
    : [...images];
  const length = imagesPrep.length;

  useEffect(() => {
    setCurrentIndex(infinite ? frameSize : 0);
  }, [frameSize, infinite]);

  function animateJump(prevIndex: number, newIndex: number) {
    const list = listRef.current;

    if (!list) {
      return;
    }

    list.style.transition = `transform ${animationDuration}ms linear`;
    list.style.transform = `translateX(-${prevIndex * (itemWidth + gap)}px)`;

    setTimeout(() => {
      list.style.transition = 'none';
      list.style.transform = `translateX(-${newIndex * (itemWidth + gap)}px)`;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setCurrentIndex(newIndex);
        });
      });
    }, animationDuration);
  }

  function moveRight() {
    const nextIndex = currentIndex + step;

    if (infinite && nextIndex >= length - frameSize * 2) {
      const jumpIndex = nextIndex - (length - frameSize * 2);

      animateJump(nextIndex, jumpIndex);
    } else {
      setCurrentIndex(nextIndex);
    }
  }

  function moveLeft() {
    const prevIndex = currentIndex - step;

    if (infinite && prevIndex < frameSize) {
      const jumpIndex = length - frameSize - (frameSize - prevIndex);

      animateJump(prevIndex, jumpIndex);
    } else {
      setCurrentIndex(prevIndex);
    }
  }

  useEffect(() => {
    const list = listRef.current as HTMLUListElement;

    if (!list) {
      return;
    }

    list.style.transform = `translateX(-${currentIndex * (itemWidth + gap)}px)`;
    list.style.transition = `transform ${animationDuration}ms linear`;
  }, [currentIndex, animationDuration, itemWidth]);

  return (
    <div className="Carousel">
      <div
        className="Carousel__images"
        style={{
          width: `${caruselWidth}px`,
        }}
      >
        <ul className="Carousel__list" ref={listRef}>
          {imagesPrep.map((img, i) => (
            <li
              key={i}
              className={'Carousel__item'}
              style={{
                flex: `0 0 ${itemWidth}px`,
                visibility:
                  i >= currentIndex && i < currentIndex + frameSize
                    ? 'visible'
                    : 'hidden',
                transition: `visibility 0s ${i >= currentIndex && i < currentIndex + frameSize ? '0s' : `${animationDuration}ms`}`,
              }}
            >
              <img width={itemWidth} src={img} alt={i + 1 + ''} />
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        data-cy="prev"
        className={classNames(
          'Carousel__button Carousel__button--prev button',
          {
            disabled: !infinite && currentIndex < step,
          },
        )}
        onClick={() => {
          moveLeft();
        }}
        disabled={!infinite && currentIndex < step ? true : false}
      ></button>
      <button
        type="button"
        data-cy="next"
        className={classNames(
          'Carousel__button Carousel__button--next button',
          {
            disabled:
              !infinite &&
              currentIndex ===
                imagesPrep.length - (imagesPrep.length % frameSize),
          },
        )}
        onClick={() => {
          moveRight();
        }}
        disabled={
          !infinite &&
          currentIndex >= imagesPrep.length - (imagesPrep.length % frameSize)
            ? true
            : false
        }
      ></button>
    </div>
  );
};

export default Carousel;
