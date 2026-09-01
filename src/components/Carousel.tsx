import React from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<Props> = (props: Props) => {
  const {
    images,
    itemWidth = 130,
    frameSize = 3,
    step = 3,
    animationDuration = 1000,
    infinite = false,
  } = props;

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleNext = () => {
    const maxIndex = images.length - frameSize;
    const nextIndex = currentIndex + step;

    if (infinite && nextIndex >= maxIndex) {
      setCurrentIndex(0);
    } else if (nextIndex >= maxIndex) {
      setCurrentIndex(maxIndex);
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  const handlePrev = () => {
    const maxIndex = images.length - frameSize;
    const previousIndex = currentIndex - step;

    if (infinite && previousIndex < 0) {
      setCurrentIndex(maxIndex);
    } else if (previousIndex >= 0) {
      setCurrentIndex(previousIndex);
    }
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__frame"
        style={{ width: frameSize * itemWidth + 'px' }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${currentIndex * itemWidth}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((image: string, index: number) => (
            <li key={image}>
              <img src={image} alt={'Image ' + (index + 1)} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <button type="button" onClick={handlePrev}>
        Prev
      </button>

      <button type="button" data-cy="next" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
