import React from 'react';
import './Carousel.scss';

interface Props {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
}

interface State {
  scroll: number,
  displayWidth: number,
}

class Carousel extends React.Component<Props, State> {
  state = {
    scroll: 0,
    displayWidth: this.props.frameSize * this.props.itemWidth,
  };

  scrollNext = (step: number) => {
    this.setState((prevState: State) => {
      return {
        scroll: prevState.scroll - step * this.props.itemWidth,
      };
    });
  };

  scrollPrev = (step: number) => {
    this.setState((prevState: State) => {
      return {
        scroll: prevState.scroll + step * this.props.itemWidth,
      };
    });
  };

  render() {
    const { images, step, animationDuration } = this.props;
    const { scroll, displayWidth } = this.state;
    const isPrevDisabled = (scroll === 0);
    const maxNextClicks = -displayWidth * Math.floor(images.length / step);
    const isNextDisabled = (scroll === maxNextClicks);

    return (
      <div className="Carousel">
        <div
          className="imagesContainer"
          style={{ maxWidth: `${displayWidth}px` }}
        >
          <ul
            className="Carousel__list"
            style={
              {
                transform: `translateX(${scroll}px)`,
                transition: `transform ${animationDuration}ms`,
              }
            }
          >
            {images.map(image => (
              <li><img src={image} alt="smile" /></li>
            ))}
          </ul>
        </div>

        <div className="Carousel__buttons">
          <button
            type="button"
            className="Carousel__button"
            disabled={isPrevDisabled}
            onClick={() => this.scrollPrev(step)}
          >
            Prev
          </button>

          <button
            type="button"
            className="Carousel__button"
            disabled={isNextDisabled}
            onClick={() => this.scrollNext(step)}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
