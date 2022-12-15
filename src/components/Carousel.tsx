import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

const Carousel: React.FC<Props> = (props) => {
  const [currentPositionImgList, setState] = useState(0);
  const {
    images,
    step = 1,
    frameSize = 3,
    itemWidth = 130,
    animationDuration = 1000,
    infinite,
  } = props;

  const showNexImg = () => {
    if (currentPositionImgList
      > (images.length * itemWidth - frameSize * itemWidth) * -1) {
      setState(state => state - (itemWidth * step));
    }

    if (infinite && currentPositionImgList
      === (images.length * itemWidth - frameSize * itemWidth) * -1) {
      setState(0);
    }
  };

  const showPrevImg = () => {
    if (currentPositionImgList < 0) {
      setState(state => state + (itemWidth * step));
    }

    if (infinite && currentPositionImgList === 0) {
      setState((images.length * itemWidth - frameSize * itemWidth) * -1);
    }
  };

  return (
    <div className="carousel" style={{ width: frameSize * itemWidth }}>
      <ul
        className="carousel__list"
        style={{
          transform: `translate(${currentPositionImgList}px, 0)`,
          transition: `all ${animationDuration}ms ease`,
        }}
      >
        {images.map(img => (
          <li key={images.indexOf(img)}>
            <img src={`${img}`} alt="Smile head" />
          </li>
        ))}
      </ul>
      <div className="buttons">
        <button
          className="previousButton"
          type="button"
          onClick={showPrevImg}
          disabled={
            infinite ? false : currentPositionImgList === 0
          }
        >
          &#8592;
        </button>
        <button
          className="nextButton"
          type="button"
          onClick={showNexImg}
          disabled={
            infinite
              ? false
              : currentPositionImgList === (
                images.length * itemWidth - frameSize * itemWidth
              ) * -1
          }
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
