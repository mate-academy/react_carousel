import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
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
          onClick={e => {
            if (step > index > 0) {
              setIndex(0);
            } else if (index === 0) {
              e.preventDefault();
            } else {
              setIndex(index - step);
            }
          }}
        >
          &lt;
        </button>

        <button
          type="button"
          data-cy="next"
          onClick={() => {
            const maxIndex = total - frameSize;
            const nextIndex = Math.min(index + step, maxIndex);

            setIndex(nextIndex);
          }}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
