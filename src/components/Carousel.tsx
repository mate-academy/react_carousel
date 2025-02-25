import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemId: number;
  frameId: number;
  stepId: number;
  animationDuration: number;
};

const Carousel: React.FC<Props> = ({
  images,
  itemId,
  frameId,
  stepId,
  animationDuration,
}) => {
  const [translate, setTranslate] = useState(0);

  const mainContainerWidth = images.length * itemId;
  const visibleContainerWidth = frameId * itemId;

  const maxTranslate = mainContainerWidth - visibleContainerWidth;

  const handleTranslate = (direction: string) => {
    setTranslate(prev => {
      if (direction === 'next') {
        const newTranslate = prev - itemId * stepId;

        if (newTranslate < -maxTranslate) {
          return -maxTranslate;
        }

        return newTranslate;
      }

      if (direction === 'prev') {
        const newTranslate = prev + itemId * stepId;

        if (newTranslate > 0) {
          return 0;
        }

        return newTranslate;
      }

      return prev;
    });
  };

  return (
    <div className="Carousel" style={{ width: `${mainContainerWidth}px` }}>
      <button
        className="prev"
        type="button"
        onClick={() => handleTranslate('prev')}
        disabled={translate === 0}
      />
      <div
        className="Carousel__container"
        style={{ width: `${visibleContainerWidth}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${translate}px)`,
            transition: `transform ${animationDuration / 1000}s ease`,
          }}
        >
          {images.map((image, index) => (
            <li key={index}>
              <img src={image} alt={`image ${index}`} width={itemId} />
            </li>
          ))}
        </ul>
      </div>
      <button
        className="next"
        type="button"
        onClick={() => handleTranslate('next')}
        disabled={translate <= -maxTranslate}
        data-cy="next"
      />
    </div>
  );
};

export default Carousel;
