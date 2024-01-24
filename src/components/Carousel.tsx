import { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  // infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration,
}) => {
  const [firstImg, setFirstImg] = useState(0);
  const imageStyles = {
    width: `${itemWidth}px`,
  };

  function visibleImgs() {
    return images.slice(firstImg, (firstImg + frameSize));
  }

  const handleNext = () => {
    setTimeout(() => {
      if ((firstImg + step) < images.length) {
        setFirstImg(firstImg + step);
      }
    }, animationDuration);
  };

  const handleBack = () => {
    setTimeout(() => {
      if ((firstImg - step) >= 0) {
        setFirstImg(firstImg - step);
      }
    }, animationDuration);
  };

  return (
    <div className="Carousel">
      <ul className="Carousel__list">
        {visibleImgs().map((image: string, index: number) => (
          <li key={image}>
            <img
              src={image}
              alt={String(index + 1)}
              style={imageStyles}
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={handleBack}
      >
        Prev
      </button>

      <button
        type="button"
        data-cy="next"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
