import React from 'react';
import './Carousel.scss';

type Props = {
  smiles: string[];
};

type State = {
  x: number;
  n: number;
  width: number;
  size: number;
  step: number;
  animation: number;
};

class Carousel extends React.Component<Props, State> {
  state = {
    x: 0,
    n: 10,
    width: 130,
    size: 3,
    step: 3,
    animation: 1000,
  };

  nextImages = () => {
    if (this.state.x === -(this.state.width * 10
      - this.state.size * this.state.width)) {
      return;
    }

    if (this.state.n - this.state.step <= this.state.size) {
      this.setState((state) => ({
        x: -(state.width * 10 - state.width * state.size),
        n: state.size,
      }));
    } else {
      this.setState((state) => ({
        x: state.x - state.width * state.step,
        n: state.n - state.step,
      }));
    }
  };

  previousImages = () => {
    if (this.state.n === 10) {
      return;
    }

    if (this.state.n + this.state.step >= 10) {
      this.setState({ x: 0 });
      this.setState({ n: 10 });
    } else {
      this.setState((state) => ({
        x: state.x + state.width * state.step,
        n: state.n + state.step,
      }));
    }
  };

  changeWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: +event.target.value });
    this.setState({ x: 0 });
  };

  changeSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ size: +event.target.value });
    this.setState({ x: 0 });
  };

  changeStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +event.target.value });
  };

  changeAnimation = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animation: +event.target.value });
  };

  render() {
    const {
      x, n, width, size, step, animation,
    } = this.state;

    return (
      <div className="smallContainer" style={{ width: `${width * size}px` }}>
        <div className="container">
          <div className="Carousel">
            <ul
              className="Carousel_list"
              style={{
                transform: `translateX(${x}px)`,
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
            className={`button ${n === 10 ? 'disabled' : ''}`}
            onClick={this.previousImages}
          >
            Prev
          </button>

          <button
            type="button"
            className={`button ${x === -(width * 10 - size * width) ? 'disabled' : ''}`}
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
