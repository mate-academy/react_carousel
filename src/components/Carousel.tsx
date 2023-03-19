import React from 'react';
import classNames from 'classnames';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  // infinite: boolean;
};

type State = {
  translateX: number;
};

export class Carousel extends React.Component<Props, State> {
  state: Readonly<State> = {
    translateX: 0,
  };

  slideRight = () => {
    if ((this.props.itemWidth * this.props.images.length) + (
      this.state.translateX) <= 0) {
      return;
    }

    if ((this.props.itemWidth * this.props.images.length + (
      this.state.translateX))
      < (this.props.itemWidth * this.props.step)) {
      this.setState((state) => (
        {
          translateX: state.translateX - (
            this.props.itemWidth * this.props.images.length + (
              state.translateX)),
        }
      ));

      return;
    }

    this.setState((state) => (
      {
        translateX: state.translateX - (this.props.itemWidth * this.props.step),
      }
    ));
  };

  slideLeft = () => {
    if ((this.props.itemWidth * this.props.images.length) === 1300) {
      return;
    }

    if ((this.props.itemWidth * this.props.images.length + (
      this.props.step * this.props.itemWidth)) > (
      this.props.itemWidth * this.props.images.length)) {
      this.setState((state) => (
        {
          translateX: state.translateX + ((
            this.props.itemWidth * this.props.images.length
          ) - this.props.itemWidth * this.props.images.length
          ),
        }
      ));

      return;
    }

    this.setState((state) => (
      {
        translateX: state.translateX + (this.props.itemWidth * this.props.step),
      }
    ));
  };

  render() {
    const { translateX } = this.state;
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
      // infinite,
    } = this.props;

    return (
      <div className="Carousel">
        <button
          type="button"
          className={classNames(
            'button left',
            {
              disabled: (itemWidth * images.length) === 1300,
            },
          )}
          onClick={this.slideLeft}
        >
          <div />
        </button>
        <div className="Carousel__wrapper" style={{ width: `${frameSize * 130}px` }}>
          <ul className="Carousel__list" style={{ transitionDuration: `${animationDuration}ms`, transform: `translateX(${translateX}px)` }}>
            {images.map((image, index) => (
              <li><img src={image} alt={`${index + 1}`} style={{ width: `${itemWidth}px` }} /></li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          className={classNames(
            'button right',
            {
              disabled: (itemWidth * images.length) === 0,
            },
          )}
          onClick={this.slideRight}
        >
          <div />
        </button>
      </div>
    );
  }
}
