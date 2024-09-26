import React, { useState } from 'react';
import './Carousel.scss';
type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  animationDuration: number;
  step: number;
};
const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
}) => {
  const [scroll, setScroll] = useState(0);

  const handlePrev = () => {
    if (scroll - step * itemWidth < 0) {
      setScroll(0);

      return;
    }

    setScroll(scroll - step * itemWidth);
  };

  const handleNext = () => {
    if (scroll + step * itemWidth > (images.length - step) * itemWidth) {
      setScroll((images.length - step) * itemWidth);

      return;
    }

    setScroll(scroll + step * itemWidth);
  };

  return (
    <div className="Carousel" style={{ width: `${frameSize * itemWidth}px` }}>
      <ul
        className="Carousel__list"
        style={{
          transition: `all ${animationDuration}ms ease`,
          transform: `translateX(-${scroll}px)`,
        }}
      >
        {images.map((url, ind) => (
          <li key={ind}>
            <img src={url} alt="1" width={itemWidth} />
          </li>
        ))}
      </ul>

      <button type="button" onClick={handlePrev} disabled={scroll === 0}>
        Prev
      </button>
      <button
        data-cy="next"
        type="button"
        onClick={handleNext}
        disabled={scroll === (images.length - step) * itemWidth}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
