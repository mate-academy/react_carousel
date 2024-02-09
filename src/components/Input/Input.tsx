import React from 'react';
import './Input.scss';

interface Props {
  selectedSteps: number;
  selectedFrames: number;
  selectedWidth: number;
  selectedAnimation: number;
  setSelectedSteps:React.Dispatch<React.SetStateAction<number>>;
  setSelectedFrames:React.Dispatch<React.SetStateAction<number>>;
  setSelectedWidth:React.Dispatch<React.SetStateAction<number>>;
  setSelectedAnimation:React.Dispatch<React.SetStateAction<number>>;
}

const Input: React.FC<Props> = ({
  selectedSteps,
  setSelectedSteps,
  selectedFrames,
  setSelectedFrames,
  selectedWidth,
  setSelectedWidth,
  selectedAnimation,
  setSelectedAnimation,
}) => {
  return (
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
  );
};

export default Input;
