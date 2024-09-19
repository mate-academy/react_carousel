import React from 'react';
import './Carousel.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  translateX: string;
  setTranslateX: (value: string) => void;
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  translateX,
  setTranslateX,
}) => {
  const translatedBy = +translateX.slice(0, -2);
  const visibleWidth = frameSize * itemWidth + (frameSize - 1);
  const maxWidth = itemWidth * images.length + (images.length - 1);
  const hiddenRightWidth = maxWidth - visibleWidth + translatedBy;
  const scrollStep = itemWidth * step + frameSize;

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
        }}
      >
        {images.map((img, index: number) => (
          <li
            key={img}
            style={{
              transition: `all ${animationDuration}ms`,
              transform: `translateX(${translateX})`,
            }}
          >
            <img
              width={itemWidth}
              style={{ maxWidth: `${itemWidth}px` }}
              src={`${img}`}
              alt={`${index}`}
            />
          </li>
        ))}
      </ul>

      <div className="button__container">
        <button
          className="button is-primary is-light"
          disabled={translatedBy === 0}
          type="button"
          onClick={() => {
            const newTransform =
              translatedBy +
              (scrollStep < maxWidth - hiddenRightWidth - visibleWidth
                ? scrollStep
                : maxWidth - hiddenRightWidth - visibleWidth);

            setTranslateX(newTransform.toString() + 'px');
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
        </button>

        <button
          className="button is-primary is-light"
          disabled={translatedBy <= visibleWidth - maxWidth}
          data-cy="next"
          type="button"
          onClick={() => {
            const newTransform =
              translatedBy -
              (scrollStep < hiddenRightWidth ? scrollStep : hiddenRightWidth);

            setTranslateX(newTransform.toString() + 'px');
          }}
        >
          <FontAwesomeIcon icon={faArrowRight} size="lg" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
