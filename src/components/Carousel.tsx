import React from 'react';
import './Carousel.scss';

interface Img {
  images: string[];
}

interface State {
  itemWidth: number;
  step: number;
  frameSize: number;
  position: number;
  animationDuration: number;
}

class Carousel extends React.Component<Img, State> {
  state = {
    itemWidth: 130,
    step: 3,
    frameSize: 3,
    position: 0,
    animationDuration: 1000,
  };

  moveRight = () => {
    if ((this.state.position - this.state.frameSize - this.state.step) > -10) {
      this.setState(props => ({ position: props.position - props.step }));
    } else {
      this.setState(props => ({ position: -10 + props.frameSize }));
    }
  };

  moveLeft = () => {
    if ((this.state.step + this.state.position) <= 0) {
      this.setState(props => ({ position: props.position + props.step }));
    } else {
      this.setState(() => ({ position: 0 }));
    }
  };

  render() {
    const { images } = this.props;
    const {
      itemWidth,
      step,
      frameSize,
      position,
      animationDuration,
    } = this.state;

    const frameSizeOptionArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const animSpeedOptionArr = [200, 500, 1000, 1500, 2000, 3000];
    const stepOptionArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const frameWidth = itemWidth * frameSize;
    const marginStep = position * itemWidth;

    return (
      <div className="carousel">
        <div className="carousel__wrap" style={{ width: `${frameWidth}px` }}>
          <ul
            className="carousel__list"
            style={
              {
                width: `${itemWidth * 10}px`,
                left: '100px',
                marginLeft: `${marginStep}px`,
                transition: `${animationDuration}ms`,
              }
            }
          >
            {images.map((imgLink: string) => (
              <li className="carousel__item" key={images.indexOf(imgLink)}>
                <img
                  src={imgLink}
                  alt="img"
                  style={{ width: `${itemWidth}px` }}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="carousel__btn-wrap">
          <button
            type="button"
            className="carousel__btn"
            onClick={() => {
              this.moveLeft();
            }}
          >
            Left
          </button>

          <button
            type="button"
            className="carousel__btn"
            onClick={() => {
              this.moveRight();
            }}
          >
            Right
          </button>
        </div>
        <br />

        <fieldset className="carousel__fieldset">
          <legend>Size item</legend>
          <input
            type="number"
            min="1"
            max="390"
            defaultValue={itemWidth}
            onChange={(event) => {
              this.setState({ itemWidth: +event.target.value });
            }}
          />
        </fieldset>

        <fieldset className="carousel__fieldset">
          <legend>Select frame size</legend>
          <select
            name="size"
            defaultValue={frameSize}
            onChange={(event) => {
              this.setState(
                { frameSize: +event.target.value },
              );
            }}
          >
            {frameSizeOptionArr.map((option: number) => (
              <option value={option}>
                {option}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset className="carousel__fieldset">
          <legend>Animation speed</legend>
          <select
            name="animationDuration"
            value={animationDuration}
            onChange={(event) => {
              this.setState(
                { animationDuration: +event.target.value },
              );
            }}
          >
            {animSpeedOptionArr.map((option: number) => (
              <option value={option}>
                {`${option / 1000}s`}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset className="carousel__fieldset">
          <legend>Step</legend>
          <select
            name="step"
            value={step}
            onChange={(event) => {
              this.setState(
                { step: +event.target.value },
              );
            }}
          >
            {stepOptionArr.map((option: number) => (
              <option value={option}>
                {option}
              </option>
            ))}
          </select>
        </fieldset>
      </div>
    );
  }
}

export default Carousel;
