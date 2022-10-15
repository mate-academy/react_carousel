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
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    const prevButtonDisable = !infinite && this.state.position === 0;
    const nextButtonDisable = !infinite && this.state.position
      === -(images.length - frameSize);

    const prevButtonHandler = () => {
      this.setState((state, props) => {
        return props.infinite && state.position === 0
          ? {
            position: -(images.length - props.frameSize),
          }
          : {
            position: Math.min((state.position + props.step), (0)),
          };
      });
    };

    const nextButtonHandler = () => {
      this.setState((state, props) => {
        return props.infinite && state.position
        === -(images.length - props.frameSize)
          ? { position: 0 }
          : {
            position: Math.max(
              (state.position - props.step),
              -(images.length - props.frameSize),
            ),
          };
      });
    };

    return (
      <div className="Carousel-container">
        <div
          className="Carousel"
          style={{
            width: `${itemWidth * frameSize}px`,
            overflow: 'hidden',
          }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(${this.state.position * itemWidth}px)`,
              transition: `transform ${animationDuration}ms`,
            }}
          >
            {images.map((image, index) => {
              return (
                <li key={image}>
                  <img
                    src={image}
                    alt={String(index)}
                    width={itemWidth}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <button
          className="button-prew button"
          disabled={prevButtonDisable}
          type="button"
          onClick={prevButtonHandler}
        >
          ⏪
        </button>

        <button
          className="button-next button"
          disabled={nextButtonDisable}
          data-cy="next"
          type="button"
          onClick={nextButtonHandler}
        >
          ⏩
        </button>
      </div>
    );
  }
}

export default Carousel;
