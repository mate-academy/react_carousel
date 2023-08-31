import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  imgWidth: number;
  frameWidth: number;
  scrollStep: number;
  animation: number;
  infinite: boolean;
};

type CheckPosition = (
  direction: 'right' | 'left',
  chain: boolean,
) => void;

type ActiveButton = (
  position: number,
  chain: boolean,
) => boolean;

const Carousel: React.FC<Props> = ({
  images,
  imgWidth,
  frameWidth,
  scrollStep,
  animation,
  infinite,
}) => {
  const [scrollImage, setScrollImage] = useState(0);
  const frameWidthValue = frameWidth * imgWidth;
  const finalPosition = -130 * (10 - frameWidth);

  const checkPosition: CheckPosition = (direction, chain) => {
    if (direction === 'right') {
      const scrollRight = scrollImage + (0 - scrollStep * imgWidth);

      if (chain && scrollImage === finalPosition) {
        setScrollImage(0);

        return;
      }

      if (scrollRight < finalPosition) {
        setScrollImage(finalPosition);
      } else {
        setScrollImage(scrollRight);
      }
    }

    if (direction === 'left') {
      const scrollLeft = scrollImage + scrollStep * imgWidth;

      if (chain && scrollImage === 0) {
        setScrollImage(finalPosition);

        return;
      }

      if (scrollLeft > 0) {
        setScrollImage(0);
      } else {
        setScrollImage(scrollLeft);
      }
    }
  };

  const isActiveLeftButton: ActiveButton = (position, chain) => {
    if (chain) {
      return false;
    }

    if (position === 0) {
      return true;
    }

    return false;
  };

  const isActiveRightButton: ActiveButton = (position, chain) => {
    if (chain) {
      return false;
    }

    if (position === finalPosition) {
      return true;
    }

    return false;
  };

  const styles = {
    carouselListContainer: {
      width: `${frameWidthValue}px`,
    },
    carouselList: {
      transition: `transform ${animation}ms ease-in-out`,
      transform: `translateX(${scrollImage}px)`,
    },
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__list-container"
        style={styles.carouselListContainer}
      >
        <ul
          className="Carousel__list"
          style={styles.carouselList}
        >
          {images.map((img, imgIndex) => (
            <li key={img}>
              <img
                style={{ width: imgWidth }}
                src={img}
                alt={String(imgIndex + 1)}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="button-container">
        <button
          type="button"
          onClick={() => checkPosition('left', infinite)}
          disabled={isActiveLeftButton(scrollImage, infinite)}
        >
          Prev
        </button>
        <button
          data-cy="next"
          type="button"
          onClick={() => checkPosition('right', infinite)}
          disabled={isActiveRightButton(scrollImage, infinite)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
