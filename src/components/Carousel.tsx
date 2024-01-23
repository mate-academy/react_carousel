import { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  itemWidth: string;
  frameSize: number;
  step: number;
  // animationDuration: number;
  // infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = '130px',
  frameSize,
  step,
}) => {
  const [firstImg, setFirstImg] = useState(0);
  const imageStyles = {
    width: itemWidth,
  };

  function visibleImgs() {
    return images.slice(firstImg, (firstImg + frameSize));
  }

  const handleNext = () => {
    if ((firstImg + step) < images.length) {
      setFirstImg(firstImg + step);
    }
  };

  const handleBack = () => {
    if ((firstImg - step) >= 0) {
      setFirstImg(firstImg - step);
    }
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
