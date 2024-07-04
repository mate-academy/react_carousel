import { useState } from 'react';
import './Carousel.scss';
// import classNames from 'classnames';
import { State } from '../types/State';

const Carousel: React.FC<State> = ({ images, data }) => {
  const [position, setPositon] = useState(0);
  const [translate, setTranslate] = useState(0);
  const width = data.itemWidth * data.frameSize;
  const maxPosition = 10 - data.frameSize;
  // const [index, setIndex] = useState(0);

  return (

    <div className="Carousel" data-cy="title">
      <div
        className="container"
        style={{
          width: `${width}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            // gap: '5px',
            transform: `translateX(${-translate}px)`,
            // transitionDuration: `${duration}s`,
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
          onClick={() => {
            if (position >= 0 || position < maxPosition) {
              setTranslate(prevTranslate => prevTranslate
                - data.frameSize * data.step * data.itemWidth);
              setPositon(prevPosition => prevPosition
                - data.step * data.frameSize);
            }
          }}
          className="Carousel__btn--prev"
          disabled={position === 0}

        >
          Prev
        </button>

        <button
          type="button"
          onClick={() => {
            if (position >= 0 || position < maxPosition) {
              setTranslate(prevTranslate => prevTranslate
                + data.frameSize * data.step * data.itemWidth);
              setPositon(prevPosition => prevPosition
              + data.step * data.frameSize);
            }
          }}
          className="Carousel__btn--next"
          disabled={position === maxPosition}
          data-cy="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
