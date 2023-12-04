import './Carousel.scss';
import { useState } from 'react';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);

  const imgStyle = {
    width: itemWidth,
    height: itemWidth,
    transform: `translate(${translateValue}%)`,
    transition: `all ${animationDuration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
  };

  const widthList = {
    width: frameSize * itemWidth,
  };

  const disabledNextButton
  = !infinite && currentIndex + frameSize >= images.length;

  const disabledPrevButton = !infinite && currentIndex === 0;

  const handleNextClick = () => {
    let newIndex = currentIndex + step;

    if (infinite) {
      if (newIndex >= images.length) {
        newIndex = 0;
      }
    } else {
      newIndex = Math.min(newIndex, images.length - frameSize);
    }

    setCurrentIndex(newIndex);
    setTranslateValue(10);
    setTimeout(() => {
      setTranslateValue(0);
    }, animationDuration / 20);
  };

  const handlePrevClick = () => {
    let newIndex = currentIndex - step;

    if (infinite) {
      if (newIndex < 0) {
        newIndex = images.length - Math.abs(newIndex);
      }
    } else {
      newIndex = Math.max(newIndex, 0);
    }

    setCurrentIndex(newIndex);
    setTranslateValue(-10);
    setTimeout(() => {
      setTranslateValue(0);
    }, animationDuration / 20);
  };

  const displayedImages = images.slice(currentIndex, currentIndex + frameSize);

  return (
    <div className="Carousel">
      <ul className="Carousel__list" style={widthList}>
        {displayedImages.map((img: string, index: number) => (
          <li key={img}>
            <img src={`${img}`} alt={`img${index}`} style={imgStyle} />
          </li>
        ))}
      </ul>
      <div className="Carousel__buttons">
        <button
          type="button"
          onClick={handlePrevClick}
          disabled={disabledPrevButton}
        >
          &lt;
        </button>
        <button
          type="button"
          onClick={handleNextClick}
          disabled={disabledNextButton}
          data-cy="next"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
