/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useMemo } from 'react';

import { Image } from '../Image';
import { CarouselController } from '../CarouselController';

import './Carousel.scss';

type Props = {
  images: string[];
};

const Carousel: React.FC<Props> = ({ images }) => {
  const [visibleFrames, setVisibleFrames] = useState(3);
  const [imageWidth, setImageWidth] = useState(130);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [step, setStep] = useState(1);
  const [transitionSpeed, setTransitionSpped] = useState(1000);

  const limit = useMemo(
    () => imageWidth * images.length - visibleFrames * imageWidth,
    [images, imageWidth, visibleFrames],
  );

  const showNext = () => {
    setCurrentPosition(Math.min(currentPosition + step * imageWidth, limit));
  };

  const showPrevious = () => {
    setCurrentPosition(Math.max(0, currentPosition - step * imageWidth));
  };

  const changeVisibleFrames = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVisibleFramesCount = +event.target.value;

    setVisibleFrames(newVisibleFramesCount);

    const newLimit
      = imageWidth * images.length - newVisibleFramesCount * imageWidth;

    if (currentPosition + step * imageWidth > newLimit) {
      setCurrentPosition(newLimit);
    }
  };

  const changeStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStep(+event.target.value);
  };

  const changeTransitionSpeed = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTransitionSpped(+event.target.value);
  };

  const changeImageWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newImageWidth = +event.target.value;

    setImageWidth(newImageWidth);

    const newLimit = newImageWidth * images.length - visibleFrames * imageWidth;

    if (currentPosition + step * newImageWidth > newLimit) {
      setCurrentPosition(newLimit);
    }

    if (currentPosition - step * newImageWidth <= 0) {
      setCurrentPosition(0);
    }
  };

  return (
    <div className="Carousel">
      <div className="Carousel__spotlight">
        <div
          className="Carousel__images-wrapper"
          style={{ width: `${visibleFrames * imageWidth}px` }}
        >
          <ul
            className="Carousel__images"
            style={{
              transform: `translateX(${-currentPosition}px)`,
              transitionDuration: `${transitionSpeed}ms`,
            }}
          >
            {images.map((image, idx) => (
              <li key={image} className="Carousel__image-item">
                <Image
                  src={image}
                  alt={`cat-${idx + 1}`}
                  width={imageWidth}
                  className="Carousel__image"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="Carousel__buttons">
          <button
            type="button"
            className="Carousel__button Carousel__button--previous"
            disabled={currentPosition === 0}
            onClick={showPrevious}
          />
          <button
            type="button"
            className="Carousel__button Carousel__button--next"
            disabled={currentPosition >= limit}
            onClick={showNext}
          />
        </div>
      </div>

      <CarouselController
        imagesCount={images.length}
        visibleFrames={visibleFrames}
        step={step}
        imageWidth={imageWidth}
        transitionSpeed={transitionSpeed}
        changeVisibleFrames={changeVisibleFrames}
        changeStep={changeStep}
        changeImageWidth={changeImageWidth}
        changeTransitionSpeed={changeTransitionSpeed}
      />
    </div>
  );
};

export { Carousel };
