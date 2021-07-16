import React from 'react';
import './Carousel.scss';
import { carouselShape } from '../../types';

class Carousel extends React.Component {
  state = {
    currentListPosition: 0,
  }

  scrollRight(scrollStep, availableWidth, infinite) {
    const maxScrollRange = -availableWidth + scrollStep;

    this.setState(({ currentListPosition }) => {
      if (!infinite) {
        return currentListPosition - scrollStep < maxScrollRange
          ? { currentListPosition: maxScrollRange }
          : {
            currentListPosition: currentListPosition - scrollStep,
          };
      }

      if (currentListPosition === maxScrollRange) {
        return { currentListPosition: 0 };
      }

      if (currentListPosition - scrollStep < maxScrollRange) {
        return { currentListPosition: maxScrollRange };
      }

      return {
        currentListPosition: currentListPosition - scrollStep,
      };
    });
  }

  scrollLeft(scrollStep, availableWidth, infinite) {
    const maxScrollRange = -availableWidth + scrollStep;
    const initialScrollPosition = 0;

    this.setState(({ currentListPosition }) => {
      if (!infinite) {
        return currentListPosition + scrollStep >= initialScrollPosition
          ? { currentListPosition: initialScrollPosition }
          : {
            currentListPosition: currentListPosition + scrollStep,
          };
      }

      if (currentListPosition === initialScrollPosition) {
        return { currentListPosition: maxScrollRange };
      }

      if (currentListPosition + scrollStep >= initialScrollPosition) {
        return { currentListPosition: initialScrollPosition };
      }

      return {
        currentListPosition: currentListPosition + scrollStep,
      };
    });
  }

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    const { currentListPosition } = this.state;
    const listWidth = itemWidth * images.length;
    const listStyles = {
      width: `${listWidth}px`,
      transitionDuration: `${animationDuration}ms`,
      transform: `translateX(${currentListPosition}px)`,
    };
    const imgStyles = {
      width: `${itemWidth}px`,
      height: `${itemWidth}px`,
    };
    const containerWidth = frameSize * itemWidth;
    const containerStyles = {
      width: `${containerWidth}px`,
    };
    const scrollStep = itemWidth * step;

    return (
      <div className="Carousel">
        <button
          type="button"
          className="Carousel__button"
          onClick={() => {
            this.scrollLeft(scrollStep, listWidth, infinite);
          }}
        >
          &#10094;
        </button>
        <div style={containerStyles} className="container">
          <ul style={listStyles} className="Carousel__list">
            {images.map(image => (
              <li key={Math.random()}>
                <img style={imgStyles} src={image} alt="emoji" />
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          className="Carousel__button"
          onClick={() => {
            this.scrollRight(scrollStep, listWidth, infinite);
          }}
        >
          &#10095;
        </button>
      </div>
    );
  }
}

Carousel.propTypes = carouselShape;

export default Carousel;
