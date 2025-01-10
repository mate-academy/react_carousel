import React, { useEffect, useState } from 'react';

import './Carousel.scss';

type Props = {
  images: string[];

  itemWidth?: number;
  frameSize?: number;

  step?: number;
  animationDuration?: number;

  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,

  itemWidth = 130,
  frameSize = 3,

  step = 3,
  animationDuration = 1000,

  infinite = true,
}) => {
  const [pos, setPos] = useState(0);
  const [fast, setFast] = useState(false);
  const [reorder, setReorder] = useState(0);
  const [elements, setElements] = useState([...images]);

  useEffect(() => {
    if (reorder) {
      setReorder(0);
      setPos(prev => prev + reorder);
    }

    if (fast) {
      setFast(false);
    }
  }, [reorder, fast]);

  if (!infinite) {
    for (let i = 0; i < elements.length; i++) {
      if (images[i] !== elements[i]) {
        setPos(0);
        setElements([...images]);
      }
    }
  }

  if (pos + frameSize > elements.length) {
    setFast(true);
    setPos(elements.length - frameSize);
  }

  const prev = () => {
    const newPos = Math.max(0, pos - step);

    if (infinite) {
      if (newPos != pos - step) {
        setReorder(-step);
        setPos(elements.length - frameSize);

        setElements([
          ...elements.slice(pos + frameSize),
          ...elements.slice(0, pos + frameSize),
        ]);

        return;
      }
    }

    setPos(newPos);
  };

  const next = () => {
    const newPos = Math.min(pos + step, elements.length - frameSize);

    if (infinite) {
      if (newPos != pos + step) {
        setPos(0);
        setReorder(step);
        setElements([...elements.slice(pos), ...elements.slice(0, pos)]);

        return;
      }
    }

    setPos(newPos);
  };

  const shift = -pos * itemWidth;

  return (
    <div className="Carousel" style={{ width: `${itemWidth * frameSize}px` }}>
      <ul className="Carousel__list">
        {elements.map((image, i) => (
          <li
            key={i}
            style={{
              transform: `translateX(${shift}px)`,
              transition: `transform ${fast || reorder ? 0 : animationDuration}ms`,
            }}
          >
            <img
              src={image}
              alt={`${image.match(/\d+/)![0]}`}
              width={itemWidth}
            />
          </li>
        ))}
      </ul>

      <div className="Carousel__buttons">
        <button type="button" onClick={prev} disabled={!infinite && pos === 0}>
          Prev
        </button>

        <button
          type="button"
          data-cy="next"
          onClick={next}
          disabled={!infinite && pos + frameSize === elements.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
