import './Carousel.scss';
import { ImgValuesType } from '../../types/ImgValuesType';

type Props = {
  imgValues: ImgValuesType,
  transform: number,
  setTransform: (value: number) => void,
};

export const Carousel: React.FC<Props> = ({
  imgValues,
  transform,
  setTransform,
}) => {
  const {
    images,
    step,
    frameSize,
    itemWidth,
    animationDuration,
    infinite,
  } = imgValues;

  const lastPosition = images.length - frameSize;

  const handlePrevClick = () => {
    if (transform - step > 0) {
      setTransform(transform - step);
    } else {
      setTransform(0);
    }

    if (infinite && transform === 0) {
      setTransform(lastPosition);
    }
  };

  if (transform > lastPosition && !infinite) {
    setTransform(lastPosition);
  }

  const handleNextClick = () => {
    if (transform + step < lastPosition) {
      setTransform(transform + step);
    } else {
      setTransform(lastPosition);
    }

    if (infinite && transform === lastPosition) {
      setTransform(0);
    }
  };

  return (
    <div className="carousel">
      <ul
        className="carousel__list"
        style={{ width: `${itemWidth * frameSize}px` }}
      >
        {images.map(image => (
          <li
            key={image}
            className="carousel__item"
            style={{
              transform: `translateX(${-transform * itemWidth}px)`,
              transition: `transform ${animationDuration}ms`,
            }}
          >
            <img
              width={itemWidth}
              src={image}
              alt="Emoji"
              className="carousel__image"
            />
          </li>
        ))}
      </ul>

      <div className="carousel__buttons">
        <button
          type="button"
          className="button is-link is-rounded"
          disabled={!infinite && transform === 0}
          onClick={handlePrevClick}
        >
          Prev
        </button>

        <button
          data-cy="next"
          type="button"
          className="button is-link is-rounded"
          disabled={!infinite && transform === lastPosition}
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
    </div>
  );
};
