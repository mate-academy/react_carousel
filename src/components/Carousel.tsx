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

  const totalItems = images.length;
  const slideItems = Math.max(Math.ceil((totalItems - frameSize) / step), 0);

  const nextSlide = infinite || slide < slideItems;
  const previousSlide = infinite || slide > 0;

  const containerStyle = React.useMemo(
    () => ({
      width: `${itemWidth * frameSize}px`,
    }),
    [itemWidth, frameSize],
  );

  const listStyle = React.useMemo(() => {
    const maxTranslateX = (totalItems - frameSize) * itemWidth;
    const translateX = Math.min(slide * itemWidth * step, maxTranslateX);

    return {
      transform: `translateX(-${translateX}px)`,
      transition: `transform ${animationDuration}ms ease-in-out`,
    };
  }, [totalItems, frameSize, itemWidth, slide, step, animationDuration]);

  const handleNextClick = () => {
    if (nextSlide) {
      setSlide(currentSlide => (currentSlide + 1) % (slideItems + 1));
    }
  };

  const handlePrevClick = () => {
    if (previousSlide) {
      setSlide(currentSlide =>
        currentSlide === 0 ? slideItems : currentSlide - 1,
      );
    }
  };

  return (
    <div className="Carousel">
      <div className="Carousel__container" style={containerStyle}>
        <ul className="Carousel__list" style={listStyle}>
          {images.map((image, index) => (
            <li className="Carousel__item" key={index}>
              <img src={image} alt={`Image ${index + 1}`} width={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__navigate">
        <button
          className={classNames([
            'Carousel__button',
            !previousSlide && !infinite ? 'Carousel__button--disable' : '',
          ])}
          type="button"
          disabled={!previousSlide}
          onClick={handlePrevClick}
        >
          &lsaquo;
        </button>

        <button
          className={classNames([
            'Carousel__button',
            !nextSlide && !infinite ? 'Carousel__button--disable' : '',
          ])}
          type="button"
          disabled={!nextSlide}
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
