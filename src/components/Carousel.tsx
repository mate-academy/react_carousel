import { Component } from 'react';
import './Carousel.scss';

type Props = {
  images: string[]
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

export class Carousel extends Component<Props> {
  state = {
    images: this.props.images,
  };

  timer = 0;

  componentDidUpdate(prevProps: Readonly<Props>): void {
    const { infinite, step, animationDuration } = this.props;

    if (infinite !== prevProps.infinite && infinite) {
      this.timer
      = window.setInterval(() => {
          this.f(step, 'right');
        }, animationDuration);
    }

    if (prevProps.animationDuration !== animationDuration
      || prevProps.step !== animationDuration) {
      clearInterval(this.timer);
      this.timer
      = window.setInterval(() => {
          this.f(step, 'right');
        }, animationDuration);
    }

    if (!infinite) {
      clearInterval(this.timer);
    }
  }

  f(step: number, direction = 'right'): void {
    const { images } = this.state;

    let firstPart:string[] = [];
    let secondPart:string[] = [];

    if (direction === 'right') {
      firstPart = images.slice(step);
      secondPart = images.slice(0, step);
    }

    if (direction === 'left') {
      firstPart = images.slice(-step);
      secondPart = images.slice(0, -step);
    }

    this.setState({
      images: [...firstPart, ...secondPart],
    });
  }

  render() {
    const {
      frameSize,
      step,
      itemWidth,
      infinite,
    } = this.props;

    return (
      <div className="Carousel">
        <button
          type="button"
          data-cy="prev"
          className="button"
          disabled={infinite}
          onClick={() => this.f(step, 'left')}
        >
          Prev
        </button>
        <ul
          className="Carousel__list"
          style={{ width: `${frameSize * itemWidth}px` }}
        >
          {this.state.images.map((image: string, index : number) => (
            <li key={image}>
              <img
                className="Carousel__item"
                src={image}
                alt={String(index + 1)}
                style={{ width: itemWidth }}
              />
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="button"
          data-cy="next"
          disabled={infinite}
          onClick={() => this.f(step, 'right')}
        >
          Next
        </button>
      </div>
    );
  }
}
