import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

type State = {
  imagesFromServer: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean;
  images: string[],
  stepState: number,
  forwardArrow?: boolean,
  backwardArrow?: boolean,
};

class Carousel extends React.Component<Props, State> {
  state = {
    imagesFromServer: this.props.images,
    step: this.props.step,
    frameSize: this.props.frameSize,
    itemWidth: this.props.itemWidth,
    animationDuration: this.props.animationDuration,
    infinite: this.props.infinite,
    images: this.props.images.slice(0, this.props.frameSize),
    stepState: 0,
    forwardArrow: true,
    backwardArrow: false,
  };

  forward = () => {
    this.setState((state) => {
      const {
        imagesFromServer,
        frameSize,
        step,
        infinite,
      } = state;

      let { stepState } = state;

      const lastIndex = imagesFromServer.length - 1;

      stepState += step;

      if (stepState > lastIndex) {
        stepState -= lastIndex + 1;
      }

      const endOfImagesArr = stepState + step + (frameSize - step);

      if (endOfImagesArr > lastIndex) {
        if (!infinite) {
          return {
            images: imagesFromServer.slice(stepState),
            stepState,
            forwardArrow: false,
            backwardArrow: true,
          };
        }

        return {
          images: [
            ...imagesFromServer.slice(stepState),
            ...imagesFromServer.slice(0, endOfImagesArr - lastIndex - 1),
          ],
          stepState,
        };
      }

      return {
        images: imagesFromServer.slice(stepState, endOfImagesArr),
        stepState,
        forwardArrow: true,
        backwardArrow: true,
      };
    });
  };

  backward = () => {
    this.setState((state) => {
      const {
        imagesFromServer,
        step,
        frameSize,
        infinite,
      } = state;

      let { stepState } = state;

      const lastIndex = imagesFromServer.length - 1;

      stepState -= step;

      const endOfImagesArr = stepState + step + (frameSize - step);

      if (!infinite && stepState <= 0) {
        return {
          images: imagesFromServer.slice(0, frameSize),
          stepState: 0,
          backwardArrow: false,
        };
      }

      if (stepState < 0) {
        stepState = lastIndex + stepState + 1;

        return {
          images: [
            ...imagesFromServer.slice(stepState),
            ...imagesFromServer.slice(0, endOfImagesArr),
          ],
          stepState,
        };
      }

      if (endOfImagesArr > lastIndex) {
        return {
          images: [
            ...imagesFromServer.slice(stepState),
            ...imagesFromServer.slice(0, endOfImagesArr - lastIndex - 1),
          ],
          stepState,
          forwardArrow: true,
          backwardArrow: true,
        };
      }

      return {
        images: imagesFromServer.slice(stepState, endOfImagesArr),
        stepState,
        forwardArrow: true,
        backwardArrow: true,
      };
    });
  };

  changeSettings = (property: string, propertyValue: string | number) => {
    switch (property) {
      case 'itemWidth':
        this.setState(() => {
          return {
            itemWidth: +propertyValue,
          };
        });
        break;

      case 'frameSize':
        this.setState((state) => {
          return {
            frameSize: +propertyValue,
            images: state.imagesFromServer.slice(0, +propertyValue),
            stepState: 0,
          };
        });
        break;

      case 'step':
        this.setState((state) => {
          return {
            images: state.imagesFromServer.slice(0, state.frameSize),
            step: +propertyValue,
            stepState: 0,
          };
        });
        break;

      case 'animationDuration':
        this.setState(() => {
          return {
            animationDuration: +propertyValue,
          };
        });
        break;

      default:
        this.setState((state) => {
          return {
            images: state.imagesFromServer.slice(0, state.frameSize),
            stepState: 0,
            infinite: !state.infinite,
            backwardArrow: !state.backwardArrow,
          };
        });
    }

    return null;
  };

  render() {
    return (
      <div className="Carousel">
        <div className="Carousel-gallery">
          <button
            type="button"
            className={this.state.backwardArrow
              ? 'Carousel-gallery__images__button'
              // eslint-disable-next-line max-len
              : 'Carousel-gallery__images__button Carousel-gallery__images__button-unactive'}
            onClick={() => this.backward()}
            disabled={!this.state.backwardArrow}
          >
            &#129172;
          </button>
          <div
            className="Carousel-gallery__images"
            style={{
              width: this.state.itemWidth * this.state.frameSize,
              height: this.state.itemWidth,
            }}
          >
            <ul
              className="Carousel-gallery__images__list"
            >
              {this.state.images
                .map(image => (
                  <li
                    key={image}
                    className="Carousel-gallery__images__list__item"
                  >
                    <img
                      src={image}
                      alt="gallery element"
                      className="Carousel-gallery__images__list__img"
                      style={{ width: this.state.itemWidth }}
                    />
                  </li>
                ))}
            </ul>
          </div>
          <button
            type="button"
            className={this.state.forwardArrow
              ? 'Carousel-gallery__images__button'
              // eslint-disable-next-line max-len
              : 'Carousel-gallery__images__button Carousel-gallery__images__button-unactive'}
            onClick={() => this.forward()}
            disabled={!this.state.forwardArrow}
          >
            &#129174;
          </button>
        </div>
        <form
          className="Carousel__settings"
        >
          <label className="Carousel__settings__label">
            <span className="Carousel__settings__label__title">
              Item width:
            </span>
            <input
              type="number"
              className="Carousel__settings__input"
              defaultValue={this.state.itemWidth}
              onChange={(e) => this.changeSettings('itemWidth', e.target.value)}
            />
          </label>
          <label className="Carousel__settings__label">
            <span className="Carousel__settings__label__title">
              Frame size:
            </span>
            <input
              type="number"
              className="Carousel__settings__input"
              defaultValue={this.state.frameSize}
              onChange={(e) => {
                switch (true) {
                  case +e.target.value > this.state.imagesFromServer.length:
                    break;

                  case +e.target.value < 1:
                    break;

                  case +e.target.value < this.state.step:
                    break;

                  default:
                    this.changeSettings('frameSize', e.target.value);
                }
              }}
              min={1}
              max={this.state.imagesFromServer.length}
            />
          </label>
          <label className="Carousel__settings__label">
            <span className="Carousel__settings__label__title">
              Step:
            </span>
            <input
              type="number"
              className="Carousel__settings__input"
              defaultValue={this.state.step}
              min={1}
              max={this.state.frameSize - 1}
              onChange={(e) => {
                switch (true) {
                  case +e.target.value > this.state.imagesFromServer.length - 1:
                    break;

                  case +e.target.value < 1:
                    break;

                  case +e.target.value > this.state.frameSize - 1:
                    break;

                  default:
                    this.changeSettings('step', e.target.value);
                }
              }}
            />
          </label>
          <label className="Carousel__settings__label">
            <span className="Carousel__settings__label__title">
              Animation duration:
            </span>
            <input
              type="number"
              className="Carousel__settings__input"
              defaultValue={this.state.animationDuration}
              onChange={(e) => this.changeSettings(
                'animationDuration',
                e.target.value,
              )}
            />
          </label>
          <label className="Carousel__settings__label">
            <span className="Carousel__settings__label__title">
              Infinite:
            </span>
            <input
              type="checkbox"
              className="Carousel__settings__input"
              onChange={(e) => this.changeSettings('Infinite', e.target.value)}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default Carousel;
