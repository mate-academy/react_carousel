import React from 'react';
import './ScrollingFrame.scss';
import { carouselShape } from '../../types';
import { ImageList } from '../ImageList/ImageList';

class ScrollingFrame extends React.Component {
  state = {
    currentListPosition: 0,
  }

  scrollRight(scrollStep, availableWidth, frameWidth, infinite) {
    const maxScrollRange = -availableWidth + frameWidth;

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

  scrollLeft(scrollStep, availableWidth, frameWidth, infinite) {
    const maxScrollRange = -availableWidth + frameWidth;
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
      <div className="scroll-frame">
        <button
          type="button"
          className="scroll-frame__button"
          onClick={() => {
            this.scrollLeft(scrollStep, listWidth, containerWidth, infinite);
          }}
        >
          &#10094;
        </button>
        <div style={containerStyles} className="container">
          <ImageList
            listStyles={listStyles}
            imgStyles={imgStyles}
            images={images}
          />
        </div>
        <button
          type="button"
          className="scroll-frame__button"
          onClick={() => {
            this.scrollRight(scrollStep, listWidth, containerWidth, infinite);
          }}
        >
          &#10095;
        </button>
      </div>
    );
  }
}

ScrollingFrame.propTypes = carouselShape;

export default ScrollingFrame;
