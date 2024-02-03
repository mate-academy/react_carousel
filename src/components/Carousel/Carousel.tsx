import cn from 'classnames';
import './Carousel.scss';
import { ValuesImgType } from '../../types/Types';

type Props = {
  valuesImage: ValuesImgType;
  transform: number;
  setTransform: (value: number) => void;
};

export const Carousel: React.FC<Props> = ({
  valuesImage,
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
  } = valuesImage;
  const lastPosition = images.length - frameSize;

  function transitionNext() {
    if (transform + step < lastPosition) {
      setTransform(transform + step);
    } else {
      setTransform(lastPosition);
    }

    if (infinite && transform === lastPosition) {
      setTransform(0);
    }
  }

  if (transform > images.length - frameSize && !infinite) {
    setTransform(images.length - frameSize);
  }

  function transitionPrev() {
    if (transform - step > 0) {
      setTransform(transform - step);
    } else {
      setTransform(0);
    }

    if (infinite && transform === 0) {
      setTransform(lastPosition);
    }
  }

  return (
    <>
      <div className="carousel">
        <ul
          className="carousel__list"
          style={{ width: `${itemWidth * frameSize}px` }}
        >
          {images.map(image => {
            return (
              <li
                key={image}
                className="carousel__items"
                style={{
                  transition: `transform ${animationDuration}ms`,
                  transform: `translateX(${-transform * itemWidth}px`,
                  width: `${step}`,
                }}
              >
                <img
                  width={itemWidth}
                  src={image}
                  alt="Emoji"
                  className="carousel__image"
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div className="carousel-buttons">
        <button
          type="button"
          className={cn(
            'button',
            {
              'is-success': infinite || transform !== 0,
              'is-light': infinite || transform !== 0,
              'disablet-btn': !infinite && transform === 0,
            },
          )}
          onClick={transitionPrev}
        >
          Prev
        </button>
        <button
          type="button"
          className={cn(
            'button',
            {
              'is-success': infinite || transform !== lastPosition,
              'is-light': infinite || transform !== lastPosition,
              'disablet-btn': !infinite && transform === lastPosition,
            },
          )}
          onClick={transitionNext}
        >
          Next
        </button>
      </div>
    </>
  );
};
