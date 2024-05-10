import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[],
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  infinite: boolean
}

const GAP = 10;

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite
}) => {
  const [startImage, setStartImage] = useState(0);
  const carouselWidth = frameSize * itemWidth + (frameSize - 1) * GAP;
  const translateX = startImage * (itemWidth + GAP);
  const isPrevDisabled = !infinite && startImage === 0;
  const isNextDisabled = !infinite && startImage >= images.length - frameSize;

  const slideLeft = () => {
    if (infinite && startImage === 0) {
      setStartImage(images.length - frameSize);

      return;
    }

    setStartImage(prevImg => Math.max(0, prevImg - step))
  }

  const slideRight = () => {
    if (infinite && startImage >= images.length - frameSize) {
      setStartImage(0);

      return;
    }

    setStartImage(prevImg =>
      Math.min(prevImg + step, images.length - frameSize),
    );
  };

  return (
    <div
      className="Carousel"
    >
      <div
        className="Carousel__container"
        style={{ width: carouselWidth }}
      >
        <ul
          className="Carousel__list"
          style={{
            gap: GAP,
            transform: `translateX(-${translateX}px)`,
            transition: `transform ${animationDuration}ms ease`
          }}
        >

          {images.map((img, inx) => (
            <li className="Carousel__item" key={img}>
              <img src={img} alt={`${inx + 1}`} width={itemWidth} />
            </li>
          ))}

        </ul>

        <div className='Carousel__buttons'>
          <button
            className="Carousel__button"
            type="button"
            onClick={slideLeft}
            disabled={isPrevDisabled}
          >
            Prev
          </button>
          <button
            data-cy="next"
            className="Carousel__button"
            type="button"
            onClick={slideRight}
            disabled={isNextDisabled}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
};

export default Carousel;
