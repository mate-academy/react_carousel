import React from 'react';

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
    <div className="Carousel__settings">
      <label htmlFor="itemId">Item Width:</label>
      <input
        type="text"
        id="itemId"
        value={itemWidthState}
        onChange={e => {
          setItemWidthState(+e.target.value);
        }}
      />
      <br />
      <label htmlFor="frameId">Frame Size:</label>
      <input
        type="text"
        id="frameId"
        value={frameSizeState}
        onChange={e => {
          setFrameSizeState(+e.target.value);
        }}
      />
      <br />
      <label htmlFor="stepId">Step:</label>
      <input
        type="text"
        id="stepId"
        value={stepState}
        onChange={e => {
          setStepState(+e.target.value);
        }}
      />
      <br />
      <label htmlFor="animationDuration">Animation Duration:</label>
      <input
        type="text"
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
