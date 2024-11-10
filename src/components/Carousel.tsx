import React, { useState } from 'react';
import './Carousel.scss';
import { State } from '../types/State';

const Carousel: React.FC<State> = ({ images, step, frameSize, itemWidth, animationDuration, infinite }) => {


  const [position, setPosition] = useState(0);

  const length: number = (images.length - frameSize) * itemWidth;
  const isStart: boolean = position === 0 && !infinite;
  const isEnd: boolean = position === -length && !infinite;

  const handleChangeNext = () => {
    const newPosition: number = position - itemWidth * step;
    setPosition(Math.max(newPosition, -itemWidth * (images.length - frameSize)));

    if (position === -length && infinite) {
      setPosition(0);
    }
  }

  const handleChangePrev = () => {
    const newPosition: number = position + itemWidth * step;
    setPosition(Math.min(newPosition, 0));

    if (position === 0 && infinite) {
      setPosition(-length);
    }
  };

  return (
    <div className="Carousel">
      <div className="Carousel__container" style={{ width: frameSize * itemWidth }}>
        <ul className="Carousel__list">
          {images.map((image) => (
            <li key={image} style={{
              transform: `translateX(${position}px)`,
              transitionDuration: `${animationDuration}ms`,
            }}>
              <img src={image} alt={image} style={{ width: itemWidth, display: 'block' }} />
            </li>
          ))}
        </ul>
        <button type="button" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)' }} onClick={handleChangePrev} disabled={isStart}>&#171;</button>
        <button type="button" style={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)' }} data-cy="next" onClick={handleChangeNext} disabled={isEnd}>&#187;</button>
      </div>
    </div>
  )
};

export default Carousel;

