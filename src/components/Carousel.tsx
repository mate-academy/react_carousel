import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  step: number;
  infinity: boolean;
};

type State = {
  stepCor: number;
};

class Carousel extends React.Component<Props, State> {
  state = {
    stepCor: 0,
  };

  dvij = (direction: number) => {
    let stepCor = direction * this.props.step * this.props.itemWidth
    + this.state.stepCor;

    const start = 0;
    const end = this.props.itemWidth * (10 - this.props.frameSize);

    if (stepCor < 0) {
      stepCor = start;
    }

    if (stepCor > end) {
      stepCor = end;
    }

    if (this.state.stepCor === start
      && this.props.infinity
      && direction === -1) {
      stepCor = end;
    }

    if (this.state.stepCor === end
      && this.props.infinity
      && direction === 1) {
      stepCor = start;
    }

    this.setState(() => ({
      stepCor,
    }));
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
      infinity,
    } = this.props;

    const { stepCor } = this.state;

    return (
      <>
        <div className="Carousel">
          <ul
            style={{
              transform: `translateX(-${stepCor}px)`,
              transition: `${animationDuration}ms`,
              width: frameSize * itemWidth,
            }}
            className="Carousel__list"
          >
            {images.map(image => (
              <li key={image}>
                <img className="item" src={image} alt="1" width={itemWidth} />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <button
            type="button"
            className="button"
            disabled={stepCor === 0 && infinity === false}
            onClick={() => this.dvij(-1)}
          >
            Prev
          </button>
          <button
            type="button"
            className="button"
            disabled={stepCor === itemWidth * (10 - frameSize)
              && infinity === false}
            onClick={() => this.dvij(1)}
          >
            Next
          </button>
        </div>
      </>
    );
  }
}

export default Carousel;
