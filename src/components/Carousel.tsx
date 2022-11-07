import cn from 'classnames';
import { Component } from 'react';
import { Image } from '../react-app-env';
import './Carousel.scss';

type Props = {
  images: Image[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinity: boolean;
};

type State = {
  position: number;
};

export class Carousel extends Component<Props, State> {
  state = {
    position: 0,
  };

  onNextClick = (
    infinity: boolean,
    images: Image[],
    step: number,
    frameSize: number,
  ) => {
    this.setState(state => (
      (infinity && state.position === images.length - frameSize)
        ? { position: 0 }
        : {
          position: Math.min(
            state.position + step,
            images.length - frameSize,
          ),
        }
    ));
  };

  onPrevClick = (
    infinity: boolean,
    images: Image[],
    step: number,
    frameSize: number,
  ) => {
    this.setState(state => (
      (infinity && state.position === 0)
        ? { position: images.length - frameSize }
        : { position: Math.max(state.position - step, 0) }
    ));
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinity,
    } = this.props;

    const { position } = this.state;

    return (
      <div className="container">
        <button
          type="button"
          onClick={() => this.onPrevClick(
            infinity,
            images,
            step,
            frameSize,
          )}
          className={cn(
            'button',
            { 'button--disabled': !infinity && !position },
          )}
          disabled={!infinity && !position}
        >
          {'<<'}
        </button>

        <div
          className="Carousel"
          style={{
            width: `${itemWidth * frameSize}px`,
          }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(-${itemWidth * position}px)`,
              transition: `transform ${animationDuration}ms`,
            }}
          >
            {images.map(image => (
              <li className="Carousel__item" key={image.id}>
                <img
                  src={image.src}
                  alt="Emoji"
                  width={`${itemWidth}px`}
                  height={`${itemWidth}px`}
                />
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          data-cy="next"
          onClick={() => this.onNextClick(
            infinity,
            images,
            step,
            frameSize,
          )}
          className={cn(
            'button',
            {
              'button--disabled': !infinity
                && position === images.length - frameSize,
            },
          )}
          disabled={!infinity && position === images.length - frameSize}
        >
          {'>>'}
        </button>
      </div>
    );
  }
}
