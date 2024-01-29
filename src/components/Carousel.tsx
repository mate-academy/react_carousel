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
  const carouselStyles: CarouselStyles = {
    width: `${frameSize * itemWidth}px`,
  };
  const imageStyles: ImageStyles = {
    width: `${itemWidth}px`,
    transition: `transform ${animationDuration}ms ease 0s`,
  };

  if ((frameSize * itemWidth) > 1300) {
    carouselStyles.transform = `translateX(-${(frameSize * itemWidth - 1300) / 2}px)`;
  }

  if (firstImg > 0) {
    imageStyles.transform = `translateX(-${itemWidth * firstImg}px)`;
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
        style={carouselStyles}
      >
        {images.map((
          image: string,
          index: number,
        ) => (
          <li key={image}>
            <img
              src={image}
              alt={`Img_${String(index + 1)}`}
              style={imageStyles}
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
