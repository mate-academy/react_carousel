import React from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite?: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [index, setIndex] = React.useState(0);
  const maxIndex = Math.max(0, images.length - frameSize);

  // Скидаємо індекс на безпечний, якщо міняються розміри вікна або масив
  React.useEffect(() => {
    if (index > maxIndex) {
      setIndex(maxIndex);
    }
  }, [maxIndex, index]);

  return (
    <>
      <div className="Carousel">
        <button
          onClick={() => {
            if (index - step < 0) {
              if (infinite && index === 0) {
                setIndex(maxIndex); // Перекид на кінець тільки якщо ми ВЖЕ в нулі
              } else {
                setIndex(0);
              }
            } else {
              setIndex(index - step);
            }
          }}
          type="button"
          disabled={infinite ? false : index === 0}
        >
          Prev
        </button>

        <div
          className="carouselContainer"
          style={{ width: frameSize * itemWidth, overflow: 'hidden' }}
        >
          <ul
            className="tape"
            style={{
              display: 'flex',
              padding: 0,
              margin: 0,
              listStyle: 'none',
              transform: `translateX(-${index * itemWidth}px)`,
              transition: `transform ${animationDuration}ms ease-in-out`,
            }}
          >
            {images.map((url, i) => (
              <li
                key={i}
                style={{
                  width: `${itemWidth}px`,
                  minWidth: `${itemWidth}px`,
                  maxWidth: `${itemWidth}px`,
                }}
              >
                <img
                  src={url}
                  alt="image"
                  width={itemWidth}
                  style={{ width: '100%', display: 'block' }}
                />
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => {
            if (index + step > maxIndex) {
              if (infinite && index === maxIndex) {
                setIndex(0); // Перекид на початок тільки якщо ми ВЖЕ в макс. індексі
              } else {
                setIndex(maxIndex);
              }
            } else {
              setIndex(index + step);
            }
          }}
          type="button"
          data-cy="next"
          disabled={infinite ? false : index >= maxIndex}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Carousel;
