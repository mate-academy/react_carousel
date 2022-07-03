import React from 'react';
import './Carousel.scss';
import classNames from 'classnames';

type Props = {
  smiles: string[];
};

type State = {
  coordX: number;
  rightSidePic: number;
  width: number;
  size: number;
  step: number;
  animation: number;
};

class Carousel extends React.Component<Props, State> {
  state = {
    coordX: 0,
    rightSidePic: 10,
    width: 130,
    size: 3,
    step: 3,
    animation: 1000,
  };

  nextImages = () => {
    const {
      coordX, rightSidePic, width, size, step,
    } = this.state;

    if (coordX === -(width * 10
      - size * width)) {
      return;
    }

    if (rightSidePic - step <= size) {
      this.setState((state) => ({
        coordX: -(state.width * 10 - state.width * state.size),
        rightSidePic: state.size,
      }));
    } else {
      this.setState((state) => ({
        coordX: state.coordX - state.width * state.step,
        rightSidePic: state.rightSidePic - state.step,
      }));
    }
  };

  previousImages = () => {
    const { rightSidePic, step } = this.state;

    if (rightSidePic === 10) {
      return;
    }

    if (rightSidePic + step >= 10) {
      this.setState({ coordX: 0 });
      this.setState({ rightSidePic: 10 });
    } else {
      this.setState((state) => ({
        coordX: state.coordX + state.width * state.step,
        rightSidePic: state.rightSidePic + state.step,
      }));
    }
  };

  changeWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: +event.target.value });
    this.setState({ coordX: 0 });
  };

  changeSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ size: +event.target.value });
    this.setState({ coordX: 0 });
  };

  changeStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +event.target.value });
  };

  changeAnimation = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animation: +event.target.value });
  };

  render() {
    const {
      coordX, rightSidePic, width, size, step, animation,
    } = this.state;

    return (
      <div className="smallContainer" style={{ width: `${width * size}px` }}>
        <div className="container">
          <div className="Carousel">
            <ul
              className="Carousel_list"
              style={{
                transform: `translateX(${coordX}px)`,
                transition: `transform ${animation}ms`,
              }}
            >
              {this.props.smiles.map((smile, index) => (
                <li
                  key={smile}
                  className="list"
                >
                  <img
                    src={smile}
                    alt={String(index + 1)}
                    className="images"
                    style={{ width: `${width}px` }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="buttons">
          <button
            type="button"
            className={classNames(
              'button',
              {
                disabled: rightSidePic === 10,
              },
            )}
            onClick={this.previousImages}
          >
            Prev
          </button>

          <button
            type="button"
            className={classNames(
              'button',
              {
                disabled: coordX === -(width * 10 - size * width),
              },
            )}
            onClick={this.nextImages}
            data-cy="next"
          >
            Next
          </button>
        </div>

        <div className="constructor">
          <label className="label">
            {'ItemWidth: '}
            <input
              type="number"
              min={130}
              max={200}
              step={10}
              value={width}
              onChange={this.changeWidth}
            />
          </label>

          <label className="label">
            {'FrameSize: '}
            <input
              type="number"
              min={3}
              max={10}
              step={1}
              value={size}
              onChange={this.changeSize}
            />
          </label>

          <label className="label">
            {'Step: '}
            <input
              type="number"
              min={1}
              max={5}
              step={1}
              value={step}
              onChange={this.changeStep}
            />
          </label>

          <label className="label">
            {'AnimationDuration: '}
            <input
              type="number"
              min={1000}
              max={3000}
              step={500}
              value={animation}
              onChange={this.changeAnimation}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default Carousel;
