import React from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  frameSize: number;
  itemWidth: number;
  step: number;
  animationDuration: number;
}

interface CarouselState {
  position: number;
}

export class Carousel extends React.Component <CarouselProps, CarouselState> {
  state = {
    position: 0,
  };

  handleNext = () => {
    const {
      itemWidth, step, images, frameSize,
    } = this.props;
    const maxWidth = (images.length * itemWidth) - (itemWidth * frameSize);

    if (this.state.position + (itemWidth * step) < maxWidth) {
      this.setState(prevState => (
        { position: prevState.position + (itemWidth * step) }));
    } else {
      this.setState(prevState => (
        { position: prevState.position + (maxWidth - prevState.position) }
      ));
    }
  };

  handlePrev = () => {
    const { itemWidth, step } = this.props;

    if (this.state.position - (itemWidth * step) >= 0) {
      this.setState(prevState => (
        { position: prevState.position - (itemWidth * step) }));
    } else {
      this.setState({ position: 0 });
    }
  };

  render() {
    const {
      frameSize,
      images,
      itemWidth,
      animationDuration,
    } = this.props;

    return (
      <>
        <div className="Carousel">
          <ul
            className="Carousel__list"
            style={{ width: `${frameSize * itemWidth - 1}px` }}
          >

            {images.map((image: string) => {
              return (
                <li
                  key={image}
                  className="Carousel__list-item"
                  style={{
                    width: `${itemWidth}px`,
                    height: `${itemWidth}px`,
                  }}
                >
                  <img
                    src={image}
                    alt={image}
                    width={itemWidth}
                    height={itemWidth}
                    style={{
                      transition: `transform ${animationDuration}ms`,
                      transform: `translateX(-${this.state.position}px)`,
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        <button type="button" onClick={this.handlePrev}>Prev</button>
        <button
          type="button"
          data-cy="next"
          onClick={this.handleNext}
        >
          Next

        </button>
      </>
    );
  }
}
