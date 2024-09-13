import React from 'react';
import './CarouselSettings.scss';
import { Action } from '../../utils/types'; // Import Action type

interface Props {
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
  dispatch: React.Dispatch<Action>;
}

const CarouselSettings: React.FC<Props> = ({
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
  dispatch,
}) => {
  return (
    <fieldset className="CarouselSettings">
      <legend className="CarouselSettings__legend">Carousel Setup</legend>
      <label className="CarouselSettings__label" htmlFor="stepId">
        Step:
        <input
          id="stepId"
          className="CarouselSettings__input"
          type="number"
          value={step}
          onChange={e =>
            dispatch({ type: 'SET_STEP', payload: Number(e.target.value) })
          }
        />
      </label>
      <label className="CarouselSettings__label" htmlFor="frameId">
        Frame Size:
        <input
          id="frameId"
          className="CarouselSettings__input"
          type="number"
          value={frameSize}
          onChange={e =>
            dispatch({
              type: 'SET_FRAME_SIZE',
              payload: Number(e.target.value),
            })
          }
        />
      </label>
      <label className="CarouselSettings__label" htmlFor="itemId">
        Item Width:
        <input
          id="itemId"
          className="CarouselSettings__input"
          type="number"
          value={itemWidth}
          onChange={e =>
            dispatch({
              type: 'SET_ITEM_WIDTH',
              payload: Number(e.target.value),
            })
          }
        />
      </label>
      <label className="CarouselSettings__label" htmlFor="animDurId">
        Animation Duration:
        <input
          id="animDurId"
          className="CarouselSettings__input"
          type="number"
          value={animationDuration}
          onChange={e =>
            dispatch({
              type: 'SET_ANIMATION_DURATION',
              payload: Number(e.target.value),
            })
          }
        />
      </label>
      <label className="CarouselSettings__label" htmlFor="infinityId">
        Infinite:
        <input
          id="infinityId"
          className="CarouselSettings__input"
          type="checkbox"
          checked={infinite}
          onChange={() =>
            dispatch({
              type: 'SET_INFINITE',
              payload: !infinite,
            })
          }
        />
      </label>
    </fieldset>
  );
};

export default CarouselSettings;
