import React, { useEffect, useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const [filterImages, setFilterImages] = useState<string[]>([]);
  const [steping, setSteping] = useState(0);

  useEffect(() => {
    setFilterImages(images.slice(0, frameSize));
    setSteping(0);
  }, [images, frameSize]);

  function next() {
    if (steping + step + frameSize > images.length) {
      return;
    }

    setFilterImages(images.slice(steping + step, frameSize + steping + step));
    setSteping(steping + step);
  }

  function prev() {
    if (steping - step < 0) {
      return;
    }

    setFilterImages(
      images.slice(Math.max(steping - step, 0), frameSize + steping - step),
    );
    setSteping(steping - step);
  }

  return (
    <>
      <div className="Carousel">
        <ul className="Carousel__list">
          {filterImages.map(image => {
            return (
              <li
                key={`${image}-${steping}`}
                style={{
                  animationDuration: `${animationDuration}ms`,
                  width: `${itemWidth}px`,
                }}
              >
                <img
                  src={`${image}`}
                  alt="1"
                  style={{
                    width: `${itemWidth}px`,
                  }}
                />
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => {
            prev();
          }}
        >
          Prev
        </button>
        <button
          type="button"
          onClick={() => {
            next();
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Carousel;
