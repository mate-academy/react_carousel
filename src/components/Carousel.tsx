import React, { useState } from 'react';
import './Carousel.scss';

const STEP = 3;

type Props = {
  images: string[]
};

const Carousel: React.FC<Props> = ({ images }) => {
  const [startImage, setStartImage] = useState(0);
  const preparedImages = images.slice(startImage, startImage + STEP);

  return (
    <div className="Carousel">
      <div className="Carousel__container">
        <ul className="Carousel__container__list">
          {preparedImages.map((imageUrl, index) => (
            <li className="Carousel__container__list__item" key={imageUrl}>
              <img className="Carousel__container__list__img" src={imageUrl} alt={`${index + 1}`} />
            </li>
          ))}
        </ul>
        <div className="Carousel__container__button">
          <button
            onClick={() => setStartImage(
              startImage !== 0
                ? startImage - STEP
                : startImage,
            )}
            type="button"
          >
            Prev
          </button>
          <button
            onClick={() => setStartImage(
              startImage < 10 - STEP
                ? startImage + STEP
                : startImage,
            )}
            type="button"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
