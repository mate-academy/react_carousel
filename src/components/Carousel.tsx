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

class Carousel extends React.Component<Props, State> {
  state: Readonly<State> = {
    position: 0,
  };

  onRightClick = () => {
    const {
      step,
      frameSize,
      images,
      infinite,
    } = this.props;

    const { position } = this.state;

    const lastPosition = frameSize - images.length;

    this.setState({
      position: position - step,
    });

    if (position - step <= lastPosition) {
      this.setState({
        position: lastPosition,
      });
    }

    if (position === lastPosition && infinite) {
      this.setState({
        position: 0,
      });
    }
  };

  onLeftClick = () => {
    const {
      step,
      frameSize,
      images,
      infinite,
    } = this.props;

    const { position } = this.state;

    const lastPosition = frameSize - images.length;

    this.setState({
      position: position + step,
    });

    if (position + step >= 0) {
      this.setState({
        position: 0,
      });
    }

    if (position === 0 && infinite) {
      this.setState({
        position: lastPosition,
      });
    }
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      animationDuration,
      infinite,
    } = this.props;

    const { position } = this.state;

    const lastPosition = -(images.length - frameSize);
    const rigthButtonDisabled = position === lastPosition && !infinite;
    const leftButtonDisabled = position === 0 && !infinite;

    return (
      <>
        <div
          className="Carousel"
          style={{
            width: `${itemWidth * frameSize}px`,
          }}
        >
          <ul
            className="Carousel__list"
          >
            {images.map((image, index) => (
              <li
                key={image}
                className="Carousel__item"
                style={{
                  transform: `translateX(${position * itemWidth}px)`,
                  transitionDuration: `${animationDuration}ms`,
                }}
              >
                <img
                  src={image}
                  alt={`${index + 1}`}
                  width={itemWidth}
                />
              </li>
            ))}
          </ul>

          <div className="buttons">
            <button
              type="button"
              disabled={leftButtonDisabled}
              onClick={this.onLeftClick}
              className="button"
            >
              &#8678;
            </button>

            <button
              data-cy="next"
              type="button"
              disabled={rigthButtonDisabled}
              onClick={this.onRightClick}
              className="button"
            >
              &#8680;
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Carousel;
