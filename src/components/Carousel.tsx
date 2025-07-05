import React, { useState } from 'react';
import './Carousel.scss';

type Params = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Params> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  // TODO: implement infinite scroll
  // infinite,
}) => {
  const [page, setPage] = useState(0);

  return (
    <div
      className="Carousel"
      style={{ width: `${frameSize * itemWidth}px` }}
    >
      <ul
        className="Carousel__list"
        style={{
          transform: `translateX(-${page * itemWidth}px)`,
          transition: `transform ${animationDuration}ms`,
        }}
      >
        {images.map((image, index) => (
          <li key={index}>
            <img src={image} alt={image} />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => {
          const newPage = page - step;
          if (newPage < 0) {
            setPage(0);
            return;
          } else {
            setPage(newPage);
          }
        }}
      >
        Prev
      </button>
      <button
        type="button"
        onClick={() => {
          const newPage = page + step;
          if (newPage > images.length - frameSize) {
            setPage(images.length - frameSize);
            return;
          } else {
            setPage(newPage);
          }
        }}
      >
        Next
      </button>

      <p>Page: {page}</p>
    </div>
  );
};

export default Carousel;
