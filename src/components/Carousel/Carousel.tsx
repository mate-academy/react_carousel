import { Component } from 'react';
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
      this.showNext();
    }, this.props.animationDuration);
  }

  componentDidUpdate(Prev: Props) {
    if (Prev.animationDuration === this.props.animationDuration) {
      return;
    }

    clearInterval(this.intervalId);

    this.intervalId = window.setInterval(() => {
      this.showNext();
    }, this.props.animationDuration);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  showNext = () => {
    if (this.props.infinite) {
      clearInterval(this.intervalId);
    }

    const carousel: HTMLUListElement | null
      = document.querySelector('.Carousel__list');

    if (!carousel) {
      return;
    }

    const scrollValue = (this.props.itemWidth + this.retreat) * this.props.step;
    const left = Math.ceil(carousel.scrollLeft);

    carousel.scrollTo({
      left: left + scrollValue,
      behavior: 'smooth',
    });

    this.setState((state) => {
      const maxPosition = -(
        (this.props.images.length - this.props.frameSize) * this.props.itemWidth
      );

      if (state.position !== maxPosition) {
        return {
          position: Math.max(
            maxPosition,
            state.position - this.props.step * this.props.itemWidth,
          ),
        };
      }

      return { position: state.position };
    });
  };

  showPrev = () => {
    if (this.props.infinite) {
      clearInterval(this.intervalId);
    }

    const carousel: HTMLUListElement | null
      = document.querySelector('.Carousel__list');

    if (!carousel) {
      return;
    }

    const scrollValue = (this.props.itemWidth + this.retreat) * this.props.step;

    carousel.scrollTo({
      left: Math.ceil(carousel.scrollLeft) - scrollValue,
      behavior: 'smooth',
    });

    this.setState(state => {
      if (state.position !== 0) {
        return {
          position: Math.min(
            state.position + this.props.step * this.props.itemWidth,
            0,
          ),
        };
      }

      return { position: state.position };
    });
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
    } = this.props;

    const { position } = this.state;

    const containerCarouselWidh = frameSize * (itemWidth + this.retreat)
      - this.retreat;

    return (
      <div className="Carousel">
        <ul
          className="Carousel__list"
          style={{ width: `${containerCarouselWidh}px` }}
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

        <button
          type="button"
          name="prev"
          className="Carousel__button Carousel__button--prev"
          onClick={this.showPrev}
          disabled={position === 0}
        >
          Prev
        </button>

        <button
          type="button"
          data-cy="next"
          name="next"
          className="Carousel__button Carousel__button--next"
          onClick={this.showNext}
          disabled={position === -(images.length - frameSize) * itemWidth}
        >
          Next
        </button>
      </div>
    );
  }
}

export default Carousel;
