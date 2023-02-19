import React from 'react';
import './Carousel.scss';
import { RenderImages } from './renderImages';
import { Props } from '../types/Props';

interface State extends Props{
  moveAfterPunch: number;
}

class Carousel extends React.Component<Props, State> {
  state = {
    ...this.props,
    moveAfterPunch: 0,
  };

  buttonPrev = () => {
    const {
      images, moveAfterPunch, itemWidth, frameSize, step, infinite,
    } = this.state;

    const firstPlace = 0;
    const lastPlace = images.length * itemWidth - frameSize * itemWidth;
    const prevResolve = Math.abs(moveAfterPunch) > frameSize * itemWidth
      && step <= images.length - frameSize;

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
  };

  buttonNext = () => {
    const {
      images, moveAfterPunch, itemWidth, frameSize, step, infinite,
    } = this.state;
    const firstPlace = 0;
    const lastPlace = images.length * itemWidth - frameSize * itemWidth;
    const nextResolve = Math.abs(moveAfterPunch)
    < (lastPlace - frameSize * itemWidth) && step <= images.length - frameSize;

    if (nextResolve) {
      this.setState({
        moveAfterPunch: moveAfterPunch - step * itemWidth,
      });
    } else if (Math.abs(moveAfterPunch) < lastPlace) {
      this.setState({
        moveAfterPunch: -(lastPlace),
      });
    } else if (infinite) {
      this.setState({
        moveAfterPunch: firstPlace,
      });
    }
  };

  eventClick = (elem: any, mark: string) => {
    if (mark === 'step') {
      this.setState({ step: +elem.currentTarget.value });
    } else if (mark === 'itemWidth') {
      this.setState({ itemWidth: +elem.currentTarget.value });
    } else if (mark === 'frameSize') {
      this.setState({ frameSize: +elem.currentTarget.value });
    } else if (mark === 'animationDuration') {
      this.setState({ animationDuration: +elem.currentTarget.value });
    }
  };

  eventFocus = (elem: any, mark: number) => {
    // eslint-disable-next-line no-param-reassign
    elem.currentTarget.value = mark;
  };

  eventBlur = (elem: any) => {
    // eslint-disable-next-line no-param-reassign
    elem.currentTarget.value = '';
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
            <RenderImages images={images} pass={this.state} />
          </ul>
        </section>
        <section className="container_two">
          <div className="Carousel__move">
            <button
              type="button"
              className="ButtonElement"
              data-cy="Prev"
              value="Prev"
              onClick={this.buttonPrev}
            >
              Prev
            </button>
            <button
              type="button"
              className="ButtonElement"
              data-cy="Next"
              value="Next"
              onClick={this.buttonNext}
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
                onClick={(event => {
                  this.eventClick(event, 'step');
                })}
                onFocus={(event) => {
                  this.eventFocus(event, step);
                }}
                onBlur={this.eventBlur}
              />
            </label>

            <input
              type="range"
              id="step"
              min={1}
              max={images.length}
              onClick={(event => {
                this.eventClick(event, 'step');
              })}
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
                onClick={(event => {
                  this.eventClick(event, 'itemWidth');
                })}
                onFocus={(event) => {
                  this.eventFocus(event, itemWidth);
                }}
                onBlur={this.eventBlur}
              />
            </label>
            <input
              type="range"
              id="image_size"
              min={130}
              step={5}
              max={370}
              onClick={(event => {
                this.eventClick(event, 'itemWidth');
              })}
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
                onClick={(event => {
                  this.eventClick(event, 'frameSize');
                })}
                onFocus={(event) => {
                  this.eventFocus(event, frameSize);
                }}
                onBlur={this.eventBlur}
              />
            </label>

            <input
              type="range"
              id="frame_size"
              min={1}
              max={images.length}
              onClick={(event => {
                this.eventClick(event, 'frameSize');
              })}
              defaultValue={frameSize}
            />
          </div>
          <div className="Carousel__animationDuration">
            <label htmlFor="animationDuration">
              {'Animation duration: '}
              <input
                type="number"
                className="inputBlock"
                min={0}
                step={200}
                max={2000}
                placeholder={`${animationDuration}`}
                onClick={(event => {
                  this.eventClick(event, 'animationDuration');
                })}
                onFocus={(event) => {
                  this.eventFocus(event, animationDuration);
                }}
                onBlur={this.eventBlur}
              />
            </label>

            <input
              type="range"
              id="animationDuration"
              min={0}
              step={500}
              max={2000}
              onClick={(event => {
                this.eventClick(event, 'animationDuration');
              })}
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
