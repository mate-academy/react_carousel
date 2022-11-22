import { Component } from 'react';
import './Carousel.scss';
import classNames from 'classnames';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

type State = {
  position: number;
};

export class Carousel extends Component<Props, State> {
  state: Readonly<State> = {
    position: 0,
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    const {
      position,
    } = this.state;

    const wrapperStyle = {
      width: `${itemWidth * frameSize}px`,
    };

    const listStyle = {
      transition: `${animationDuration}ms`,
      transform: `translate(${position}px)`,
    };

    const imageStyle = {
      width: `${itemWidth}px`,
    };

    const minDisplacement = 0;
    const maxDisplacement = -itemWidth * (images.length - frameSize);

    return (
      <div className="Carousel">
        <div className="Carousel__buttons">
          <button
            type="button"
            className={classNames({
              Carousel__button: true,
              disabled: minDisplacement === position && !infinite,
            })}
            onClick={() => {
              if (infinite && minDisplacement === position) {
                this.setState({
                  position: -(images.length - frameSize) * itemWidth,
                });
              } else {
                const displacement = position + itemWidth * step;

                this.setState({
                  position: Math.min(minDisplacement, displacement),
                });
              }
            }}
          >
            Prev
          </button>
          <button
            type="button"
            data-cy="next "
            className={classNames({
              Carousel__button: true,
              disabled: maxDisplacement === position && !infinite,
            })}
            onClick={() => {
              if (infinite && maxDisplacement === position) {
                this.setState({
                  position: 0,
                });
              } else {
                const displacement = position - itemWidth * step;

                this.setState({
                  position: Math.max(maxDisplacement, displacement),
                });
              }
            }}
          >
            Next
          </button>
        </div>
        <div
          className="Carousel__wrapper"
          style={wrapperStyle}
        >
          <ul className="Carousel__list" style={listStyle}>
            {images.map(image => (
              <li key={image.replace(/[./img/, .png]/g, '')}>
                <img
                  src={image}
                  alt={image.replace(/[./img/, .png]/g, '')}
                  style={imageStyle}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
