import React from 'react';
import classNames from 'classnames';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
};

type State = {
  scroll: number,
};

export class Carousel extends React.Component<Props, State> {
  state = {
    scroll: 0,
  };

  prevHandler = () => {
    const { itemWidth, step } = this.props;
    const stepWidth = itemWidth * step;

    this.setState((state) => ({
      scroll: state.scroll + stepWidth < 0 ? state.scroll + stepWidth : 0,
    }));
  };

  nextHandler = () => {
    const { images, itemWidth, step } = this.props;
    const stepWidth = itemWidth * step;
    const stepLimit = -itemWidth * (images.length - step);

    this.setState((state) => ({
      scroll: state.scroll - stepWidth > stepLimit ? state.scroll - stepWidth : stepLimit,
    }));
  };

  render() {
    const {
      images, step, itemWidth, frameSize, animationDuration,
    } = this.props;
    const { scroll } = this.state;

    const widthList = itemWidth * frameSize;
    const stepLimit = -itemWidth * (images.length - step);

    return (
      <>
        <div className="container" style={{ width: widthList }}>
          <button
            className={classNames('btn btn-prev', { disabled: !scroll })}
            type="button"
            onClick={this.prevHandler}
          >
            &#11164;
          </button>

          <div className="carousel" style={{ width: widthList }}>
            <ul
              className="carousel__list"
              style={{ marginLeft: `${scroll}px`, transition: `margin-left ${animationDuration}ms ease` }}
            >
              {images.map(image => (
                <li key={image}>
                  <img
                    className="carousel__list-item"
                    src={image}
                    alt="smiley"
                    style={{ width: itemWidth, height: itemWidth }}
                  />
                </li>
              ))}
            </ul>
          </div>
          <button
            className={classNames('btn btn-next', { disabled: scroll === stepLimit })}
            type="button"
            onClick={this.nextHandler}

          >
            &#11166;
          </button>
        </div>
      </>
    );
  }
}

export default Carousel;
