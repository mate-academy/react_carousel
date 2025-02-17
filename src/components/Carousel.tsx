import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  size: number;
  step: number;
  duration: number;
  displayed: number;
};

const Carousel: React.FC<Props> = ({
  images,
  size,
  step,
  duration,
  displayed,
}) => {
  const [scroll, setScroll] = useState(0);
  const maxScroll = (images.length - displayed) * size;

  return (
    <div
      className="Carousel"
      style={{
        width: size * displayed,
      }}
    >
      <ul
        className="Carousel__list"
        style={{
          transition: `transform ${duration}ms ease-in-out`,
          transform: `translateX(${-scroll}px)`,
        }}
      >
        {images.map((image, i) => (
          <li key={i} style={{ listStyle: 'none' }}>
            <img src={image} width={size} height={size} />
          </li>
        ))}
      </ul>

      <div className="buttonWrapper">
        <button
          type="button"
          onClick={() => {
            setScroll(Math.max(scroll - step * size, 0));
          }}
          disabled={scroll === 0}
        >
          Prev
        </button>
        <button
          type="button"
          data-cy="next"
          onClick={() => {
            setScroll(Math.min(scroll + step * size, maxScroll));
          }}
          disabled={scroll >= maxScroll}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
