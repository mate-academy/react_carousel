import React, { useState, useRef } from 'react';
import './Carousel.scss';

interface Props {
  img: string[];
}

const Carousel: React.FC<Props> = ({ img }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselListRef = useRef<HTMLUListElement>(null);

  const [imgWight, setImgWidth] = useState<number>(130);
  const [step, setStep] = useState<number>(3);
  const [animDuration, setAnimDuration] = useState<number>(1000);

  const scrollContainer = (amount: number) => {
    const carouselList = carouselListRef.current;
    const imageWidth = carouselList?.querySelector('li')?.offsetWidth || 0;
    const newIndex = currentIndex + amount;

    if (newIndex >= 0 && newIndex < img.length) {
      setCurrentIndex(newIndex);
      const newScrollAmount = newIndex * imageWidth;

      if (carouselList) {
        carouselList.style.transform = `translateX(-${newScrollAmount}px)`;
      }
    }
  };

  const handleImgWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newImgWidth = parseInt(event.target.value, 10);

    setImgWidth(newImgWidth);
    scrollContainer(0);

    const carouselImgElements = document.querySelectorAll('.Carousel__img');

    const imgElementsArray = Array
      .from(carouselImgElements) as HTMLImageElement[];

    imgElementsArray.forEach((imgElement) => {
      if (imgElement instanceof HTMLImageElement) {
        const imgElementCopy = imgElement.cloneNode(true) as HTMLImageElement;

        imgElementCopy.style.width = `${newImgWidth}px`;
        imgElement.parentElement?.replaceChild(imgElementCopy, imgElement);
      }
    });

    const containerElement = document.querySelector('.Carousel__container');
    const containerElementCopy = containerElement as HTMLElement;
    const newContainerWidth = newImgWidth * step;

    containerElementCopy.style.width = `${newContainerWidth}px`;
  };

  const handleStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStep = parseInt(event.target.value, 10);

    setStep(newStep);
  };

  const handleAnimDurationChange = (event: React
    .ChangeEvent<HTMLInputElement>) => {
    const newAnimDuration = parseInt(event.target.value, 10);

    setAnimDuration(newAnimDuration);

    const carouselList = document.querySelector('.Carousel__list');
    const carouselListCopy = carouselList as HTMLElement;

    carouselListCopy.style.transition = `transform ${newAnimDuration}ms ease-in`;
  };

  return (
    <div className="Carousel">
      <div className="Carousel__container">
        <ul className="Carousel__list" ref={carouselListRef}>
          {img.map((currImg, index) => (
            <li
              key={`${index + 1}`}
              className="Carousel__item"
            >
              <img
                src={currImg}
                alt={`${index}`}
                className="Carousel__img"
              />
            </li>
          ))}
        </ul>

        <div className="Carousel__control">
          <button
            type="button"
            className="Carousel__btn Carousel__btn_prev"
            onClick={() => scrollContainer(-step)}
          >
            Prev
          </button>

          <button
            type="button"
            className="Carousel__btn Carousel__btn_next"
            data-cy="next"
            onClick={() => scrollContainer(step)}
          >
            Next
          </button>
        </div>

        <div className="Carousel__inputs">
          <label className="Carousel__label">
            Image width
            <input
              type="number"
              value={imgWight}
              min={50}
              max={350}
              className="Carousel__input"
              placeholder="Enter numbers in px"
              onChange={handleImgWidthChange}
            />
          </label>
          <label className="Carousel__label">
            Step
            <input
              type="number"
              value={step}
              min={1}
              max={img.length - 1}
              className="Carousel__input"
              placeholder="Enter numbers"
              onChange={handleStepChange}
            />
          </label>
          <label className="Carousel__label">
            Animation duration
            <input
              type="number"
              value={animDuration}
              step={500}
              min={500}
              max={2500}
              className="Carousel__input"
              placeholder="Enter numbers is seconds"
              onChange={handleAnimDurationChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
