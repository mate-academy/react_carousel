import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = true,
}) => {
  const [index, setIndex] = React.useState(0);

  const total = images.length;

  return (
    <div className="Carousel">
      <div className="Carousel__ul">
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${index * itemWidth}px)`,
            width: frameSize * itemWidth,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((image: string) => (
            <li key={image}>
              <img src={image} alt="carousel" style={{ width: itemWidth }} />
            </li>
          ))}
        </ul>
      </div>
      <div className="buttons">
        <button
          type="button"
          onClick={() => {
            if (infinite) {
              setIndex((index - step + total) % total);
            } else {
              setIndex(Math.max(0, index - step));
            }
          }}
        >
          &lt;
        </button>

        <button
          type="button"
          data-cy="next"
          onClick={() => {
            if (infinite) {
              setIndex((index + step) % total);
            } else {
              const maxIndex = total - frameSize;
              const nextIndex = Math.min(index + step, maxIndex);

              setIndex(nextIndex);
            }
          }}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
