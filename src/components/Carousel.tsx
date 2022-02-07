import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
};

type State = {
  step: number,
  itemWidth: number,
  frameSize: number,
  animationDuration: number,
  location: number,
  infinity: boolean,
  disabledNext: boolean,
  disabledPrev: boolean,
};

class Carousel extends React.Component<Props, State> {
  state: State = {
    step: 3,
    itemWidth: 130,
    frameSize: 3,
    animationDuration: 1000,
    location: 0,
    infinity: false,
    disabledPrev: true,
    disabledNext: false,
  };

  handleNextClick = () => {
    const {
      location,
      infinity,
      itemWidth,
      step,
      frameSize,
    } = this.state;

    const initLocation = this.state.itemWidth * this.state.step;
    const width = (this.props.images.length - frameSize) * itemWidth;

    this.setState((prevState) => ({
      location: ((itemWidth * step) + prevState.location >= width)
        ? width
        : prevState.location + initLocation,
      disabledPrev: false,
    }));

    if (((location + initLocation) >= width) && !infinity) {
      this.setState({
        disabledNext: true,
      });
    }

    if (infinity && location >= width) {
      this.setState({
        location: 0,
        disabledNext: false,
      });
    }
  };

  handlePrevClick = () => {
    const { location } = this.state;
    const initLocation = this.state.itemWidth * this.state.step;

    this.setState((prevState) => ({
      location: (prevState.location - initLocation) > 0
        ? prevState.location - initLocation
        : 0,
      disabledNext: false,
    }));

    if ((location - initLocation) <= 0) {
      this.setState({
        disabledPrev: true,
      });
    }
  };

  getChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;

    this.setState({ [name]: +event.target.value } as unknown as Pick<State, keyof State>);
  };

  getInfinity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    this.setState(() => ({
      infinity: checked,
    }));

    if (checked === true) {
      this.setState(() => ({
        disabledNext: false,
      }));
    }
  };

  render() {
    const { images } = this.props;
    const {
      itemWidth,
      frameSize,
      animationDuration,
      location,
      disabledPrev,
      disabledNext,
      infinity,
      step,
    } = this.state;

    return (
      <div className="Carousel">
        <div
          className="Carousel__container"
          style={{ width: `${itemWidth * frameSize}px` }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(-${location}px)`,
              maxWidth: `${images.length * itemWidth}px`,
              transition: `${animationDuration}ms`,
            }}
          >
            {images.map(image => (
              <li key={images.indexOf(image)}>
                <img
                  src={image}
                  alt="img"
                  className="Carousel__list-img"
                  style={{
                    width: `${itemWidth}px`,
                    height: `${itemWidth}px`,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="btnBlock">
          <button
            type="button"
            onClick={this.handlePrevClick}
            disabled={disabledPrev}
          >
            Prev
          </button>
          <button
            type="button"
            onClick={this.handleNextClick}
            disabled={disabledNext}
          >
            Next
          </button>
        </div>
        <div className="controlBlock">
          <label htmlFor="frame">
            Choose frame size :
            <input
              type="number"
              id="frame"
              name="frameSize"
              value={frameSize}
              min="1"
              max={`${images.length}`}
              step={1}
              onChange={this.getChange}
            />
          </label>
          <label htmlFor="step">
            Choose step :
            <input
              type="number"
              id="step"
              name="step"
              value={step}
              min="1"
              max="7"
              step={1}
              onChange={this.getChange}
            />
          </label>
          <label htmlFor="itemWidth">
            Item Size :
            <input
              type="number"
              id="itemWidth"
              name="itemWidth"
              value={itemWidth}
              min="130"
              max="190"
              step={5}
              onChange={this.getChange}
            />
          </label>
          <label htmlFor="animationDuration">
            Animation :
            <input
              type="number"
              id="animationDuration"
              name="animationDuration"
              value={animationDuration}
              min="1000"
              max="3000"
              step={200}
              onChange={this.getChange}
            />
          </label>
          <label
            htmlFor="infinity"
            className="controlBlock__infinity"
          >
            Infinity:
            <input
              id="infinity"
              type="checkbox"
              name="Infinity"
              checked={infinity}
              onChange={this.getInfinity}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default Carousel;
