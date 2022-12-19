import { Component } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
  onClick: (value: HTMLButtonElement) => void,
};

type State = {
  position: number;
};

class Carousel extends Component<Props, State> {
  state = {
    position: 0,
  };

  intervalId = 0;

  retreat = 10;

  componentDidMount() {
    this.intervalId = window.setInterval(() => {
      this.show('next');
    }, this.props.animationDuration);
  }

  componentDidUpdate(props: Props) {
    if (props.frameSize !== this.props.frameSize
      && this.maxPosition() <= this.state.position) {
      this.setState({
        position: this.maxPosition(),
      });
    }

    if (this.maxPosition() === this.state.position) {
      clearInterval(this.intervalId);
    }
  }

  maxPosition = () => (
    ((this.props.images.length - this.props.frameSize)
     * (this.props.itemWidth + this.retreat)
    ));

  scrollValue = () => (
    (this.props.itemWidth + this.retreat) * this.props.step
  );

  show = (direction: 'prev' | 'next') => {
    if (this.props.infinite) {
      clearInterval(this.intervalId);
    }

    const { position } = this.state;

    if (direction === 'next' && this.state.position <= this.maxPosition()) {
      this.setState({
        position:
          Math.min(
            this.maxPosition(),
            position + this.scrollValue(),
          ),
      });
    }

    if (direction === 'prev' && this.state.position !== 0) {
      this.setState({
        position:
          Math.max(
            0,
            position - this.scrollValue(),
          ),
      });
    }
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      onClick,
      animationDuration,
    } = this.props;

    const { position } = this.state;

    const containerCarouselWidh = frameSize * (itemWidth + this.retreat)
      - this.retreat;

    return (
      <div className="Carousel">
        <div
          className="Carousel__container"
          style={{
            width: `${containerCarouselWidh}px`,
          }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(${-position}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            {images.map((image) => (
              <li className="Carousel__item" key={image}>
                <img
                  className="Carousel__img"
                  src={image}
                  alt={image}
                  width={itemWidth}
                />
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          name="prev"
          className="Carousel__button Carousel__button--prev"
          onClick={(event) => {
            this.show('prev');
            onClick(event.currentTarget);
          }}
          disabled={position === 0}
        >
          Prev
        </button>

        <button
          type="button"
          data-cy="next"
          name="next"
          className="Carousel__button Carousel__button--next"
          onClick={(event) => {
            this.show('next');
            onClick(event.currentTarget);
          }}
          disabled={position === this.maxPosition()}
        >
          Next
        </button>
      </div>
    );
  }
}

export default Carousel;
