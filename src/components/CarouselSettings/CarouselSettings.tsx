import { ChangeEvent, PureComponent } from 'react';
import './CarouselSettings.scss';

interface Props {
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
  handleItemWidthChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleFrameSizeChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleDurationChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleStepChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleInfiniteChange: () => void
}

export class CarouselSettings extends PureComponent<Props> {
  render() {
    const {
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
      handleItemWidthChange,
      handleFrameSizeChange,
      handleDurationChange,
      handleStepChange,
      handleInfiniteChange,
    } = this.props;

    return (
      <div className="settings">
        <label
          htmlFor="item-width"
          className="settings__block"
        >
          <p className="settings__title">Item width:</p>

          <input
            className="settings__input"
            min={130}
            max={250}
            step={10}
            type="number"
            name="itemWidth"
            value={itemWidth}
            onChange={handleItemWidthChange}
          />
        </label>

        <label
          htmlFor="frame-size"
          className="settings__block"
        >
          <p className="settings__title">Frame size:</p>

          <input
            className="settings__input"
            type="number"
            name="frameSize"
            max={5}
            min={1}
            value={frameSize}
            onChange={handleFrameSizeChange}
          />
        </label>

        <label
          htmlFor="animation-duration"
          className="settings__block"
        >
          <p className="settings__title">Animation duration:</p>

          <input
            className="settings__input"
            type="number"
            step={100}
            min={100}
            name="animationDuration"
            value={animationDuration}
            onChange={handleDurationChange}
          />
        </label>

        <label
          htmlFor="step"
          className="settings__block"
        >
          <p className="settings__title">Step:</p>

          <input
            className="settings__input"
            type="number"
            name="step"
            max={5}
            min={1}
            value={step}
            onChange={handleStepChange}
          />
        </label>

        <label
          htmlFor="infinite"
          className="settings__block"
        >
          <p className="settings__title">Infinite carousel:</p>

          <input
            className="settings__input-checkbox"
            type="checkbox"
            name="infinite"
            checked={infinite}
            onChange={handleInfiniteChange}
          />
        </label>
      </div>
    );
  }
}
