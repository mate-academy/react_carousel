import React, { useState, useEffect } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [stepChange, setStepChange] = useState(step);
  const [frameSizeChange, setFrameSizeChange] = useState(frameSize);
  const [itemWidthChange, setItemWidthChange] = useState(itemWidth);
  const [duration, setDuration] = useState(animationDuration);
  const [infiniteImg, setInfiniteImg] = useState(infinite);
  const [visibleIndex, setVisibleIndex] = useState(0);

  const handleNext = () => {
    const newIndex = (visibleIndex + stepChange) % images.length;

    setVisibleIndex(newIndex);

    if (images.length - (visibleIndex + frameSizeChange) < stepChange) {
      setVisibleIndex((images.length - stepChange));
    }
  };

  const handlePrev = () => {
    const newIndex = (visibleIndex - stepChange);

    setVisibleIndex(newIndex);

    if ((visibleIndex - frameSizeChange) < 0) {
      setVisibleIndex((0));
    }
  };

  const handleFrameSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFrameSize = parseInt(e.target.value, 10);

    setFrameSizeChange(newFrameSize);
    setVisibleIndex(0);
  };

  useEffect(() => {
    const wrapElement = document.querySelector('.Carousel') as HTMLElement;
    const imgElements = document.querySelectorAll(
      '.Carousel__img',
    ) as NodeListOf<HTMLElement>;

    imgElements.forEach((imgElem) => {
      const newElem = imgElem;

      newElem.style.width = `${itemWidthChange}px`;
      newElem.style.height = `${itemWidthChange}px`;
    });

    if (wrapElement) {
      wrapElement.style.transition = `all ${duration}ms ease-in-out`;
    }
  }, [itemWidthChange, duration]);

  const visiblePhoto = images.slice(
    visibleIndex, visibleIndex + frameSizeChange,

  );

  return (
    <div className="MainWrap">
      <div className="Carousel">
        <ul className="Carousel__list">
          {visiblePhoto.map((elem, index) => (
            <li key={elem}>
              <img key={elem} src={elem} alt={`${index + 1}`} className="Carousel__img" />
            </li>
          ))}
        </ul>
      </div>
      <div className="Carousel__buttons">
        <button
          type="button"
          className="Carousel__button"
          onClick={handlePrev}
          disabled={visibleIndex === 0 && !infiniteImg}
        >
          {'< Prev'}
        </button>
        <button
          type="button"
          className="Carousel__button"
          onClick={handleNext}
          disabled={visibleIndex >= images.length - stepChange && !infiniteImg}
        >
          {'Next >'}
        </button>
      </div>
      <div className="Carousel__interactionForms">
        <form>
          <label htmlFor="step">Choose a step:</label>
          <input
            id="step"
            min={2}
            max={4}
            type="number"
            onChange={(e) => {
              setStepChange(parseInt(e.target.value, 10));
              setVisibleIndex(0);
            }}
            value={stepChange}
          />
          <label htmlFor="frameSize">Choose a size frame:</label>
          <input
            id="frameSize"
            min={2}
            max={5}
            type="number"
            onChange={handleFrameSizeChange}
            value={frameSizeChange}
          />
          <label htmlFor="itemWidth">Choose a width item:</label>
          <input
            id="itemWidth"
            min={130}
            max={150}
            type="number"
            onChange={(e) => setItemWidthChange(parseInt(e.target.value, 10))}
            value={itemWidthChange}
          />
          <label htmlFor="duration">Choose a duration animation:</label>
          <input
            id="duration"
            type="number"
            min={1000}
            max={5000}
            step={50}
            onChange={(e) => setDuration(parseInt(e.target.value, 10))}
            value={duration}
          />
          <label htmlFor="checkbox">infinite</label>
          <input
            id="checkbox"
            type="checkbox"
            onChange={(e) => {
              setInfiniteImg(e.target.checked);
              setVisibleIndex(0);
            }}
            checked={infiniteImg}
          />
        </form>
      </div>
    </div>
  );
};

export default Carousel;
