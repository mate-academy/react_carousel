import React from 'react';
import './Carousel.scss';

type State = {
  position: number,
};

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

class Carousel extends React.Component<Props, State> {
  state = {
    position: 0,
  };

  render() {
    const { images, frameSize } = this.props;

    return (
      <div className="Carousel-container">
        <div
          className="Carousel"
          style={{
            width: `${this.props.itemWidth * frameSize}px`,
            overflow: 'hidden',
          }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(${this.state.position * this.props.itemWidth}px)`,
              transition: `transform ${this.props.animationDuration}ms`,
            }}
          >
            {images.map((image, index) => {
              return (
                <li key={image}>
                  <img
                    src={image}
                    alt={String(index)}
                    width={this.props.itemWidth}
                  />
                </li>
              );
            })}
          </ul>

        </div>
        <button
          className="button-prew button"
          disabled={!this.props.infinite && this.state.position === 0}
          type="button"
          onClick={() => {
            this.setState((state, props) => {
              return props.infinite && state.position === 0
                ? {
                  position: -(this.props.images.length - props.frameSize),
                }
                : {
                  position: Math.min((state.position + props.step), (0)),
                };
            });
          }}
        >
          ⏪
        </button>

        <button
          className="button-next button"
          disabled={
            !this.props.infinite && this.state.position
            === -(this.props.images.length - this.props.frameSize)
          }
          data-cy="next"
          type="button"
          onClick={() => {
            this.setState((state, props) => {
              return props.infinite && state.position
              === -(this.props.images.length - props.frameSize)
                ? { position: 0 }
                : {
                  position: Math.max(
                    (state.position - props.step),
                    -(this.props.images.length - props.frameSize),
                  ),
                };
            });
          }}
        >
          ⏩
        </button>
      </div>
    );
  }
}

export default Carousel;
