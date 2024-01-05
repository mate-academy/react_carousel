import React from 'react';
import './CarouselSettings.scss';

type Props = {
  itemWidthState: number;
  setItemWidthState:React.Dispatch<React.SetStateAction<number>>;
  frameSizeState: number;
  setFrameSizeState:React.Dispatch<React.SetStateAction<number>>;
  stepState: number;
  setStepState:React.Dispatch<React.SetStateAction<number>>;
  animationDurationState:number;
  setAnimationDurationState:React.Dispatch<React.SetStateAction<number>>;
};

const CarouselSettings:React.FC<Props> = ({
  itemWidthState,
  setItemWidthState,
  frameSizeState,
  setFrameSizeState,
  stepState,
  setStepState,
  animationDurationState,
  setAnimationDurationState,
}) => {
  return (
    <div className="carouselSettings">
      <label className="settingName" htmlFor="itemId">Item Width:</label>
      <input
        type="number"
        id="itemId"
        value={itemWidthState}
        onChange={e => {
          setItemWidthState(+e.target.value);
        }}
      />
      <br />
      <label className="settingName" htmlFor="frameId">Frame Size:</label>
      <input
        type="number"
        id="frameId"
        value={frameSizeState}
        onChange={e => {
          setFrameSizeState(+e.target.value);
        }}
      />
      <br />
      <label className="settingName" htmlFor="stepId">Step:</label>
      <input
        type="number"
        id="stepId"
        value={stepState}
        onChange={e => {
          setStepState(+e.target.value);
        }}
      />
      <br />
      <label
        className="settingName"
        htmlFor="animationDuration"
      >
        Animation Duration:
      </label>
      <input
        type="number"
        id="animationDuration"
        value={animationDurationState}
        onChange={e => {
          setAnimationDurationState(+e.target.value);
        }}
      />
    </div>
  );
};

export default CarouselSettings;
