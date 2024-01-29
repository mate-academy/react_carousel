import { useState } from 'react';
import cn from 'classnames';
import './Carousel.scss';
import { ImageStyles } from '../types/ImageStyles';
import { CarouselStyles } from '../types/CarouselStyles';

interface Props {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  infinite,
  animationDuration,
}) => {
  const [firstImg, setFirstImg] = useState(0);
  const addCarouselStyles = (): CarouselStyles => {
    const carouselStyles: CarouselStyles = {
      width: `${frameSize * itemWidth}px`,
    };

    if ((frameSize * itemWidth) > 1300) {
      carouselStyles.transform = `translateX(-${(frameSize * itemWidth - 1300) / 2}px)`;
    }

    return carouselStyles;
  };

  const addImgStyles = (): ImageStyles => {
    const imageStyles: ImageStyles = {
      width: `${itemWidth}px`,
      transition: `transform ${animationDuration}ms ease 0s`,
    };

    if (firstImg > 0) {
      imageStyles.transform = `translateX(-${itemWidth * firstImg}px)`;
    }

    return imageStyles;
  };

  if (frameSize > (images.length) - firstImg) {
    setFirstImg((images.length) - frameSize);
  }

  const handleNext = () => {
    if ((firstImg + step + frameSize) <= (images.length - 1)) {
      setFirstImg(firstImg + step);
    } else if (firstImg === ((images.length) - frameSize) && infinite) {
      setFirstImg(0);
    } else {
      setFirstImg((images.length) - frameSize);
    }
  };

  const handlePrev = () => {
    if ((firstImg - step) > 0) {
      setFirstImg(firstImg - step);
    } else if (firstImg === 0 && infinite) {
      setFirstImg((images.length) - frameSize);
    } else {
      setFirstImg(0);
    }
  };

  return (
    <div
      className="Carousel"
    >
      <ul
        className="Carousel__list"
        style={addCarouselStyles()}
      >
        {images.map((
          image: string,
          index: number,
        ) => (
          <li key={image}>
            <img
              src={image}
              alt={`Img_${String(index + 1)}`}
              style={addImgStyles()}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button
          className={cn('button button__prev',
            {
              disabled: firstImg === 0 && !infinite,
            })}
          type="button"
          onClick={handlePrev}
        >
          Prev
        </button>

        <button
          className={cn('button button__next',
            {
              disabled: firstImg === ((images.length) - frameSize) && !infinite,
            })}
          type="button"
          data-cy="next"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
