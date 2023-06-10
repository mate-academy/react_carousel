import React from 'react';
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
  position: number,
};

export class Carousel extends React.Component<Props, State> {
  state = {
    position: 0,
  };

  nextSliderHandler = () => {
    const {
      images,
      itemWidth,
      step,
      frameSize,
      infinite,
    } = this.props;

    const hiddenWidth = (images.length - frameSize) * itemWidth;

    if (this.state.position + itemWidth * step < hiddenWidth) {
      this.setState(prevState => (
        { position: prevState.position + itemWidth * step }));
    } else if (this.state.position === hiddenWidth && infinite) {
      this.setState({ position: 0 });
    } else {
      this.setState(prevState => (
        { position: prevState.position + (hiddenWidth - prevState.position) }
      ));
    }
  };

  prevSliderHandler = () => {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      infinite,
    } = this.props;

    const hiddenWidth = (images.length - frameSize) * itemWidth;

    if (this.state.position - itemWidth * step > 0) {
      this.setState(prevState => (
        { position: prevState.position - itemWidth * step }));
    } else if (this.state.position === 0 && infinite) {
      this.setState(prevState => (
        { position: prevState.position + (hiddenWidth - prevState.position) }
      ));
    } else {
      this.setState({ position: 0 });
    }
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;

    return (
      <div className="Carousel">
        <ul
          style={{ width: `${frameSize * itemWidth - 1}px` }}
          className="Carousel__list"
        >
          {images.map((image, i) => (
            <li
              key={image}
              style={{
                width: `${itemWidth}px`,
                height: `${itemWidth}px`,
              }}
            >
              <img
                className="Image"
                src={image}
                alt={`${i + 1}`}
                width={itemWidth}
                height={itemWidth}
                style={{
                  transition: `transform ${animationDuration}ms`,
                  transform: `translateX(-${this.state.position}px)`,
                }}
              />
            </li>
          ))}
        </ul>

        <div className="Carousel__buttons">
          <button
            className="Carousel__buttons__button"
            type="button"
            onClick={this.prevSliderHandler}
          >
            Prev
          </button>

          <button
            className="Carousel__buttons__button"
            type="button"
            data-cy="next"
            onClick={this.nextSliderHandler}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
