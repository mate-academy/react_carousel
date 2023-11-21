import { Component } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  infinity: boolean,
};

type State = {
  itemIndex: number;
};

export class Carousel extends Component<Props, State> {
  state = {
    itemIndex: 0,
  };

  handleSwipe = (step: number) => () => {
    const { images, frameSize, infinity } = this.props;
    let { itemIndex } = this.state;
    const totalImages = images.length;
    const lastIndex = Math.min(totalImages - frameSize, totalImages - step);

    if (infinity) {
      if (itemIndex === lastIndex && itemIndex + step > lastIndex) {
        itemIndex = 0;
      } else if (itemIndex === 0 && itemIndex + step < 1) {
        itemIndex = lastIndex;
      } else if (itemIndex + step > lastIndex) {
        itemIndex = lastIndex;
      } else if (itemIndex + step < 1) {
        itemIndex = 0;
      } else {
        itemIndex += step;
      }
    } else {
      itemIndex = Math.min(Math.max(itemIndex + step, 0), lastIndex);
    }

    this.setState({ itemIndex });
  };

  render() {
    const {
      images,
      step,
      itemWidth,
      frameSize,
      infinity,
      animationDuration,
    } = this.props;

    const { itemIndex } = this.state;
    const prevDisabled = (itemIndex <= 0) && !infinity;
    const nextDisabled = (itemIndex >= images.length - frameSize) && !infinity;

    return (
      <div
        className="Carousel"
        style={{
          width: `${frameSize * itemWidth}px`,
          transition: `${animationDuration}ms`,
        }}
      >
        <ul className="Carousel__list">
          {images.map((img, index) => (
            <li
              key={img}
              className="Carusel__item"
              style={{
                transition: `${animationDuration}ms`,
                transform: `translateX(${-itemIndex * itemWidth}px)`,
              }}
            >
              <img src={img} alt={`${index + 1}`} width={itemWidth} />
            </li>
          ))}
        </ul>

        <div className="Carousel__buttons">
          <button
            type="button"
            className="Carousel__button"
            onClick={this.handleSwipe(-step)}
            disabled={prevDisabled}
          >
            &#8656;
          </button>

          <button
            type="button"
            className="Carousel__button"
            data-cy="next"
            disabled={nextDisabled}
            onClick={this.handleSwipe(step)}
          >
            &#8658;
          </button>
        </div>
      </div>
    );
  }
}
