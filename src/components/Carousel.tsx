// import { transform } from 'cypress/types/lodash';
import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
};
type State = {
  moveX: number,
};

export class Carousel extends React.Component<Props, State> {
  state: Readonly<State> = {
    moveX: 0,
  };

  // maxMove = this.props.frameSize * (10 - this.props.step);

  // distinationMove = this.props.step * this.props.frameSize;

  handleClickMoveRight = () => {
    const prevmoveX = this.state.moveX;
    const maxMove = this.props.frameSize * (10 - this.props.step);
    const distinationMove = this.props.step * this.props.frameSize;

    this.setState({
      moveX: ((prevmoveX - distinationMove) < (-maxMove))
        ? -maxMove
        : (prevmoveX - distinationMove),
    });
  };

  handleClickMoveLeft = () => {
    const prevmoveX = this.state.moveX;
    const distinationMove = this.props.step * this.props.frameSize;

    this.setState({
      moveX: ((prevmoveX + distinationMove) > 0)
        ? 0
        : (prevmoveX + distinationMove),
    });
  };

  render() {
    const {
      itemWidth,
      frameSize,
      animationDuration,
      step,
    } = this.props;

    const {
      moveX,
    } = this.state;

    return (
      <div
        className="Carousel"
        style={{
          width: itemWidth,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${moveX}px)`,
            transition: `transform  ${animationDuration}ms`,
          }}
        >
          {this.props.images.map((img, ind) => (
            <li className="oneImg" key={img}>
              <img
                src={img}
                style={{
                  width: frameSize,
                }}
                alt={String(ind + 1)}
              />
            </li>
          ))}
        </ul>
        <div className="buttonBlock">
          <button
            type="button"
            className="buttonBlock__button"
            onClick={this.handleClickMoveLeft}
            disabled={moveX === 0}
          >
            Prev
          </button>
          <button
            type="button"
            className="buttonBlock__button"
            data-cy="next"
            onClick={this.handleClickMoveRight}
            disabled={-moveX === frameSize * (10 - step)}
          >
            Next
          </button>

        </div>
      </div>
    );
  }
}
