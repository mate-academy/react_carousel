import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
};

type State = {
  step: number,
  frameSize: number,
  itemwidth: number,
  animationDuration: number,
  move: number,
};

class Carousel extends React.Component<Props, State> {
  state: State = {
    step: 3,
    frameSize: 3,
    itemwidth: 130,
    animationDuration: 1000,
    move: 0,
  };

  previousSlide = () => {
    this.setState((currentState) => {
      const scroll = currentState.move - (currentState.step * currentState.itemwidth);

      return {
        move: scroll < 0 ? 0 : scroll,
      };
    });
  };

  getMinScroll = () => {
    const { images } = this.props;
    const { step, itemwidth } = this.state;

    return (images.length * itemwidth) + (step * itemwidth);
  };

  getMaxScroll = () => {
    const { images } = this.props;
    const { step, itemwidth } = this.state;

    return (images.length * itemwidth) - (step * itemwidth);
  };

  nextSlide = () => {
    this.setState((currentState) => {
      const scroll = currentState.move + (currentState.step * currentState.itemwidth);

      return {
        move: scroll >= this.getMaxScroll() ? this.getMaxScroll() : scroll,
      };
    });
  };

  render() {
    const { images } = this.props;
    const {
      step,
      frameSize,
      itemwidth,
      animationDuration,
      move: marginLeft,
    } = this.state;

    return (
      <div className="content">
        <div className="carousel">
          <div className="carousel__wrapper">
            <button
              type="button"
              className="btn btn--prev"
              disabled={this.state.move <= 0}
              onClick={this.previousSlide}
            >
              &#10148;
            </button>
            <div className="carousel__container" style={{ width: `${frameSize * itemwidth}px` }}>
              <ul className="carousel__list" style={{ transform: `translateX(${-marginLeft}px)`, transition: `${animationDuration}ms`, width: `${images.length * itemwidth}px` }}>
                {images.map(imgUrl => (
                  <li key={imgUrl} className="carousel__item">
                    <img src={imgUrl} alt="smile" className="carousel__img" width={itemwidth} />
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              disabled={this.state.move === this.getMaxScroll()}
              className="btn btn--next"
              onClick={this.nextSlide}
            >
              &#10148;
            </button>
          </div>
        </div>
        <form className="form">
          <label htmlFor="frameSize">
            Frame Size:
            &nbsp;
            <input
              type="number"
              name=""
              id="frameSize"
              min={1}
              max={5}
              step={1}
              value={frameSize}
              onChange={(event) => {
                this.setState({
                  frameSize: +event?.target.value,
                });
              }}
            />
          </label>

          <label htmlFor="step">
            Rolling step:
            &nbsp;
            <input
              type="number"
              name=""
              id="step"
              min={1}
              max={3}
              step={1}
              value={step}
              onChange={(event) => {
                this.setState({
                  step: +event?.target.value,
                });
              }}
            />
          </label>

          <label htmlFor="itemWidth">
            Image width:
            &nbsp;
            <input
              type="range"
              name=""
              id="itemWidth"
              min={60}
              max={230}
              value={itemwidth}
              onChange={(event) => {
                this.setState({
                  itemwidth: +event?.target.value,
                });
              }}
            />
          </label>

          <label htmlFor="animationDuration">
            Animation Duration:
            &nbsp;
            <input
              type="range"
              name=""
              id="animationDuration"
              min={500}
              max={3000}
              value={animationDuration}
              onChange={(event) => {
                this.setState({
                  animationDuration: +event?.target.value,
                });
              }}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default Carousel;
