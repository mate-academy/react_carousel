import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
};

type State = {
  width: number,
  count: number,
  position: number,
  step: number,
  speed: number,
};

class Carousel extends React.Component<Props, State> {
  state = {
    width: 130,
    count: 3,
    position: 0,
    step: 3,
    speed: 1000,
  };

  moveLeft = () => {
    if (this.state.position + this.state.count >= 10) {
      return;
    }

    this.setState((state) => ({
      position: state.position + state.step,
    }));
  };

  moveRight = () => {
    if (this.state.position < 0) {
      this.setState(() => ({
        position: 0,
      }));

      return;
    }

    this.setState((state) => ({
      position: state.position - state.step,
    }));
  };

  render() {
    const { images } = this.props;
    const {
      count,
      position,
      width,
      step,
      speed,
    } = this.state;

    return (
      <>
        <div className="Carousel" style={{ width: `${count * width}px` }}>
          <ul className="Carousel__list" style={{ marginLeft: `-${position * width}px`, transition: `${speed}ms` }}>
            {images.map((image) => (
              <li key={image}>
                <img
                  src={image}
                  width={width}
                  alt="smile"
                  className="Carousel__img"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="Carousel__controlles">
          <div>
            <button
              type="button"
              className="Carousel__move-btn"
              onClick={() => {
                this.moveRight();
              }}
            >
              &#8249;
            </button>
              &nbsp;
            <button
              type="button"
              className="Carousel__move-btn"
              onClick={() => {
                this.moveLeft();
              }}
            >
              &#8250;
            </button>
          </div>
          <label htmlFor="selectCount">
            Count:
            <select
              className="Carousel__select-count"
              id="selectCount"
              value={count}
              onChange={(event) => {
                this.setState({ count: +event.target.value });
              }}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </select>
          </label>
          <label htmlFor="selectStep">
            Step:
            <select
              className="Carousel__select-step"
              id="selectStep"
              value={step}
              onChange={(event) => {
                this.setState({ step: +event.target.value });
              }}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </select>
          </label>
          <label htmlFor="selectSize">
            Size:
            <input
              type="range"
              id="selectSize"
              min="80"
              max="160"
              value={width}
              step="10"
              onChange={(event) => {
                this.setState({ width: +event.target.value });
              }}
            />
          </label>
          <label htmlFor="selectSpeed">
            Transition speed:
            <input
              type="range"
              id="selectSpeed"
              min="300"
              max="2000"
              value={speed}
              step="100"
              onChange={(event) => {
                this.setState({ speed: +event.target.value });
              }}
            />
          </label>
        </div>
      </>
    );
  }
}

export default Carousel;
