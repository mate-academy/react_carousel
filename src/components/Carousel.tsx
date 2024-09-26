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
    const posibleIndex = scroll - step;
    const newIndex = Math.max(0, posibleIndex);

    setScroll(newIndex);
  };

  const handleNext = () => {
    const posibleIndex = scroll + step;
    const maxIndex = images.length - frameSize;
    const newIndex = Math.min(maxIndex, posibleIndex);

    setScroll(newIndex);
  };

  return (
    <div className="Carousel" style={{ width: `${frameSize * itemWidth}px` }}>
      <ul
        className="Carousel__list"
        style={{
          transition: `all ${animationDuration}ms ease`,
          transform: `translateX(-${scroll * itemWidth}px)`,
        }}
      >
        {images.map(url => (
          <li key={url}>
            <img src={url} alt={url} width={itemWidth} />
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
        disabled={scroll >= images.length - frameSize}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
