import { useState } from 'react';
import './Carousel.scss';
import cn from 'classnames';

interface Props {
  images: string[],
}

// interface PreparedImages {
//   array: number[],
//   value: number,
//   itemWidth: number,
//   frameSize: number,
// }

// const numbersOfImages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// function getPreparedImages(array: number[], value: number, itemWidth: number, frameSize: number) {
//   const startIndex = Math.abs(value) / itemWidth;
//   const endIndex = startIndex + frameSize / itemWidth;
//   const preparedImages = [...array];

//   return preparedImages.slice(startIndex, endIndex);
// }

const Carousel: React.FC<Props> = ({ images }) => {
  const imageAmount = 3;
  const itemWidth = 130;
  const gap = 20;
  const frameSize = imageAmount * itemWidth + (gap * (imageAmount - 1));
  const containerWidth
    = (itemWidth * (10 - imageAmount)) + (gap * (10 - imageAmount));

  const [translateValue, setTranslateValue] = useState(0);
  // const visibleImages
  //   = getPreparedImages(numbersOfImages, translateValue, itemWidth, frameSize);

  // console.log(translateValue, 'translate value');
  // console.log(visibleImages, 'array');

  const handleeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const currentButton = event.currentTarget;
    const currentButtonClasslist = currentButton.classList;

    if (currentButtonClasslist.contains('button-prev')) {
      const newValuePrev = translateValue + frameSize + gap;
      const valueToSetPrev = Math.min(newValuePrev, 0);

      setTranslateValue(valueToSetPrev);
    } else if (currentButtonClasslist.contains('button-next')) {
      const newValueNext = translateValue - frameSize - gap;
      const valueToSetNext = Math.max(newValueNext, (-containerWidth));

      setTranslateValue(valueToSetNext);
    }
  };

  return (
    <div className="Carousel">
      <div className="Carousel__container">
        <button
          className={cn('button-prev', {
            'button-prev__disabled': translateValue === 0,
          })}
          type="button"
          onClick={handleeClick}
        >
          <div className="button-prev__text">&lt;</div>
        </button>
        <ul className="Carousel__list" style={{ width: `${frameSize}px` }}>
          <div
            className="Carousel__item-wrapper"
            style={{
              transform: `translateX(${translateValue}px)`,
              gap: `${gap}px`,
            }}
          >
            {/* <li><img src="./img/1.png" alt="1" /></li> */}
            {images.map(image => (
              <li className="Carousel__item" key={image}>
                <img
                  src={image}
                  alt={`${images.indexOf(image) + 1}`}
                />
              </li>
            ))}
          </div>
        </ul>
        <button
          className={cn('button-next', {
            'button-next__disabled': translateValue === -containerWidth,
          })}
          type="button"
          data-cy="next"
          onClick={handleeClick}
        >
          <div className="button-next__text">&gt;</div>
        </button>
      </div>

      <div className="input-container">
        <h1>
          item - width
          <input type="text" />
        </h1>
        <h1>
          frame-size
          <input type="text" />
        </h1>
        <h1>
          step
          <input type="text" />
        </h1>
        <h1>
          animation-duration
          <input type="text" />
        </h1>
      </div>
    </div>
  );
};

export default Carousel;
