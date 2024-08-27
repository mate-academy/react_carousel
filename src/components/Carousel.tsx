import React from 'react';
import './Carousel.scss';
import classNames from 'classnames';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [slide, setSlide] = React.useState(0);

  const startSlide = React.useMemo(
    () => images.length - frameSize,
    [images, frameSize],
  );

  const nextSlide = slide === startSlide && !infinite;
  const previousSlide = slide === 0 && !infinite;

  const containerStyle = React.useMemo(
    () => ({
      width: `${itemWidth * frameSize}px`,
    }),
    [itemWidth, frameSize],
  );

  const listStyle = React.useMemo(() => {
    return {
      transform: `translateX(-${slide * itemWidth}px)`,
      transition: `transform ${animationDuration}ms ease-in-out`,
    };
  }, [itemWidth, slide, animationDuration]);

  const itemStyle = React.useMemo(
    () => ({ width: `${itemWidth}px` }),
    [itemWidth],
  );

  const handleNextClick = () => {
    setSlide(currentSlide => {
      if (currentSlide !== startSlide) {
        return Math.min(currentSlide + step, startSlide);
      }

      return 0;
    });
  };

  const handlePrevClick = () => {
    setSlide(currentSlide => {
      if (slide > 0) {
        return Math.max(currentSlide - step, 0);
      }

      return startSlide;
    });
  };

  return (
    <div className="Carousel">
      <div className="Carousel__container" style={containerStyle}>
        <ul className="Carousel__list" style={listStyle}>
          {images.map((image, index) => (
            <li className="Carousel__item" key={index} style={itemStyle}>
              <img src={image} alt={`Image ${index + 1}`} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__navigate">
        <button
          className={classNames('Carousel__button', {
            'Carousel__button--disable': previousSlide && !infinite,
          })}
          type="button"
          disabled={previousSlide}
          onClick={handlePrevClick}
        >
          &lsaquo;
        </button>

        <button
          className={classNames('Carousel__button', {
            'Carousel__button--disable': nextSlide && !infinite,
          })}
          type="button"
          disabled={nextSlide}
          onClick={handleNextClick}
          data-cy="next"
        >
          &rsaquo;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
