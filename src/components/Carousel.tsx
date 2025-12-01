import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
}

const GAP = 10;

const Carousel: React.FC<Props> = ({ images }) => {
  const [position, setPosition] = useState(0);
  const [step, setStep] = useState(3);
  const [itemWidth, setItemWidth] = useState(130);
  const [frame, setFrame] = useState(3);

  const maxPosition = images.length - frame;
  const canLeft = position > 0;
  const canRight = position < maxPosition;

  const moveRight = () => {
    if (!canRight) {
      return;
    }

    if (position + frame > maxPosition) {
      setPosition(position + 1);
    } else {
      setPosition(position + frame);
    }
  };

  const moveLeft = () => {
    if (!canLeft) {
      return;
    }

    if (position - frame < 0) {
      setPosition(0);
    } else {
      setPosition(position - frame);
    }
  };

  return (
    <div className="carousel">
      <label htmlFor="stepId">Step:</label>
      <input
        id="stepId"
        type="number"
        min="1"
        max={frame}
        value={step}
        onChange={e => setStep(Number(e.target.value))}
      />

      <label htmlFor="itemId">Image width:</label>
      <input
        id="itemId"
        type="number"
        min="50"
        max="400"
        value={itemWidth}
        onChange={e => setItemWidth(Number(e.target.value))}
      />

      <label htmlFor="frameId">Frame Size</label>
      <input
        id="frameId"
        type="number"
        value={frame}
        onChange={e => setFrame(Number(e.target.value))}
      />
      <button
        data-cy="prev"
        className={`arrow left ${!canLeft ? 'disabled' : ''}`}
        onClick={moveLeft}
        disabled={!canLeft}
      >
        ‹
      </button>

      <div
        className="window"
        style={{ width: frame * itemWidth + GAP * (frame - 1) }}
      >
        <ul
          className="track"
          style={{
            transform: `translateX(-${position * (itemWidth + GAP)}px)`,
          }}
        >
          {images.map((src, i) => (
            <li key={i} className="item">
              <img src={src} alt="" width={itemWidth} height={itemWidth} />
            </li>
          ))}
        </ul>
      </div>

      <button
        data-cy="next"
        className={`arrow right ${!canRight ? 'disabled' : ''}`}
        onClick={moveRight}
        disabled={!canRight}
      >
        ›
      </button>
    </div>
  );
};

export default Carousel;
