import React, { useEffect, useState } from 'react';
import './Carousel.scss';
import classNames from 'classnames';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

type Image = {
  src: string;
  id: string | '';
};

const getImages = (images: string[]): Image[] => {
  const imagesNew: Image[] = [];

  images.forEach(el => {
    const match = el.match(/(\d+)\.png/);

    imagesNew.push({ src: el, id: match ? match[1] : el });
  });

  return imagesNew;
};

enum Direct {
  left = 'left',
  right = 'right',
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const carouselWidth = frameSize * itemWidth;
  const imgFormatted = getImages(images);
  const [pos, setPos] = useState(0);
  const [isLeftArrow, setIsLeftArrow] = useState(true);
  const [isRightArrow, setIsRightArrow] = useState(true);

  useEffect(() => {
    if (infinite) {
      setIsLeftArrow(true);
      setIsRightArrow(true);

      return;
    }

    const isAtEnd = -pos + carouselWidth >= itemWidth * images.length;
    const isAtStart = pos === 0;

    setIsRightArrow(!isAtEnd);
    setIsLeftArrow(!isAtStart);
  }, [pos, infinite]);
  const handleClick = (direct: Direct) => () => {
    const fullLength = itemWidth * images.length;
    let newPos = 0;
    let correctedStep;

    if (direct === Direct.left) {
      if (-pos < itemWidth * step) {
        correctedStep = -pos;
      } else {
        correctedStep = itemWidth * step;
      }

      newPos = pos + correctedStep;

      if (newPos === pos && infinite) {
        newPos = -(fullLength - carouselWidth);
      }
    }

    if (direct === Direct.right) {
      if (fullLength - (-pos + carouselWidth) < itemWidth * step) {
        correctedStep = fullLength - (-pos + carouselWidth);
      } else {
        correctedStep = itemWidth * step;
      }

      newPos = pos - correctedStep;

      if (pos === newPos && infinite) {
        newPos = 0;
      }
    }

    setPos(newPos);
  };

  return (
    <div className="Carousel">
      <div className="arrow">
        <button
          type="button"
          className={classNames('btn', 'btn btn--left', {
            'btn--dissabled': !isLeftArrow,
          })}
          onClick={handleClick(Direct.left)}
          disabled={!isLeftArrow}
        ></button>
      </div>
      <div
        className="Carousel__wrapper"
        style={{ maxWidth: `${carouselWidth}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${pos}px)`,
            transition: `all ${animationDuration}ms`,
          }}
        >
          {imgFormatted.map(image => (
            <li key={image.id}>
              <img
                src={image.src}
                alt={image.id}
                width={itemWidth}
                style={{ width: `${itemWidth}px` }}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="arrow">
        <button
          type="button"
          className={classNames('btn', 'btn btn--right', {
            'btn--dissabled': !isRightArrow,
          })}
          onClick={handleClick(Direct.right)}
          data-cy="next"
          disabled={!isRightArrow}
        ></button>
      </div>
    </div>
  );
};

export default Carousel;
