import React from 'react';
import './Carousel.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Properties } from '../App';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  translateX: number;
  setTranslateX: (propertyName: keyof Properties, value: number) => void;
  gap: number;
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  translateX,
  setTranslateX,
  gap,
}) => {
  const translatedBy = translateX;
  const visibleWidth = frameSize * (itemWidth + gap);
  const maxWidth = (itemWidth + gap) * images.length;
  const hiddenRightWidth = maxWidth - visibleWidth + translatedBy;
  const scrollStep = (itemWidth + gap) * step;

  return (
    <div
      className="Carousel cell is-row-start-2 is-col-start-2 is-col-span-4"
      style={{
        width: `${visibleWidth < maxWidth ? visibleWidth : maxWidth}px`,
      }}
    >
      <ul
        className="Carousel__list m-4 mt-6"
        style={{
          width: `${visibleWidth < maxWidth ? visibleWidth : maxWidth}px`,
          transition: `all ${animationDuration}ms`,
          transform: `translateX(${translateX}px)`,
          gap: `${gap}px`,
        }}
      >
        {images.map((img, index: number) => (
          <li key={img}>
            <img
              width={itemWidth}
              style={{ maxWidth: `${itemWidth}px` }}
              src={`${img}`}
              alt={`emoji-${index}`}
            />
          </li>
        ))}
      </ul>

      <div className="button__container">
        <button
          className="button is-primary is-light"
          disabled={translatedBy >= 0}
          type="button"
          onClick={() => {
            const newTransform =
              translatedBy +
              (scrollStep < maxWidth - hiddenRightWidth - visibleWidth
                ? scrollStep
                : maxWidth - hiddenRightWidth - visibleWidth);

            setTranslateX('translateX', newTransform);
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
        </button>

        <button
          className="button is-primary is-light"
          disabled={Math.abs(translatedBy) >= maxWidth - visibleWidth}
          data-cy="next"
          type="button"
          onClick={() => {
            const newTransform =
              translatedBy -
              (scrollStep < hiddenRightWidth ? scrollStep : hiddenRightWidth);

            setTranslateX('translateX', newTransform);
          }}
        >
          <FontAwesomeIcon icon={faArrowRight} size="lg" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
