import { FC, ChangeEvent } from 'react';
import './Settings.scss';

type EventHandler = (event: ChangeEvent<HTMLInputElement>) => void;

type Props = {
  itemWidth: number;
  frameSize: number;
  step: number;
  duration: number;
  infinite: boolean;
  onWidthChange: EventHandler;
  onFrameSizeChange: EventHandler;
  onStepSizeChange: EventHandler;
  onDurationChange: EventHandler;
  onInfiniteToggle: (status: boolean) => void;
};

export const Settings: FC<Props> = ({
  itemWidth,
  frameSize,
  step,
  duration,
  infinite,
  onWidthChange,
  onFrameSizeChange,
  onDurationChange,
  onInfiniteToggle,
  onStepSizeChange,
}) => {
  return (
    <div className="settings">
      <label className="settings__label" htmlFor="widthId">
        <p>Items width: </p>

        <input
          className="settings__input"
          id="widthId"
          type="number"
          defaultValue={itemWidth}
          min="100"
          max="300"
          onChange={onWidthChange}
        />
      </label>

      <label className="settings__label" htmlFor="frameId">
        <p>Amount of images in frame: </p>

        <input
          className="settings__input"
          id="frameId"
          type="number"
          min="1"
          max="5"
          defaultValue={frameSize}
          onChange={onFrameSizeChange}
        />
      </label>

      <label className="settings__label" htmlFor="stepId">
        <p>Step size: </p>

        <input
          className="settings__input"
          id="stepId"
          type="number"
          min={1}
          max={5}
          defaultValue={step}
          onChange={onStepSizeChange}
        />
      </label>

      <label className="settings__label" htmlFor="animationId">
        <p>Set animation duration in ms: </p>

        <input
          className="settings__input"
          id="animationId"
          type="number"
          step="100"
          min={0}
          defaultValue={duration}
          onChange={onDurationChange}
        />
      </label>

      <label className="settings__label" htmlFor="infiniteId">
        <p>Infinite: </p>

        <input
          className="settings__checkbox"
          id="infiniteId"
          type="checkbox"
          checked={infinite}
          onChange={(event) => onInfiniteToggle(event.target.checked)}
        />
      </label>
    </div>
  );
};
