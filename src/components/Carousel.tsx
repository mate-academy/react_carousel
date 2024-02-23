import React, { useState, useMemo } from 'react';
import cn from 'classnames';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const [states, setState] = useState(0);
  const [click, setClick] = useState(false);
  const indexs = images.length;
  const generalWidth = indexs * itemWidth;
  const currentWidth = states * itemWidth * step;
  const handleCountNext = () => {
    if (currentWidth < generalWidth - frameSize * itemWidth) {
      setState(prevState => prevState + 1);
      setClick(false);
    } else {
      setClick(true);
    }
  };

  const handlePrev = () => {
    if (states > 0) {
      setState(prevState => prevState - 1);
      setClick(false);
    }
  };

  const stylesForLi = useMemo(
    () => ({
      animation: `${infinite && '5s linear 2s infinite alternate cyclic'}`,
      transform: `translateX(-${generalWidth - currentWidth < itemWidth * step ? generalWidth - itemWidth * step : states * itemWidth * step}px)`,
      transition: `transform ${animationDuration}ms ease`,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [states],
  );

  return (
    <div className="Carousel">
      <ul
        className="Carousel__list"
        style={{
          width: `${frameSize * itemWidth}px`,
        }}
      >
        {images.map(img => (
          <li key={img} style={stylesForLi}>
            <img style={{ width: `${itemWidth}px` }} src={img} alt={img} />
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={cn('Carousel__сlick Carousel__сlick--prev', {
          Disabled: states === 0,
        })}
        onClick={handlePrev}
      >
        &#11164;
      </button>
      <button
        type="button"
        className={cn('Carousel__сlick Carousel__сlick--next', {
          Disabled: click,
        })}
        data-cy="next"
        onClick={handleCountNext}
      >
        &#11166;
      </button>
    </div>
  );
};

export default Carousel;
