/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react';
import { Carousel } from '../Carousel';
import './Form.scss';

type Props = {
  images: string[],
};

type State = {
  frameSize: number,
  itemWidth: number,
  step: number,
  animationDuration: number,
  infinite: boolean,
};

export class Form extends React.Component<Props, State> {
  state = {
    frameSize: 390,
    itemWidth: 130,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  };

  render() {
    const {
      frameSize,
      itemWidth,
      step,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <>
        <div
          className="field"
          style={{ width: `${frameSize}px` }}
        >
          <label className="label" htmlFor="width">
            Item width
            <input
              id="width"
              className="input"
              type="number"
              defaultValue={itemWidth}
              onChange={({ target }) => {
                this.setState((state: State) => {
                  return (
                    {
                      itemWidth: +target.value,
                      frameSize: +target.value * state.step,
                    }
                  );
                });
              }}
            />
          </label>
          <label className="label" htmlFor="step">
            Step
            <input
              id="step"
              className="input"
              type="number"
              defaultValue={step}
              onChange={({ target }) => {
                this.setState((state: State) => {
                  return (
                    {
                      step: +target.value,
                      frameSize: +target.value * state.itemWidth,
                    }
                  );
                });
              }}
            />
          </label>
          <label className="label" htmlFor="duration">
            Animation duration
            <input
              id="duration"
              className="input"
              type="number"
              defaultValue={animationDuration}
              onChange={({ target }) => {
                this.setState({ animationDuration: +target.value });
              }}
            />
          </label>
          <label className="label" htmlFor="Infinite">
            Infinite
            <input
              type="checkbox"
              id="Infinite"
              className="checkbox"
              onChange={() => {
                this.setState({
                  infinite: !infinite,
                });
              }}
            />
          </label>
        </div>
        <Carousel
          images={this.props.images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </>
    );
  }
}
