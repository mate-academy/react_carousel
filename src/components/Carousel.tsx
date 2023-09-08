import React from 'react';
import './styles/Carousel.scss';
import { ImagesList } from './ImagesList';
import { Props } from '../types/Props';

interface State extends Props{
  moveAfterPunch: number;
}

type InputHandler = {
  step: 'step',
  itemWidth: 'itemWidth',
  frameSize: 'frameSize',
  animationDuration: 'animationDuration',
};

class Carousel extends React.Component<Props, State> {
  state = {
    ...this.props,
    moveAfterPunch: 0,
  };

  buttonPrev = () => {
    const {
      images,
      moveAfterPunch,
      itemWidth = 0,
      frameSize = 0,
      step = 0,
      infinite,
    } = this.state;

    const firstPlace = 0;
    const lastPlace = images.length * itemWidth - frameSize * itemWidth;
    const prevResolve = Math.abs(moveAfterPunch) > itemWidth
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
      images,
      moveAfterPunch,
      itemWidth = 0,
      frameSize = 0,
      step = 0,
      infinite,
    } = this.state;
    const firstPlace = 0;
    const lastPlace = images.length * itemWidth - frameSize * itemWidth;
    const nextResolve = Math.abs(moveAfterPunch)
    < (lastPlace - itemWidth) && step <= images.length - frameSize;

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

  handleEventClick = (event: React.ChangeEvent<HTMLInputElement>,
    mark: keyof InputHandler) => {
    switch (mark) {
      case 'step':
        this.setState({ step: +event.currentTarget.value });
        break;

      case 'itemWidth':
        this.setState({ itemWidth: +event.currentTarget.value });
        break;

      case 'frameSize':
        this.setState({ frameSize: +event.currentTarget.value });
        break;

      case 'animationDuration':
        this.setState({ animationDuration: +event.currentTarget.value });
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
            <ImagesList images={images} pass={this.state} />
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
                value={step}
                onChange={(event => {
                  this.handleEventClick(event, 'step');
                })}
              />
            </label>

            <input
              type="range"
              id="step"
              min={1}
              max={images.length}
              onChange={(event => {
                this.handleEventClick(event, 'step');
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
                value={itemWidth}
                onChange={(event => {
                  this.handleEventClick(event, 'itemWidth');
                })}
              />
            </label>
            <input
              type="range"
              id="image_size"
              min={130}
              step={5}
              max={370}
              onChange={(event => {
                this.handleEventClick(event, 'itemWidth');
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
                value={frameSize}
                onChange={(event => {
                  this.handleEventClick(event, 'frameSize');
                })}
              />
            </label>

            <input
              type="range"
              id="frame_size"
              min={1}
              max={images.length}
              onChange={(event => {
                this.handleEventClick(event, 'frameSize');
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
                value={animationDuration}
                onChange={(event => {
                  this.handleEventClick(event, 'animationDuration');
                })}
              />
            </label>

            <input
              type="range"
              id="animationDuration"
              min={0}
              step={500}
              max={2000}
              onChange={(event => {
                this.handleEventClick(event, 'animationDuration');
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
