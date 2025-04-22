import { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  itemWidth: number;
  frameSize: number;
  animationDuration: number;
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  itemWidth,
  frameSize,
  animationDuration,
}) => {

  const [index, setIndex] = useState(0);
  const containerWidth = itemWidth * frameSize;

  const prevImages = () => {
    const newIndex = index - step;

    if (newIndex >= 0) {
      setIndex(newIndex);
    } else {
      setIndex(0);
    }
  };

  const nextImages = () => {
    const newIndex = index + step;

    if (newIndex <= images.length - frameSize) {
      setIndex(newIndex);
    } else {
      setIndex(images.length - frameSize);
    }
  };

  return (
    <div
      className="Carousel"
      style={{ width: `${containerWidth}px`, overflow: 'hidden' }}
    >
      <ul
        className="Carousel__list"
        style={{
          display: 'flex',
          padding: 0,
          transition: `transform ${animationDuration}ms ease`,
          transform: `translateX(-${index * itemWidth}px)`,
        }}
      >
        {images.map((image, i) => (
          <li key={i} className="Carousel__item">
            <img src={image} alt={`Slide ${i + 1}`} width={itemWidth} />
          </li>
        ))}
      </ul>

      <div className="Carousel__controls">
        <button type="button" onClick={prevImages} data-cy="prev">
          Prev
        </button>
        <button type="button" onClick={nextImages} data-cy="next">
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
