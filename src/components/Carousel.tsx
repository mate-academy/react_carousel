import React from 'react';
import './Carousel.scss';
import { PropTypes } from './types/PropTypes';

type StateType = {
  valueOfTransform: number
};

export class Carousel extends React.Component<PropTypes, StateType> {
  state = {
    valueOfTransform: 0,
  };

  componentDidUpdate(prevProps: PropTypes) {
    if (this.props.maxValue > this.state.valueOfTransform) {
      if (prevProps.maxValue !== this.props.maxValue) {
        this.transforming(this.props.step, this.props.maxValue);
      }
    }
  }

  transforming = (step: number, maxValue: number) => {
    this.setState((prevState: StateType) : StateType | void => {
      const calc = (-100 * step) + prevState.valueOfTransform;

      if (maxValue >= calc) {
        return {
          valueOfTransform: maxValue,
        };
      }

      return {
        valueOfTransform: calc,
      };
    });
  };

  render() {
    const { images } = this.props;

    const {
      itemWidth, frameSize, step, delay, maxValue,
    } = this.props;

    const { valueOfTransform } = this.state;

    const itemStyle = {
      width: `${itemWidth}px`,
      height: `${itemWidth}px`,
      transition: `${delay}ms`,
      transform: `translate(${valueOfTransform}%)`,
    };

    const listStyle = {
      width: `${itemWidth * frameSize}px`,
      height: `${itemWidth}px`,
    };

    return (
      <>
        <div className="Carousel">
          <ul className="Carousel__list" style={listStyle}>
            {images.map((image, index) => (
              <li key={image}>
                <img
                  src={image}
                  alt={String(index + 1)}
                  style={itemStyle}
                />
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          disabled={valueOfTransform >= 0}
          onClick={() => this.setState((prevState: StateType) => {
            const calc = (100 * step) + prevState.valueOfTransform;

            if (calc > 0) {
              return {
                valueOfTransform: 0,
              };
            }

            return {
              valueOfTransform: calc,
            };
          })}
        >
          {'<--'}
        </button>
        {'  '}
        <button
          type="button"
          disabled={maxValue >= this.state.valueOfTransform}
          onClick={() => this.transforming(step, maxValue)}
        >
          {'-->'}
        </button>
      </>
    );
  }
}
