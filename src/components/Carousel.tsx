import { Component } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

type State = {
  position: number,
};

export default class Carousel extends Component<Props, State> {
  state = {
    position: 0,
  };

  clickNext = () => {
    const { position } = this.state;
    const {
      images, step, itemWidth, frameSize, infinite,
    } = this.props;
    const maxPosition = images.length * itemWidth - frameSize * itemWidth;

    if (infinite && position === -maxPosition) {
      this.setState({ position: 0 });

      return;
    }

    // eslint-disable-next-line react/no-access-state-in-setstate
    let rightMove = position - itemWidth * step;

    rightMove = Math.max(rightMove, -itemWidth * (images.length - frameSize));

    this.setState({ position: rightMove });
  };

  clickPrev = () => {
    const { position } = this.state;
    const {
      step, itemWidth, infinite, images, frameSize,
    } = this.props;
    const leftMove = position + itemWidth * step;
    const maxPosition = images.length * itemWidth - frameSize * itemWidth;

    if (infinite && !position) {
      this.setState({ position: -maxPosition });

      return;
    }

    this.setState({ position: Math.min(leftMove, 0) });
  };

  render() {
    const {
      animationDuration, itemWidth, frameSize, infinite, images,
    } = this.props;
    const { position } = this.state;
    const frameWidth = itemWidth * frameSize;
    const maxPosition = images.length * itemWidth - frameSize * itemWidth;
    const firstElem = infinite ? false : !position;
    const lastElem = infinite ? false : position === -maxPosition;

    return (
      <div className="Carousel">
        <div className="container" style={{ width: frameWidth }}>
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(${this.state.position}px)`,
              transition: `all ${animationDuration}ms ease-in-out`,
              width: `${itemWidth * images.length}px`,
            }}
          >
            {this.props.images.map(image => (
              <li
                key={images.indexOf(image)}
              >
                <img
                  src={`${image}`}
                  alt="Emojy must be here"
                  style={{ width: itemWidth }}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="Carousel__buttons">
          <button
            className="Carousel__prewButton button"
            type="button"
            style={{ cursor: 'pointer' }}
            onClick={this.clickPrev}
            disabled={firstElem}
          >
            {'<'}
          </button>
          <button
            className="Carousel__nextButton button"
            type="button"
            style={{ cursor: 'pointer' }}
            onClick={this.clickNext}
            disabled={lastElem}
            data-cy="next"
          >
            {'>'}
          </button>
        </div>
      </div>
    );
  }
}
