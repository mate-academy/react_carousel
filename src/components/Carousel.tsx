import { useState } from 'react';
import './Carousel.scss';
import { State } from '../types/State';

const Carousel: React.FC<State> = ({ images, data }) => {
  const [position, setPositon] = useState(0);
  const [translate, setTranslate] = useState(0);
  const width = data.itemWidth * data.frameSize + 5 * (data.frameSize - 1);
  const maxPosition = 10 - data.frameSize;

  const handleNextClick = () => {
    if (position >= 0 || position < maxPosition) {
      setTranslate(prevTranslate => prevTranslate
        + data.step * data.itemWidth + 5 * data.step);
      setPositon(prevPosition => prevPosition
      + data.step * data.frameSize);
    }
  };

  const handlePrevClick = () => {
    if (position >= 0 || position < maxPosition) {
      setTranslate(prevTranslate => prevTranslate
        - data.step * data.itemWidth - 5 * data.step);
      setPositon(prevPosition => prevPosition
        - data.step * data.frameSize);
    }
  };

  return (

    <div className="Carousel">
      <div
        className="container"
        style={{
          width: `${width}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            gap: '5px',
            transform: `translateX(-${translate}px)`,
            transitionDuration: `${data.duration}ms`,
          }}
        >

          {
            images.map(((img, idx) => (

              <li
                key={img}
                className="Carousel__Item"
              >
                <img
                  className="Carousel__img"
                  src={img}
                  alt={`${idx}`}
                  width={`${data.itemWidth}`}
                />
              </li>
            )
            ))
          }
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          type="button"
          onClick={handlePrevClick}
          className="Carousel__btn--prev"
          disabled={translate === 0}

        >
          Prev
        </button>

        <button
          type="button"
          onClick={handleNextClick}
          className="Carousel__btn--next"
          disabled={(translate >= width * (10 / data.frameSize) - width)}
          data-cy="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
