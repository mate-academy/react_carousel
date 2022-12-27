import React from 'react';
import './Carousel.scss';

interface Props {
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  infinite: boolean,
  gap: number,
  images: string[],
}

type State = {
  shift: number,
};

class Carousel extends React.Component<Props, State> {
  state = {
    shift: 0,
  };

  componentDidUpdate() {
    const {
      images,
      itemWidth,
      frameSize,
      gap,
    } = this.props;

    const { shift } = this.state;

    const totalWidth = (
      (itemWidth * images.length) + ((gap * images.length) - gap)
    );

    const containerWidth = frameSize * (itemWidth + gap) - gap;
    const exceed = totalWidth < (shift + containerWidth);
    const exceedDifference = (shift + containerWidth) - totalWidth;

    if (exceed) {
      this.setState({ shift: shift - exceedDifference });

      return;
    }

    if (shift < 0) {
      this.setState({ shift: 0 });
    }
  }

  handleScrollNext = () => {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      infinite,
      gap,
    } = this.props;

    const { shift } = this.state;

    const totalWidth = (
      (itemWidth * images.length) + ((gap * images.length) - gap)
    );

    const containerWidth = frameSize * (itemWidth + gap) - gap;

    this.setState({ shift: shift + ((itemWidth + gap) * step) });

    if ((shift + containerWidth === totalWidth) && infinite) {
      this.setState({ shift: 0 });
    }
  };

  handleScrollPrevious = () => {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      infinite,
      gap,
    } = this.props;

    const { shift } = this.state;

    const totalWidth = (
      (itemWidth * images.length) + ((gap * images.length) - gap)
    );

    const containerWidth = frameSize * (itemWidth + gap) - gap;

    if (shift <= 0 && infinite) {
      this.setState({ shift: totalWidth - containerWidth });

      return;
    }

    this.setState({ shift: shift - ((itemWidth + gap) * step) });
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      animationDuration,
      infinite,
      gap,
    } = this.props;

    const { shift } = this.state;

    const totalWidth = (
      (itemWidth * images.length) + ((gap * images.length) - gap)
    );

    const containerWidth = frameSize * (itemWidth + gap) - gap;

    const maxScrollNext = totalWidth - containerWidth;

    const style = {
      disabled: {
        disabled: true,
      },

      width: {
        width: `${containerWidth}px`,
        height: `${itemWidth}px`,
      },

      widthImg: {
        width: `${itemWidth}px`,
      },

      shift: {
        transform: `translateX(${-shift}px)`,
        transition: `transform ${animationDuration}ms`,
        gap,
      },
    };

    return (
      <div className="Carousel">
        <div className="Carousel__container" style={style.width}>
          <ul className="Carousel__list" style={style.shift}>
            {images.map(
              imageSource => (
                <li
                  key={imageSource.slice(-5, -4)}
                  className="list-Emojie"
                >
                  <img
                    src={imageSource}
                    alt={`emojie${imageSource.slice(-5, -4)}`}
                    style={style.widthImg}
                  />
                </li>
              ),
            )}
          </ul>
        </div>
        <div className="Buttons__scroll">
          <button
            type="button"
            onClick={this.handleScrollPrevious}
            {...shift <= 0 && !infinite && style.disabled}
          >
            <span>Prev</span>
          </button>
          <button
            type="button"
            data-cy="next"
            onClick={this.handleScrollNext}
            {...shift >= maxScrollNext && !infinite && style.disabled}
          >
            <span>Next</span>
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
