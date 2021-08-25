import React from 'react';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import styles from './Carousel.scss';

const cn = classNames.bind(styles);

class Carousel extends React.Component {
  state = {
    scrollLeft: 0,
    visualizedImages: [],
    singleImages: [],
    doubleImages: [],
    animation: true,
    disabled: false,
  }

  componentDidMount() {
    const singleImages = this.props.images.map(image => {
      return {
        img: image,
        id: uuidv4(),
        alt: 'smile',
      };
    });

    const doubleImages = [...this.props.images, ...this.props.images]
      .map(image => {
        return {
          img: image,
          id: uuidv4(),
          alt: 'smile',
        };
      });

    this.setState({
      visualizedImages: singleImages,
      singleImages: singleImages,
      doubleImages: doubleImages,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.infinite !== this.props.infinite
        || prevProps.frameSize !== this.props.frameSize
        || prevProps.itemWidth !== this.props.itemWidth) {
      this.setState({
        animation: false,
        scrollLeft: 0,
        visualizedImages: this.props.infinite ? this.state.doubleImages : this.state.singleImages,
      });

      setTimeout(() => {
        this.setState({
          animation: true,
        });
      });
    }
  }

  clickHandler = (value) => {
    const {
      scrollLeft,
      singleImages
    } = this.state;

    const {
      animationDuration,
      itemWidth,
      frameSize,
      step,
    } = this.props;

    const maxWidthScroll = (itemWidth * singleImages.length) - (itemWidth * frameSize);

    const widthScroll = itemWidth * step;

    let scrollStep = widthScroll;

    if (!value && (scrollLeft + widthScroll >= 0)) {
      scrollStep = 0 - scrollLeft;
    }

    if (value && (scrollLeft - widthScroll <= -maxWidthScroll)) {
      scrollStep = maxWidthScroll + scrollLeft;
    }

    this.setState((state) => ({
      animation: true,
      disabled: true,
      scrollLeft: value
        ? state.scrollLeft - scrollStep
          : state.scrollLeft + scrollStep,
    }));

    setTimeout(() => {
      this.setState({
        disabled: false,
      });
    }, animationDuration);
  }

  clickHandlerInfinite = (value) => {
    const { visualizedImages } = this.state;

    const {
      step,
      itemWidth,
      animationDuration
    } = this.props;

    const scrollStep = itemWidth * step;

    if (value) {
      this.setState({
        disabled: true,
        animation: true,
        scrollLeft: 0 - scrollStep,
      });
  
      const newVisualizedImages = [...visualizedImages];
      const removeImages = newVisualizedImages.splice(0, step);
      removeImages.forEach(image => newVisualizedImages.push(image));
  
      setTimeout(() => {
        this.setState({
          disabled: false,
          animation: false,
          scrollLeft: 0,
          visualizedImages: newVisualizedImages,
        });
      }, animationDuration);
    }

    if (!value) {
      const newVisualizedImages = [...visualizedImages];
      const removeImages = newVisualizedImages.splice(visualizedImages.length - step, step);
      removeImages
        .reverse()
        .forEach(image => newVisualizedImages.unshift(image));

      this.setState({
        disabled: true,
        animation: false,
        visualizedImages: newVisualizedImages,
        scrollLeft: 0 - scrollStep,
      });

      setTimeout(() => {
        this.setState({
          animation: true,
          scrollLeft: 0,
        });
      });

      setTimeout(() => {
        this.setState({
          disabled: false,
        });
      }, animationDuration);
    }
  }

  render() {
    const {
      scrollLeft,
      visualizedImages,
      singleImages,
      animation,
      disabled
    } = this.state;

    const {
      frameSize = 3,
      itemWidth = 130,
      animationDuration = 1000,
      infinite = false,
    } = this.props;

    const buttonPrevDisabled = !infinite && scrollLeft === 0;
    const buttonNextDisabled = !infinite && scrollLeft === -((itemWidth * singleImages.length) - (itemWidth * frameSize));

    const buttonPrevClassName = cn('button', {disabled: buttonPrevDisabled});
    const buttonNextClassName = cn('button', {disabled: buttonNextDisabled});

    return (
      <div className="container-carousel">
        <button
          type="button"
          disabled={disabled || buttonPrevDisabled}
          className={buttonPrevClassName}
          onClick={
            infinite
              ? () => {this.clickHandlerInfinite(0)}
              : () => {this.clickHandler(0)}
          }
        >
          &lt;
        </button>
        <div
          className="wrapper-carousel"
          style={{ width: itemWidth * frameSize }}
        >
          <div
            className="Carousel"
            style={{
              width: itemWidth * singleImages.length,
              left: scrollLeft,
              transition: animation ? `left ${animationDuration / 1000}s ease-in-out` : 'none',
            }}
          >
            <ul className="Carousel__list">
              {visualizedImages.map(image => (
                <li
                  key={image.id}
                  className="Carousel__image"
                >
                  <img
                    width={itemWidth}
                    src={image.img}
                    alt={image.alt}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          type="button"
          disabled={disabled || buttonNextDisabled}
          className={buttonNextClassName}
          onClick={
            infinite
              ? () => {this.clickHandlerInfinite(1)}
              : () => {this.clickHandler(1)}
          }
        >
          &gt;
        </button>
      </div>
    );
  }
}

export default Carousel;
