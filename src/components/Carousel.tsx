import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [positionFirstItem, setPositionFirstItem] = useState(0);

  const GAP_LIST = 30;
  const NUMBER_ITEMS = 10;

  const listWidth = frameSize * itemWidth + GAP_LIST * (frameSize - 1);
  const maxLastPosition = NUMBER_ITEMS - frameSize;

  const handleOnClickLeft = () => {
    if (infinite && positionFirstItem === maxLastPosition) {
      setPositionFirstItem(0);
    } else {
      setPositionFirstItem(prev =>
        Math.min(prev + step, NUMBER_ITEMS - frameSize),
      );
    }
  };

  const handleOnClickRight = () => {
    if (infinite && positionFirstItem === 0) {
      setPositionFirstItem(maxLastPosition);
    } else {
      setPositionFirstItem(prev => Math.max(prev - step, 0));
    }
  };

  const move = positionFirstItem * (itemWidth + GAP_LIST);

  return (
    <div className="Carousel" style={{ width: `${listWidth}px` }}>
      <ul
        className="Carousel__list "
        style={{
          transform: `translateX(${-move}px)`,
          transition: `transform ${animationDuration}ms ease`,
        }}
      >
        {images.map(img => (
          <li key={img}>
            <img
              width={itemWidth}
              height={itemWidth}
              src={img}
              alt={`${img}`}
            />
          </li>
        ))}
      </ul>

      <button type="button" onClick={handleOnClickRight}>
        Prev
      </button>
      <button data-cy="next" type="button" onClick={handleOnClickLeft}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
