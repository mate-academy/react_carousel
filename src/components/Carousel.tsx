import { Component } from 'react';
import './Carousel.scss';

type State = {
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration:number;
  infinite: boolean;
};

type Props = {
  images: string[];
};

class Carousel extends Component<Props, State> {
  state = {
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: true,
  };

  updateInput = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState((prevState) => ({
      ...prevState,
      [name]: (+value),
    }));
  };

  render() {
    const { images } = this.props;
    const {
      itemWidth,
      step,
      frameSize,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title">
          {`Carousel with ${step} images`}
        </h1>

        <div className="Carousel__Form">
          <form>
            <label htmlFor="itemId">
              ItemWidth:
              <input
                type="number"
                id="itemId"
                min="1"
                name="itemWidth"
                required
                onChange={this.updateInput}
              />
            </label>
            <label htmlFor="frameId">
              frameSize
              <input
                type="number"
                id="frameId"
                min="1"
                name="frameSize"
                required
                onChange={this.updateInput}
              />
            </label>
            <label htmlFor="stepId">
              step
              <input
                type="number"
                id="stepId"
                min="1"
                name="step"
                required
                onChange={this.updateInput}
              />
            </label>
            <label htmlFor="animationId">
              animationDuration
              <input
                type="number"
                id="animationId"
                min="1"
                name="animationDuration"
                required
                onChange={this.updateInput}
              />
            </label>

          </form>
        </div>
        <div className="Carousel">
          <ul
            className="Carousel__list"
            style={{
              width: `${itemWidth * frameSize}px`,
              transitionDuration: `${animationDuration}ms`,
            }}
          >
            {images.map(img => (

              <li key={img}>
                <img
                  src={img}
                  alt={img.slice(6, 7)}
                  width={itemWidth}
                />
              </li>
            ))}
          </ul>

          <button
            type="button"
            disabled={!infinite}
            onClick={() => {
              const list = document.querySelector('.Carousel__list');

              if (list) {
                list.scrollBy({
                  top: 0,
                  left: -itemWidth * step,
                  behavior: 'smooth',
                });
              }
            }}
          >
            Prev
          </button>
          <button
            type="button"
            data-cy="next"
            disabled={!infinite}
            onClick={() => {
              const list = document.querySelector('.Carousel__list');

              if (list) {
                list.scrollBy({
                  top: 0,
                  left: itemWidth * step,
                  behavior: 'smooth',
                });
              }
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
