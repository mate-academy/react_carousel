import { Component } from 'react';

import './Carousel.scss';
import { ListItem } from './ListItem';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
};

type State = {
  translateVal: number;
};

class Carousel extends Component<Props, State> {
  state:Readonly<State> = {
    translateVal: 0,
  };

  prevHandler = () => {
    this.setState((prevState) => {
      const newTranslate = prevState.translateVal - (
        this.props.step * this.props.itemWidth
      );

      if (newTranslate < 0) {
        this.setState({ translateVal: 0 });

        return;
      }

      this.setState({ translateVal: newTranslate });
    });
  };

  nextHandler = () => {
    const maxTranslate = (
      this.props.images.length - this.props.frameSize) * this.props.itemWidth;

    this.setState((prevState) => {
      const newTranslate = prevState.translateVal + (
        this.props.step * this.props.itemWidth
      );

      if (newTranslate > maxTranslate) {
        this.setState({ translateVal: maxTranslate });

        return;
      }

      this.setState({ translateVal: newTranslate });
    });
  };

  render() {
    const {
      images, itemWidth, frameSize, animationDuration,
    } = this.props;
    const carouselWidth = frameSize * itemWidth;

    return (
      <div className="Carousel">
        <ul
          className="Carousel__list"
          style={{
            width: `${carouselWidth}px`,
            transform: `translateX(-${this.state.translateVal}px)`,
            transition: `transform ${animationDuration / 1000}s`,
          }}
        >
          {images.map((img, i) => {
            return (
              <ListItem
                img={img}
                i={i}
                itemWidth={itemWidth}
                key={img}
              />
            );
          })}
        </ul>

        <button type="button" onClick={this.prevHandler}>Prev</button>
        <button
          type="button"
          onClick={this.nextHandler}
          data-cy="next"
        >
          Next
        </button>
      </div>
    );
  }
}

export default Carousel;
