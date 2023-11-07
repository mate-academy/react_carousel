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
  const imgStyle = {
    width: itemWidth,
    height: itemWidth,
  };

  const animationStyles = {
    transition: `transform ${animationDuration}ms ease-in-out`,
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
  };

  const displayedImages = images.slice(currentIndex, currentIndex + frameSize);

  return (
    <div className="Carousel">
      <ul className="Carousel__list" style={animationStyles}>
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
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
