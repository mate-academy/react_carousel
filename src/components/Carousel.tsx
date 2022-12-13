import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  // animationDuration: number,
  // infinite: boolean,
};

const Carousel: React.FC<Props> = (props) => {
  const {
    images,
    step,
    frameSize,
    itemWidth,
    // animationDuration,
    // infinite
  } = props;

  let currentPositionImgList = 0;

  const showNexImg
  = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const carouselList
    = document.querySelector('.Carousel__list') as HTMLElement;
    const previousButton
    = document.querySelector('.PreviousButton') as HTMLButtonElement;
    const event = ev;

    if (currentPositionImgList
      > (images.length * itemWidth - frameSize * itemWidth) * -1) {
      currentPositionImgList -= (itemWidth * step);
      carouselList.style.transform = `translate(${currentPositionImgList}px, 0)`;
    }

    if (currentPositionImgList
      <= (images.length * itemWidth - frameSize * itemWidth) * -1) {
      event.currentTarget.disabled = true;
    }

    if (previousButton.disabled) {
      previousButton.disabled = false;
    }
  };

  const showPrevImg
  = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const carouselList
    = document.querySelector('.Carousel__list') as HTMLElement;
    const nextButton
    = document.querySelector('.NextButton') as HTMLButtonElement;
    const event = ev;

    if (currentPositionImgList < 0) {
      currentPositionImgList += (itemWidth * step);

      carouselList.style.transform = `translate(${currentPositionImgList}px, 0)`;
    }

    if (currentPositionImgList === 0) {
      event.currentTarget.disabled = true;
    }

    if (nextButton.disabled) {
      nextButton.disabled = false;
    }
  };

  return (
    <div className="Carousel" style={{ width: frameSize * itemWidth }}>
      <ul className="Carousel__list">
        {images.map(img => (
          <li key={images.indexOf(img)}>
            <img src={`${img}`} alt={`${images.indexOf(img)}`} />
          </li>
        ))}
      </ul>
      <div className="Buttons">
        <button
          className="PreviousButton"
          type="button"
          onClick={showPrevImg}
        >
          &#8592;
        </button>
        <button
          className="NextButton"
          type="button"
          onClick={showNexImg}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
