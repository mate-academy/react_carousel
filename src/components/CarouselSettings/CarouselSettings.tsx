import { useContext } from 'react';
import { CarouselContext } from '../../Context/CarouselContext';
import './CarouselSettings.scss';

export const CarouselSettings = () => {
  const {
    itemWidth,
    setItemWidth,
    frameSize,
    setFrameSize,
    step,
    setStep,
    animationDuration,
    setAnimationDuration,
    infinite,
    setInfinite,
  } = useContext(CarouselContext);

  return (
    <div className="carousel-settings">
      <label className="carousel-settings-item" htmlFor="itemId">
        Item Width:
        <input
          id="itemId"
          className="carousel-settings-input"
          type="number"
          value={itemWidth}
          onChange={e => setItemWidth(Number(e.target.value))}
        />
      </label>
      <label className="carousel-settings-item" htmlFor="frameId">
        Frame Size:
        <input
          id="frameId"
          className="carousel-settings-input"
          type="number"
          value={frameSize}
          onChange={e => setFrameSize(Number(e.target.value))}
        />
      </label>
      <label className="carousel-settings-item" htmlFor="stepId">
        Step:
        <input
          id="stepId"
          className="carousel-settings-input"
          type="number"
          value={step}
          onChange={e => setStep(Number(e.target.value))}
        />
      </label>
      <label className="carousel-settings-item" htmlFor="animationDurationId">
        Animation Duration:
        <input
          id="animationDurationId"
          className="carousel-settings-input"
          type="number"
          value={animationDuration}
          onChange={e => setAnimationDuration(Number(e.target.value))}
        />
      </label>
      <label className="carousel-settings-item" htmlFor="infiniteId">
        Infinite:
        <input
          id="infiniteId"
          className="carousel-settings-input"
          type="checkbox"
          checked={infinite}
          onChange={e => setInfinite(e.target.checked)}
        />
      </label>
    </div>
  );
};
