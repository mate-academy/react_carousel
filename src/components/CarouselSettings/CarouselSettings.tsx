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
      <label htmlFor="itemWidth">Item Width:</label>
      <input
        type="text"
        name="itemWidth"
        value={itemWidthState}
        onChange={e => {
          setItemWidthState(+e.target.value);
        }}
      />
      <br />
      <label htmlFor="frameSize">Frame Size:</label>
      <input
        type="text"
        name="frameSize"
        value={frameSizeState}
        onChange={e => {
          setFrameSizeState(+e.target.value);
        }}
      />
      <br />
      <label htmlFor="step">Step:</label>
      <input
        type="text"
        name="step"
        value={stepState}
        onChange={e => {
          setStepState(+e.target.value);
        }}
      />
      <br />
      <label htmlFor="animationDuration">Animation Duration:</label>
      <input
        type="text"
        name="animationDuration"
        value={animationDurationState}
        onChange={e => {
          setAnimationDurationState(+e.target.value);
        }}
      />
    </div>
  );
};

export default CarouselSettings;
