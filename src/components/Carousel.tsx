import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
}

const Carousel: React.FC<Props> = ({
  images,
}) => {
  const [selectedSteps, setSelectedSteps] = useState(3);
  const [selectedFrames, setSelectedFrames] = useState(3);
  const [selectedWidth, setSelectedWidth] = useState(190);
  const [selectedAnimation, setSelectedAnimation] = useState(1000);
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

      <div className="input">
        <div className="inputForm">
          <label htmlFor="StepsSelector">
            Steps
          </label>
          <input
            type="number"
            step={1}
            min={1}
            max={10}
            id="StepsSelector"
            value={selectedSteps}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSelectedSteps(+event.target.value);
              setXpos(0);
            }}
          />
        </div>
        <div className="inputForm">
          <label htmlFor="FramesSelector">
            Frames
          </label>
          <input
            type="number"
            step={1}
            min={1}
            max={10}
            id="FramesSelector"
            value={selectedFrames}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSelectedFrames(+event.target.value);
              setXpos(0);
            }}
          />
        </div>
        <div className="inputForm">
          <label htmlFor="WidthSelector">
            Items Width
          </label>
          <input
            type="number"
            step={20}
            min={130}
            max={190}
            id="WidthSelector"
            value={selectedWidth}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSelectedWidth(+event.target.value);
              setXpos(0);
            }}
          />
        </div>
        <div className="inputForm">
          <label htmlFor="AnimationSelector">
            Animation Duration
          </label>
          <input
            type="number"
            step={100}
            min={1000}
            max={2000}
            id="AnimationSelector"
            value={selectedAnimation}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSelectedAnimation(+event.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
