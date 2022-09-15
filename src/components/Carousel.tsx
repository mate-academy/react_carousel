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

  handleClickMoveRight = () => {
    const prevmoveX = this.state.moveX;
    const maxMove = this.props.itemWidth * (10 - this.props.frameSize);
    const distinationMove = this.props.step * this.props.itemWidth;

    this.setState({
      moveX: ((prevmoveX - distinationMove) < (-maxMove))
        ? -maxMove
        : (prevmoveX - distinationMove),
    });
  };

  handleClickMoveLeft = () => {
    const prevmoveX = this.state.moveX;
    const distinationMove = this.props.step * this.props.itemWidth;

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
          disabled={moveX === 0}
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
          disabled={-moveX === itemWidth * (10 - frameSize)}
        >
          {'>'}
        </button>
      </div>
    );
  }
}
