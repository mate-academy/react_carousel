/* eslint-disable default-case */
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
  location: number,
  fwdDisabled: boolean,
  bckDisabled: boolean,
};

class Carousel extends React.Component<Props, State> {
  state: Readonly<State> = {
    location: 0,
    fwdDisabled: false,
    bckDisabled: false,
  };

  loc = 0;

  componentDidUpdate() {
    const maxlength = this.props.images.length - this.props.frameSize;

    if (this.state.location > maxlength) {
      this.setState({ location: maxlength });
    }
  }

  render() {
    const {
      location,
    } = this.state;

    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    const width = itemWidth * frameSize;

    const carouselStyle = {
      width: `${width}px`,
    };

    const imgStyle = {
      width: `${itemWidth}px`,
    };

    const blockStyle = {
      transform: `translate(${-location * itemWidth}px)`,
      transition: `transform ${animationDuration / 1000}s`,
    };

    const length = images.length - frameSize;

    const enable = () => {
      if (this.loc !== 0) {
        this.setState({ bckDisabled: false });
      }

      if (this.loc !== length) {
        this.setState({ fwdDisabled: false });
      }
    };

    const edge = (start: number, end: number) => {
      if (!infinite) {
        switch (start) {
          case 0:
            this.setState({ fwdDisabled: true });
            break;
          case length:
            this.setState({ bckDisabled: true });
            break;
        }
      }

      return end;
    };

    const moveFwd = () => {
      this.loc += step;

      if (this.loc >= length) {
        this.loc = edge(0, length);
      }

      if (location === length && infinite) {
        this.loc = 0;
      }

      enable();

      this.setState({ location: this.loc });
    };

    const moveBck = () => {
      this.loc -= step;

      if (this.loc <= 0) {
        this.loc = edge(length, 0);
      }

      if (location === 0 && infinite) {
        this.loc = length;
      }

      enable();

      this.setState({ location: this.loc });
    };

    return (
      <div className="Carousel">
        <div className="Carousel__wrapper">
          <button
            className="Carousel__prev-button"
            type="button"
            aria-label="left"
            onClick={moveBck}
            disabled={this.state.bckDisabled}
          />
          <div className="Carousel__block" style={carouselStyle}>
            <ul className="Carousel__list" style={blockStyle}>
              {images.map((source, index, arr) => (
                <li key={arr.indexOf(source)}>
                  <img
                    src={source}
                    alt={index.toString()}
                    style={imgStyle}
                    className="Carousel__img"
                  />
                </li>
              ))}
            </ul>
          </div>
          <button
            className="Carousel__next-button"
            type="button"
            aria-label="right"
            data-cy="next"
            onClick={moveFwd}
            disabled={this.state.fwdDisabled}
          />
        </div>
      </div>
    );
  }
}

export default Carousel;
