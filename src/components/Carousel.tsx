import React, { useEffect, useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
};

const Carousel: React.FC <Props> = ({
  images, itemWidth, frameSize, step, animationDuration,
}) => {
  const [translate, SetTranslate] = useState(0);

  useEffect(() => {
    SetTranslate(0);
  }, [images, itemWidth, frameSize, step, animationDuration]);

  return (
    <div className="wrapper">
      <div
        className="Carousel"
        style={{
          width: `${frameSize * itemWidth}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={
            {
              transform: `translateX(${translate}px)`,
              transition: `${animationDuration}ms`,
              width: images.length * itemWidth,
            }
          }
        >
          {images.map((image, i) => (
            <li
              className="Carousel__list-item"
              key={image}
              style={{
                width: `${itemWidth}px`,
                height: `${itemWidth}px`,
              }}
            >
              <img
                src={image}
                alt={(i + 1).toString()}
                className="img"
                style={{
                  width: `${itemWidth}px`,
                  height: `${itemWidth}px`,
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      <div
        className="btn__container"
      >
        <button
          type="button"
          className="btn"
          onClick={() => {
            if (translate >= 0) {
              return;
            }

            SetTranslate((prev) => {
              let newValue = prev;

              newValue += step * itemWidth;

              if (newValue >= 0) {
                newValue = 0;
              }

              return newValue;
            });
          }}
        >
          Prev
        </button>

        <button
          type="button"
          className="btn"
          onClick={() => {
            SetTranslate((prev) => {
              let newValue = prev;

              newValue -= step * itemWidth;

              if (newValue <= -(
                images.length * itemWidth - itemWidth * frameSize)) {
                newValue = -(images.length * itemWidth - itemWidth * frameSize);
              }

              return newValue;
            });
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
