import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
  moveAfterPunch: number;
}

class Carousel extends React.Component<Props, State> {
  state = {
    images: this.props.images,
    step: this.props.step,
    frameSize: this.props.frameSize,
    itemWidth: this.props.itemWidth,
    animationDuration: this.props.animationDuration,
    infinite: this.props.infinite,
    moveAfterPunch: 0,
  };

  renderImages = (images: string[]) => images.map((image, index) => {
    return (
      <li key={`${index + 1}`}>
        <img
          src={image}
          alt={`${index + 1}`}
          style={{
            width: `${this.state.itemWidth}px`,
          }}
        />
      </li>
    );
  });

  buttonSlider = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      images, moveAfterPunch, itemWidth, frameSize, step, infinite,
    } = this.state;

    const firstPlace = 0;
    const lastPlace = images.length * itemWidth - frameSize * itemWidth;
    const absMoveAfterPunch = Math.abs(moveAfterPunch);
    const prevResolve = absMoveAfterPunch > frameSize * itemWidth;
    const nextResolve = absMoveAfterPunch < (lastPlace - frameSize * itemWidth);

    switch (event.currentTarget.value) {
      case 'Prev':
        if (prevResolve) {
          this.setState({
            moveAfterPunch: moveAfterPunch + step * itemWidth,
          });
        } else if (moveAfterPunch < firstPlace) {
          this.setState({
            moveAfterPunch: firstPlace,
          });
        } else if (infinite) {
          this.setState({
            moveAfterPunch: -(lastPlace),
          });
        }

        break;
      case 'Next':
        if (nextResolve) {
          this.setState({
            moveAfterPunch: moveAfterPunch - step * itemWidth,
          });
        } else if (absMoveAfterPunch < lastPlace) {
          this.setState({
            moveAfterPunch: -(lastPlace),
          });
        } else if (infinite) {
          this.setState({
            moveAfterPunch: firstPlace,
          });
        }

        break;

      default:
        break;
    }
  };

  render(): React.ReactNode {
    const {
      step,
      images,
      itemWidth,
      frameSize,
      animationDuration,
      moveAfterPunch,
    } = this.state;

    return (
      <div className="Carousel">
        <section
          className="container_one"
          style={{
            width: itemWidth * frameSize,
          }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(${moveAfterPunch}px)`,
              transitionDuration: `${animationDuration}ms`,
            }}
          >
            {this.renderImages(images)}
          </ul>
        </section>
        <section className="container_two">
          <div className="Carousel__move">
            <button
              type="button"
              className="ButtonElement"
              data-cy="Prev"
              value="Prev"
              onClick={this.buttonSlider}
            >
              Prev
            </button>
            <button
              type="button"
              className="ButtonElement"
              data-cy="Next"
              value="Next"
              onClick={this.buttonSlider}
            >
              Next
            </button>
          </div>
          <div className="Carousel__step">
            <label htmlFor="step">
              {'Step: '}
              <input
                type="number"
                className="inputBlock"
                min={1}
                max={images.length}
                placeholder={`${step}`}
                onClick={(elem) => this
                  .setState({ step: +elem.currentTarget.value })}
                onFocus={(elem) => {
                  // eslint-disable-next-line no-param-reassign
                  elem.currentTarget.value = `${step}`;
                }}
                onBlur={(elem) => {
                  // eslint-disable-next-line no-param-reassign
                  elem.currentTarget.value = '';
                }}
              />
            </label>

            <input
              type="range"
              id="step"
              min={1}
              max={images.length}
              onClick={(elem) => {
                this.setState({ step: +elem.currentTarget.value });
              }}
              defaultValue={step}
            />
          </div>
          <div className="Carousel__image_width">
            <label htmlFor="image_size">
              {'Image Size: '}
              <input
                type="number"
                className="inputBlock"
                min={130}
                step={5}
                max={370}
                placeholder={`${itemWidth}`}
                onClick={(elem) => this
                  .setState({ itemWidth: +elem.currentTarget.value })}
                onFocus={(elem) => {
                  // eslint-disable-next-line no-param-reassign
                  elem.currentTarget.value = `${itemWidth}`;
                }}
                onBlur={(elem) => {
                  // eslint-disable-next-line no-param-reassign
                  elem.currentTarget.value = '';
                }}
              />
            </label>
            <input
              type="range"
              id="image_size"
              min={130}
              step={5}
              max={370}
              onClick={(elem) => this
                .setState({ itemWidth: +elem.currentTarget.value })}
              defaultValue={itemWidth}
            />
          </div>
          <div className="Carousel__frameSize">
            <label htmlFor="frame_size">
              {'Frame Size: '}
              <input
                type="number"
                className="inputBlock"
                min={1}
                max={itemWidth * images.length}
                placeholder={`${frameSize}`}
                onClick={(elem) => this
                  .setState({ frameSize: +elem.currentTarget.value })}
                onFocus={(elem) => {
                  // eslint-disable-next-line no-param-reassign
                  elem.currentTarget.value = `${frameSize}`;
                }}
                onBlur={(elem) => {
                  // eslint-disable-next-line no-param-reassign
                  elem.currentTarget.value = '';
                }}
              />
            </label>

            <input
              type="range"
              id="frame_size"
              min={1}
              max={images.length}
              onClick={(elem) => this
                .setState({ frameSize: +elem.currentTarget.value })}
              defaultValue={frameSize}
            />
          </div>
          <div className="Carousel__animationDuration">
            <label htmlFor="frame_size">
              {'Animation duration: '}
              <input
                type="number"
                className="inputBlock"
                min={0}
                step={200}
                max={2000}
                placeholder={`${animationDuration}`}
                onClick={(elem) => this.setState({
                  animationDuration: +elem.currentTarget.value,
                })}
                onFocus={(elem) => {
                  // eslint-disable-next-line no-param-reassign
                  elem.currentTarget.value = `${animationDuration}`;
                }}
                onBlur={(elem) => {
                  // eslint-disable-next-line no-param-reassign
                  elem.currentTarget.value = '';
                }}
              />
            </label>

            <input
              type="range"
              min={0}
              step={500}
              max={2000}
              onClick={(elem) => this
                .setState({ animationDuration: +elem.currentTarget.value })}
              defaultValue={animationDuration}
            />
          </div>
          <div className="Carousel__infinite">
            <label htmlFor="infinite">{'Infinite: '}</label>
            <input
              type="checkbox"
              id="infinite"
              onClick={(elem) => this
                .setState({ infinite: elem.currentTarget.checked })}
            />
          </div>
        </section>
      </div>
    );
  }
}

export default Carousel;
