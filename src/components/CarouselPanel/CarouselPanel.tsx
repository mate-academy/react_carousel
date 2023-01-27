import { Component } from 'react';
import { NewOptions } from '../../types/newOptions';
import { Options } from '../../types/options';
import './CarouselPanel.scss';

type Props = {
  options: Options,
  changeOptions: (value: NewOptions) => void,
};

export class CarouselPanel extends Component<Props, {}> {
  state = {};

  render() {
    const {
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props.options;
    const { changeOptions } = this.props;

    return (
      <div className="CarouselPanel">
        <form className="box">
          <div className="field">
            <label className="label" htmlFor="stepId">
              Step:
            </label>
            <div className="control">
              <input
                className="input is-primary"
                id="stepId"
                type="number"
                value={step}
                min="1"
                max="10"
                step="1"
                onChange={(e) => changeOptions({
                  step: +e.currentTarget.value,
                })}
              />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="itemId">
              Image Size:
            </label>
            <div className="control">
              <input
                className="input is-primary"
                id="itemId"
                type="number"
                value={itemWidth}
                min="130"
                max="400"
                step="5"
                onChange={(e) => changeOptions({
                  itemWidth: +e.currentTarget.value,
                })}
              />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="frameId">
              Frame size:
            </label>
            <div className="control">
              <input
                className="input is-primary"
                id="frameId"
                type="number"
                value={frameSize}
                min="1"
                max="10"
                step="1"
                onChange={(e) => changeOptions({
                  frameSize: +e.currentTarget.value,
                })}
              />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="animation-duration">
              Animation duration:
            </label>
            <div className="control">
              <input
                className="input is-primary"
                id="animation-duration"
                type="number"
                value={animationDuration}
                min="500"
                max="5000"
                step="100"
                onChange={(e) => changeOptions({
                  animationDuration: +e.currentTarget.value,
                })}
              />
            </div>
          </div>

          <div className="control">
            <input
              className="infinite-checkbox"
              id="infinite-checkbox"
              type="checkbox"
              checked={infinite}
              onChange={() => changeOptions({
                infinite: !infinite,
              })}
            />
            <label className="checkbox" htmlFor="infinite-checkbox">
              Infinite
            </label>
          </div>
        </form>
      </div>
    );
  }
}
