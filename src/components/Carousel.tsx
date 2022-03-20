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

    const frameWidth = itemWidth * frameSize;
    const marginStep = position * itemWidth;

    return (
      <div className="Carousel">
        <div className="Carousel__wrap" style={{ width: `${frameWidth}px`, overflow: 'hidden' }}>
          <ul
            className="Carousel__list"
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
              <li className="Carousel__item" key={images.indexOf(imgLink)}>
                <img
                  src={imgLink}
                  alt="img"
                  style={{ width: `${itemWidth}px` }}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="Carousel__btn-wrap">
          <button
            type="button"
            className="Carousel__btn"
            onClick={() => {
              this.moveLeft();
            }}
          >
            Left
          </button>

          <button
            type="button"
            className="Carousel__btn"
            onClick={() => {
              this.moveRight();
            }}
          >
            Right
          </button>
        </div>
        <br />

        <fieldset className="Carousel__fieldset">
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

        <fieldset className="Carousel__fieldset">
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
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </fieldset>

        <fieldset className="Carousel__fieldset">
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
            <option value="200">0.2s</option>
            <option value="500">0.5s</option>
            <option value="1000">1s</option>
            <option value="1500">1.5s</option>
            <option value="2000">2s</option>
            <option value="3000">3s</option>
          </select>
        </fieldset>

        <fieldset className="Carousel__fieldset">
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
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </fieldset>
      </div>
    );
  }
}

export default Carousel;
