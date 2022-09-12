import React from 'react';
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
  offset: number;
  frameSize: number;
  infinite: boolean;
};

class Carousel extends React.Component<Props, State> {
  state = {
    offset: 0,
    frameSize: this.props.frameSize,
    infinite: this.props.infinite,
  };

  componentDidUpdate(prevProps: Props) {
    if (this.props.frameSize !== prevProps.frameSize) {
      this.setState({ frameSize: this.props.frameSize });
    }

    if (this.props.infinite !== prevProps.infinite) {
      this.setState({ infinite: this.props.infinite });
    }
  }

  handleNextClick = () => {
    // I'm using here a lot of const cause it more easy than change them like class-prop
    const frameSpace = this.state.frameSize * this.props.itemWidth;
    const maxOffset = this.props.itemWidth * 10 - frameSpace;
    const newOffset = this.props.itemWidth * this.props.step;

    if (this.state.offset + newOffset > maxOffset) {
      this.setState({ offset: maxOffset });
    } else {
      this.setState(prev => ({ offset: newOffset + prev.offset }));
    }

    if (this.state.offset === maxOffset && this.state.infinite) {
      this.setState({ offset: 0 });
    }
  };

  handlePrevClick = () => {
    const frameSpace = this.state.frameSize * this.props.itemWidth;
    const maxOffset = this.props.itemWidth * 10 - frameSpace;
    const newOffset = this.props.itemWidth * this.props.step;

    if (this.state.offset - newOffset <= 0) {
      this.setState({ offset: 0 });
    } else {
      this.setState(prev => ({ offset: prev.offset - newOffset }));
    }

    if (this.state.offset === 0 && this.state.infinite) {
      this.setState({ offset: maxOffset });
    }
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;

    const { offset } = this.state;
    let count = 0;

    return (
      <>
        <div className="wrapper">
          <div
            className="Carousel"
            style={{ width: `${frameSize * itemWidth}px` }}
          >
            <ul
              className="Carousel__list"
              style={
                {
                  transform: `translateX(-${offset}px)`,
                  transition: `transform ${animationDuration / 1000}s`,
                }
              }
            >
              {images.map(image => {
                count += 1;

                return (
                  <li className="Carousel__item" key={image}>
                    <img
                      className="Carousel__image"
                      style={{ width: `${itemWidth}px` }}
                      src={`${image}`}
                      alt={`${count}`}
                    />
                  </li>
                );
              })}
            </ul>
          </div>

        </div>
        <div className="container">
          <button
            className="button"
            type="button"
            onClick={this.handlePrevClick}
          >
            Prev
          </button>

          <button
            className="button"
            type="button"
            onClick={this.handleNextClick}
            data-cy="next"
          >
            Next
          </button>
        </div>
      </>
    );
  }
}

export default Carousel;
