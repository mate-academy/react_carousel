/* eslint-disable no-nested-ternary */
// import { transform } from 'cypress/types/lodash';
import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};
type State = {
  moveX: number,
};

export class Carousel extends React.Component<Props, State> {
  state: Readonly<State> = {
    moveX: 0,
  };

  maxMove = () => -(this.props.itemWidth * (10 - this.props.frameSize));

  distinationMove = () => (this.props.step * this.props.itemWidth);

  handleClickMoveRight = () => {
    if (this.state.moveX === (this.maxMove()) && this.props.infinite) {
      this.setState({ moveX: 0 });
    } else {
      this.setState(prevstate => ({
        moveX: ((prevstate.moveX - this.distinationMove()) < (this.maxMove()))
          ? this.maxMove()
          : (prevstate.moveX - this.distinationMove()),
      }));
    }
  };

  handleClickMoveLeft = () => {
    if (this.state.moveX === 0 && this.props.infinite) {
      this.setState({ moveX: this.maxMove() });
    } else {
      this.setState(prevstate => ({
        moveX: ((prevstate.moveX + this.distinationMove()) > 0)
          ? 0
          : (prevstate.moveX + this.distinationMove()),
      }));
    }
  };

  render() {
    const {
      itemWidth,
      frameSize,
      animationDuration,
      infinite,
    } = this.props;

    const {
      moveX,
    } = this.state;

    const width:number = frameSize * itemWidth;

    return (
      <div
        className="Carousel"
      >
        <button
          type="button"
          className="button"
          onClick={this.handleClickMoveLeft}
          disabled={moveX === 0 && !infinite}
        >
          {'<'}
        </button>

        <div className="Carousel__box">
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(${moveX}px)`,
              transition: `transform  ${animationDuration}ms`,
              width,
            }}
          >
            {this.props.images.map((img, ind) => (
              <li className="oneImg" key={img}>
                <img
                  src={img}
                  style={{
                    width: itemWidth,
                  }}
                  alt={String(ind + 1)}
                />
              </li>
            ))}
          </ul>

        </div>

        <button
          type="button"
          className="button"
          data-cy="next"
          onClick={this.handleClickMoveRight}
          disabled={-moveX === itemWidth * (10 - frameSize) && !infinite}
        >
          {'>'}
        </button>
      </div>
    );
  }
}
