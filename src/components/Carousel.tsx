import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
};

type State = {
  scroll: number;
};

class Carousel extends React.PureComponent<Props, State> {
  state = {
    scroll: 0,
  };

  render() {
    const {
      images, itemWidth, step, frameSize, animationDuration,
    } = this.props;
    const { scroll } = this.state;

    return (
      <div
        className="Carousel"
        style={{
          width: `${itemWidth * frameSize}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${scroll}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((image => (
            <li key={images.indexOf(image)} className="Carousel__list-item">
              <img
                className="Carousel__image"
                src={image}
                alt={images.indexOf(image).toLocaleString()}
                style={{ width: `${itemWidth}px` }}
              />
            </li>
          )))}
        </ul>

        <button
          type="button"
          onClick={() => {
            const spaceLeft = scroll + step * (itemWidth);

            if (spaceLeft > 0) {
              this.setState({ scroll: 0 });

              return;
            }

            this.setState({ scroll: scroll + (step * itemWidth) });
          }}
        >
          Prev
        </button>
        <button
          type="button"
          data-cy="next"
          onClick={() => {
            const spaceLeft = scroll + (10 * itemWidth) - step * (itemWidth);

            if (spaceLeft < frameSize * itemWidth) {
              this.setState({
                scroll: -10 * itemWidth + frameSize * itemWidth,
              });

              return;
            }

            this.setState({ scroll: scroll - (step * (itemWidth)) });
          }}
        >
          Next
        </button>
      </div>
    );
  }
}

export default Carousel;
