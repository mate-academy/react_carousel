import React from 'react';
import './CarouselSetting.scss';

interface Props {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  setStep: (newStep: number) => void,
  setFrameSize: (newFrameSize: number) => void,
  setItemWidth: (newItemWidth: number) => void,
  setAnimationDuration: (newAnimationDuration: number) => void,
  setInfinite: (newInfinite: boolean) => void,
}

const CarouselSetting: React.FC<Props> = ({
  images,
  step,
  setStep,
  frameSize,
  setFrameSize,
  itemWidth,
  setItemWidth,
  animationDuration,
  setAnimationDuration,
  setInfinite,
}) => (
  <form className="form">
    <label className="form__label" htmlFor="stepId">
      Step:
      <input
        id="stepId"
        type="number"
        className="form__input"
        min={1}
        max={images.length - frameSize}
        value={step}
        onChange={e => setStep(+e.currentTarget.value)}
      />
    </label>
    <label className="form__label" htmlFor="frameId">
      Frame size:
      <input
        id="frameId"
        type="number"
        className="form__input"
        min={1}
        max={images.length}
        value={frameSize}
        onChange={e => setFrameSize(+e.currentTarget.value)}
      />
    </label>
    <label className="form__label" htmlFor="itemId">
      Item width:
      <input
        id="itemId"
        type="number"
        className="form__input"
        min={10}
        step={10}
        value={itemWidth}
        onChange={e => setItemWidth(+e.currentTarget.value)}
      />
    </label>
    <label className="form__label" htmlFor="animationDurationId">
      Animation duration:
      <input
        id="animationDurationId"
        type="number"
        className="form__input"
        min={0}
        step={100}
        value={animationDuration}
        onChange={e => setAnimationDuration(+e.currentTarget.value)}
      />
    </label>
    <label className="form__label" htmlFor="infiniteId">
      Infinite:
      <input
        id="infiniteId"
        type="checkbox"
        className="form__input"
        onChange={e => setInfinite(e.target.checked)}
      />
    </label>
  </form>
);

export default CarouselSetting;
