import React, { useState } from 'react';
import cn from 'classnames';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [image, setImage] = useState(1);

  const size = frameSize * itemWidth;
  const shift = (image - 1) * itemWidth;
  const lastImage = images.length - frameSize + 1;
  const start = image === 1;
  const end = image === lastImage;

  const nextImg = () => {
    if (!end) {
      const nextImage = image + step;

      setImage(nextImage > lastImage
        ? lastImage
        : nextImage);
    } else if (infinite) {
      setImage(1);
    }
  };

  const prevImg = () => {
    if (!start) {
      const nextImage = image - step;

      setImage(nextImage < 1
        ? 1
        : nextImage);
    } else if (infinite) {
      setImage(lastImage);
    }
  };

  return (
    <div className="container">
      <button
        className={cn(
          'button',
          { 'button--disabled': (start && !infinite) },
        )}
        type="button"
        onClick={() => prevImg()}
      >
        &#8656;
      </button>

      <ul
        className="list"
        style={{
          width: `${size}px`,
        }}
      >
        {images.map(img => (
          <li
            key={img}
            style={{
              transform: `translateX(-${shift}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            <img
              src={img}
              alt={img}
              style={{
                width: `${itemWidth}px`,
              }}
            />
          </li>
        ))}
      </ul>

      <button
        className={cn(
          'button',
          { 'button--disabled': (end && !infinite) },
        )}
        type="button"
        onClick={() => nextImg()}
        data-cy="next"
      >
        &#8658;
      </button>
    </div>
  );
};

export default Carousel;
