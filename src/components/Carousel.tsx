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
  translate: number;
};

export class Carousel extends Component<Props, State> {
  state: Readonly<State> = {
    translate: 0,
  };

  handleNextClick = (
    stepInPx: number,
    maxTranslate: number,
    infinite: boolean,
  ) => {
    if (this.state.translate > -maxTranslate + stepInPx) {
      this.setState(prevState => (
        { translate: prevState.translate - stepInPx }
      ));
    }

    if (this.state.translate === -maxTranslate && infinite) {
      this.setState({ translate: 0 });
    } else if (this.state.translate < -maxTranslate + stepInPx) {
      this.setState({ translate: -maxTranslate });
    }
  };

  handlePrevClick = (
    stepInPx: number,
    maxTranslate: number,
    infinite: boolean,
  ) => {
    if (this.state.translate <= -stepInPx) {
      this.setState(prevState => (
        { translate: prevState.translate + stepInPx }
      ));
    }

    if (this.state.translate === 0 && infinite) {
      this.setState({ translate: -maxTranslate });
    } else if (this.state.translate > -stepInPx) {
      this.setState({ translate: 0 });
    }
  };

  render() {
    const {
      images,
      step,
      itemWidth,
      frameSize,
      animationDuration,
      infinite,
    } = this.props;

    const { translate } = this.state;
    const maxTranslate = images.length * itemWidth - frameSize * itemWidth;
    const stepInPx = step * itemWidth;

    const stylesList = {
      width: `${itemWidth * frameSize}px`,
    };

    const stylesLi = {
      transform: `translateX(${translate}px`,
      transition: `transform ${animationDuration}ms`,
    };

    return (
      <div className="Carousel">
        <button
          className="Carousel__button"
          type="button"
          onClick={() => this.handlePrevClick(stepInPx, maxTranslate, infinite)}
          disabled={this.state.translate === 0 && !infinite}
        >
          &#9668;
        </button>

        <ul className="Carousel__list" style={stylesList}>
          {images.map((image, i) => (
            <li
              key={image}
              style={stylesLi}
            >
              <img
                src={image}
                alt={`${i}`}
                style={{ width: `${itemWidth}px` }}
              />
            </li>
          ))}
        </ul>

        <button
          className="Carousel__button"
          type="button"
          onClick={() => this.handleNextClick(
            stepInPx,
            maxTranslate,
            infinite,
          )}
          disabled={this.state.translate === -maxTranslate && !infinite}
          data-cy="next"
        >
          &#9658;
        </button>
      </div>
    );
  }
}
