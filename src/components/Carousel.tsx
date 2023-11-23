import React, { useEffect, useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    const newIndex = currentIndex - step;

    if (infinite || newIndex >= 0) {
      setCurrentIndex(newIndex);
    }
  };

  const handleNextClick = () => {
    const newIndex = currentIndex + step;

    if (infinite || newIndex + frameSize <= images.length) {
      setCurrentIndex(newIndex);
    }
  };

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     handleNextClick();
  //   }, animationDuration);

  //   return () => clearInterval(intervalId);
  // }, [currentIndex, animationDuration]);

  return (
    <div className="Carousel">
      <h1 data-cy="title">Carousel</h1>

      <ul className="Carousel__list">
        {images.map((image, index) => (
          <li className="Carousel__item" key={image}>
            <img src={image} alt={(index + 1).toString()} />
          </li>
        ))}

        {/* <li className="Carousel__item"><img src="./img/1.png" alt="1" /></li>
        <li className="Carousel__item"><img src="./img/1.png" alt="2" /></li>
        <li className="Carousel__item"><img src="./img/1.png" alt="3" /></li>
        <li className="Carousel__item"><img src="./img/1.png" alt="4" /></li> */}
      </ul>

      <button
        onClick={handlePrevClick}
        type="button"
        data-cy="next"
      >
        Previous
      </button>
      <button
        onClick={handleNextClick}
        type="button"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
