import React, { useRef, useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  imageSize: number;
  frameSize: number;
  step: number;
  animationDuration: number;
};

const Carousel: React.FC<Props> = ({
  images,
  imageSize = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
}) => {
  const containerRef = useRef<HTMLUListElement | null>(null);
  const [position, setPosition] = useState(0);
  const visibleImages = frameSize;
  const maxPosition = -(images.length - visibleImages) * imageSize;

  const prevClick = () => {
    setPosition(prev => Math.min(prev + imageSize * step, 0));
  };

  const nextClick = () => {
    setPosition(prev => Math.max(prev - imageSize * step, maxPosition));
  };

  return (
    <div className="Carousel">
      <div
        className="wrapper"
        style={{ width: `${imageSize * visibleImages}px` }}
      >
        <ul
          className="Carousel__list"
          ref={containerRef}
          style={{
            width: `${imageSize * images.length}px`,
            display: `flex`,
            paddingLeft: `0px`,
            transform: `translateX(${position}px)`,
          }}
        >
          {images.map((element, index) => (
            <li key={index}>
              <img
                src={element}
                alt={`${index + 1}`}
                style={{
                  height: `${imageSize}px`,
                  width: `${imageSize}px`,
                }}
              />
            </li>
          ))}
        </ul>

        <div className="buttons">
          <button
            type="button"
            onClick={() => setTimeout(prevClick, animationDuration)}
            disabled={position === 0}
          >
            &#8592;
          </button>
          <button
            data-cy="next"
            type="button"
            onClick={() => setTimeout(nextClick, animationDuration)}
            disabled={position === maxPosition}
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
