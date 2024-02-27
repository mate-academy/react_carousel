import React, { useState, useEffect } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
}) => {
  const [slide, setSlide] = useState(0);
  const [stepValue, setStepValue] = useState(step);
  const [frameSizeValue, setframeSizeValue] = useState(frameSize);
  const [itemWidthValue, setItemWidthValue] = useState(itemWidth);
  const [animDurValue, setAnimDurValue] = useState(animationDuration);
  const [isChecked, setIsChecked] = useState(infinite);

  const containerSize = itemWidthValue * frameSizeValue;
  const totalWidth = itemWidthValue * images.length;

  useEffect(() => {
    if (
      Math.abs(slide) + frameSizeValue * itemWidthValue > totalWidth &&
      frameSizeValue <= images.length
    ) {
      setSlide((totalWidth - containerSize) * -1);
    }
  }, [
    frameSizeValue,
    containerSize,
    itemWidthValue,
    slide,
    totalWidth,
    images.length,
  ]);

  return (
    <>
      <div className="inputBlock">
        <div className="inputWrapper">
          <input
            className="inputField"
            style={{ display: 'block' }}
            placeholder="scroll per cklick"
            type="number"
            value={stepValue}
            onChange={e => setStepValue(Number(e.target.value))}
          />
          <p>{'\u21E6'} scroll per cklick</p>
        </div>
        <div className="inputWrapper">
          <input
            className="inputField"
            style={{ display: 'block' }}
            placeholder="emojis on the screen"
            type="number"
            value={frameSizeValue}
            onChange={e => {
              if (Number(e.target.value) <= images.length) {
                setframeSizeValue(Number(e.target.value));
              }
            }}
          />
          <p>{'\u21E6'} emojis in frame</p>
        </div>
        <div className="inputWrapper">
          <input
            className="inputField"
            step={10}
            style={{ display: 'block' }}
            placeholder="emojies size"
            type="number"
            value={itemWidthValue}
            onChange={e => setItemWidthValue(Number(e.target.value))}
          />
          <p>{'\u21E6'} emojis size</p>
        </div>
        <div className="inputWrapper">
          <input
            className="inputField"
            step={100}
            style={{ display: 'block' }}
            placeholder="how fast to scroll? (ms)"
            type="number"
            value={animDurValue}
            onChange={e => setAnimDurValue(Number(e.target.value))}
          />
          <p>{'\u21E6'} scrolling speed (ms)</p>
        </div>
        <div className="inputWrapper">
          <input
            className="checkbox"
            style={{ display: 'block' }}
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <p>{'\u21E6'} infinity scrolling</p>
        </div>
      </div>

      <div className="Carousel">
        <button
          aria-disabled={!!(slide >= 0 && !isChecked)}
          className={`button ${slide >= 0 && !isChecked && 'disabled '}`}
          onClick={() => {
            if (slide >= 0 && isChecked) {
              setSlide((totalWidth - containerSize) * -1);
            } else if (slide * -1 < itemWidthValue * stepValue) {
              setSlide(0);
            } else {
              setSlide(slide - -(stepValue * itemWidthValue));
            }
          }}
          type="button"
        >
          {'\u21E6'}
        </button>

        <ul
          className="Carousel__list "
          style={{
            width: `${containerSize}px`,
          }}
        >
          {images.map((item: string, index: number) => (
            <li
              style={{
                transform: `translateX(${slide}px)`,
                transition: `all ${animDurValue}ms`,
              }}
              key={item}
            >
              <img
                style={{ width: `${itemWidthValue}px` }}
                src={item}
                alt={`${index}`}
              />
            </li>
          ))}
        </ul>

        <button
          aria-disabled={
            !!(slide <= (totalWidth - containerSize) * -1 && !isChecked)
          }
          className={`button ${slide <= (totalWidth - containerSize) * -1 && !isChecked && 'disabled '}`}
          onClick={() => {
            if (slide <= (totalWidth - containerSize) * -1 && isChecked) {
              setSlide(0);
            } else if (
              totalWidth - Math.abs(slide) - containerSize <
              stepValue * itemWidthValue
            ) {
              setSlide((totalWidth - containerSize) * -1);
            } else {
              setSlide(slide - stepValue * itemWidthValue);
            }
          }}
          type="button"
          data-cy="next"
        >
          {'\u21E8'}
        </button>
      </div>
    </>
  );
};

export default Carousel;
