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

export const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [current, setCurrent] = useState(0);
  const [firstLiStyle, setFirstLiStyle] = useState({
    marginLeft: '0',
    transitionProperty: 'margin-left',
    transitionDuration: `${animationDuration}ms`,
  });

  useEffect(() => {
    setFirstLiStyle((prev) => ({
      ...prev,
      transitionDuration: `${animationDuration}ms`,
    }));
  }, [animationDuration]);

  const imageStyle = {
    width: `${itemWidth}px`,
    height: `${itemWidth}px`,
  };
  const listStyle = {
    width: `${frameSize * itemWidth}px`,
  };

  const handlePrev = () => {
    if (!infinite) {
      setFirstLiStyle(prevStyle => ({
        ...prevStyle,
        marginLeft: current > step + 1
          ? `${(parseInt(prevStyle.marginLeft, 10)) + (step * itemWidth)}px`
          : '0',
      }));

      if (current > step + 1) {
        setCurrent(old => old - frameSize);
      } else {
        setCurrent(0);
      }
    }
  };

  const handleNext = () => {
    if (!infinite) {
      if (current < images.length - step - 1) {
        setFirstLiStyle(prevStyle => ({
          ...prevStyle,
          marginLeft: `${parseInt(prevStyle.marginLeft, 10) - (step * itemWidth)}px`,
        }));
        setCurrent(old => old + step);
      } else {
        setFirstLiStyle(prevStyle => ({
          ...prevStyle,
          marginLeft: `${-(images.length - frameSize) * itemWidth}px`,
        }));

        setCurrent((images.length - frameSize));
      }
    }
  };

  return (
    <div className="Carousel">
      <ul className="Carousel__list" style={listStyle}>
        {images.map(image => (
          <li
            key={image}
            style={image.localeCompare(images[0]) === 0
              ? firstLiStyle
              : {}}
          >
            <img className="image" style={imageStyle} src={image} alt={`${images.indexOf(image)}`} />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={handlePrev}
        disabled={current === 0}
      >
        Prev
      </button>
      <button
        type="button"
        data-cy="next"
        onClick={handleNext}
        disabled={current === images.length - frameSize}
      >
        Next
      </button>
    </div>
  );
};
