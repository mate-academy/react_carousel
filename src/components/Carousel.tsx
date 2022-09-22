import React, { RefObject } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

type State = {
  leftSide: number,
  stopPrevButton: boolean,
  stopNextButton: boolean,
};

let newImages: string[] = [];

export class Carousel extends React.PureComponent<Props, State> {
  state: State = {
    leftSide: 0,
    stopPrevButton: true,
    stopNextButton: false,
  };

  public myRef: RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.myRef = React.createRef();
  }

  handleNextButton = () => {
    const {
      step, itemWidth, infinite, frameSize,
    } = this.props;
    const { leftSide } = this.state;
    const shift = itemWidth * step;
    const carouselWidth = itemWidth * newImages.length;

    this.setState((prevState) => (
      { leftSide: prevState.leftSide - shift }));

    if (leftSide - shift < 0) {
      this.setState({ stopPrevButton: false });
    }

    if (!infinite
      && ((leftSide - shift - frameSize * itemWidth) <= -carouselWidth)) {
      this.setState({ stopNextButton: true });
      this.setState({ leftSide: frameSize * itemWidth - carouselWidth });
    }

    if (infinite) {
      newImages = [...newImages, ...this.props.images];
    }
  };

  handlePrevButton = () => {
    const {
      step,
      itemWidth,
    } = this.props;

    const { leftSide } = this.state;
    const shift = itemWidth * step;
    const carouselWidth = itemWidth * newImages.length;

    if (leftSide + shift * 2 > -carouselWidth) {
      this.setState({ stopNextButton: false });
    }

    if ((leftSide + shift) >= 0) {
      this.setState({ stopPrevButton: true });
      this.setState({ leftSide: 0 });
    }

    if ((leftSide + shift) < 0) {
      this.setState((prevState) => (
        { leftSide: prevState.leftSide + shift }));
    }
  };

  checkPosition = () => {
    if (this.state.leftSide < -this.props.itemWidth * newImages.length) {
      this.setState({ leftSide: 0 });
      this.setState({ stopPrevButton: true });
      this.setState({ stopNextButton: false });
    }
  };

  isInfinite = () => {
    this.setState({
      stopNextButton: false,
      stopPrevButton: false,
    });
  };

  render() {
    const {
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    const {
      leftSide,
      stopPrevButton,
      stopNextButton,
    } = this.state;

    if (!infinite) {
      newImages = [...this.props.images];
      this.checkPosition();
    }

    if (infinite) {
      if (this.myRef.current !== null) {
        this.myRef.current.click();
      }
    }

    return (
      <>
        <input
          ref={this.myRef}
          id="inp"
          type="checkbox"
          onClick={this.isInfinite}
        />
        <h1>{`Carousel with ${this.props.images.length} images`}</h1>

        <div className="Carousel">
          <div className="wrapper" style={{ width: `${itemWidth * frameSize}px` }}>
            <ul
              className="Carousel__list"
              style={{
                left: `${leftSide}px`,
                transition: `${animationDuration}ms`,
              }}
            >
              {newImages.map((image, index) => (
                <li key={image} className="Carousel__item">
                  <img
                    className="Carousel__image"
                    src={image}
                    alt={`${index + 1}`}
                    style={{
                      width: `${itemWidth}px`,
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="Carousel__buttons">
            <button
              disabled={stopPrevButton}
              className="Carousel__button"
              type="button"
              onClick={this.handlePrevButton}
            >
              Prev
            </button>
            <button
              className="Carousel__button"
              disabled={stopNextButton}
              data-cy="next"
              type="button"
              onClick={this.handleNextButton}
            >
              Next
            </button>
          </div>
        </div>
      </>
    );
  }
}
