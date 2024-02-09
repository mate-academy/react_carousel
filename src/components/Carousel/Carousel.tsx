import React, { useState } from 'react';
import './Carousel.scss';
import Input from '../Input/Input';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const [selectedSteps, setSelectedSteps] = useState(step);
  const [selectedFrames, setSelectedFrames] = useState(frameSize);
  const [selectedWidth, setSelectedWidth] = useState(itemWidth);
  const [selectedAnimation, setSelectedAnimation] = useState(animationDuration);
  const [xPos, setXpos] = useState(0);

  const maxItemsWidth = images.length * selectedWidth * -1;

  function prevBTN() {
    if (xPos < 0) {
      setXpos((prev) => {
        const newXPos = prev + selectedWidth * selectedSteps;

        return newXPos <= 0 ? newXPos : 0;
      });
    }
  }

  function nextBTN() {
    if (xPos > (selectedWidth * selectedFrames)
      - (images.length * selectedWidth)) {
      setXpos((prev) => {
        const newXPos = prev - selectedWidth * selectedSteps;
        const xPosLimit = maxItemsWidth + selectedWidth * selectedFrames;

        return newXPos >= xPosLimit ? newXPos : xPosLimit;
      });
    }
  }

  return (
    <div className="Carousel">
      <div
        className="CarouselWrapper"
        style={{
          width: selectedWidth * selectedFrames,
        }}
      >
        <ul
          className="CarouselList"
          style={{
            transform: `translateX(${xPos}px)`,
            transition: `${selectedAnimation}ms`,
            width: selectedWidth * selectedFrames,
          }}
        >
          {images.map(image => (
            <li
              key={image}
              className="CarouselPhoto"
              style={{
                left: `${xPos}px`,
              }}
            >
              <img
                src={image}
                alt={image}
                className="CarouselImage"
                style={{
                  width: selectedWidth,
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="buttonContainer">
        <button
          type="button"
          disabled={xPos === 0}
          className="button"
          onClick={prevBTN}
        >
          Prev
        </button>
        <button
          data-cy="next"
          type="button"
          disabled={xPos === maxItemsWidth + selectedWidth * selectedFrames}
          className="button"
          onClick={nextBTN}
        >
          Next
        </button>
      </div>
      <Input
        selectedSteps={selectedSteps}
        selectedFrames={selectedFrames}
        selectedAnimation={selectedAnimation}
        selectedWidth={selectedWidth}
        setSelectedAnimation={setSelectedAnimation}
        setSelectedFrames={setSelectedFrames}
        setSelectedSteps={setSelectedSteps}
        setSelectedWidth={setSelectedWidth}
      />
    </div>
  );
};

export default Carousel;
