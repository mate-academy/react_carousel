import React from 'react';
import classNames from 'classnames';

import styles from './Carousel.scss';

const cn = classNames.bind(styles);

class Carousel extends React.Component {
  state = {
    scrollLeft: 0,
    images: this.props.images,
    animation: true,
    disabled: false,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.infinite !== this.props.infinite) {
      this.setState({
        animation: false,
        scrollLeft: 0,
        images: this.props.images,
      });

      setTimeout(() => {
        this.setState({
          animation: true,
        });
      });
    }
  }

  clickHandlerNext = () => {
    const { scrollLeft, images } = this.state;
    const { step, frameSize, itemWidth, animationDuration } = this.props;

    const widthScroll = itemWidth * step;
    const maxWidthScroll = (itemWidth * images.length) - (itemWidth * frameSize);
    let scrollStep = widthScroll;

    if (scrollLeft - widthScroll <= -maxWidthScroll) {
      scrollStep = maxWidthScroll + scrollLeft;
    }

    this.setState((state) => ({
      animation: true,
      disabled: true,
      scrollLeft: state.scrollLeft - scrollStep,
    }));

    setTimeout(() => {
      this.setState({
        disabled: false,
      });
    }, animationDuration);
  }

  clickHandlerNextCarousel = () => {
    const { images } = this.state;
    const { step, itemWidth, animationDuration } = this.props;

    const scrollStep = itemWidth * step;

    this.setState({
      disabled: true,
      animation: true,
      scrollLeft: 0 - scrollStep,
    });

    const copyImages = [...images];
    const removeImages = copyImages.splice(0, step);
    removeImages.forEach(image => copyImages.push(image));

    setTimeout(() => {
      this.setState({
        disabled: false,
        animation: false,
        scrollLeft: 0,
        images: copyImages,
      });
    }, animationDuration);
  }

  clickHandlerPrev = () => {
    const { scrollLeft } = this.state;
    const { step, itemWidth, animationDuration } = this.props;

    const widthScroll = itemWidth * step;
    let scrollStep = widthScroll;

    if (scrollLeft + widthScroll >= 0) {
      scrollStep = 0 - scrollLeft;
    }

    this.setState((state) => ({
      animation: true,
      disabled: true,
      scrollLeft: state.scrollLeft + scrollStep,
    }));

    setTimeout(() => {
      this.setState({
        disabled: false,
      });
    }, animationDuration);
  }

  clickHandlerPrevCarousel = () => {
    const { images } = this.state;
    const { step, itemWidth, animationDuration } = this.props;

    const scrollStep = itemWidth * step;

    const copyImages = [...images];
    const removeImages = copyImages.splice(images.length - step, step);
    removeImages
      .reverse()
      .forEach(image => copyImages.unshift(image));

    this.setState({
      disabled: true,
      animation: false,
      images: copyImages,
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

  render() {
    const {
      scrollLeft,
      images,
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
    const buttonNextDisabled = scrollLeft === -((itemWidth * images.length) - (itemWidth * frameSize));

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
              ? this.clickHandlerPrevCarousel
              : this.clickHandlerPrev
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
              width: itemWidth * images.length,
              left: scrollLeft,
              transition: animation ? `left ${animationDuration / 1000}s ease-in-out` : 'none',
            }}
          >
            <ul className="Carousel__list">
              {images.map(image => (
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
              ? this.clickHandlerNextCarousel
              : this.clickHandlerNext
          }
        >
          &gt;
        </button>
      </div>
    );
  }
}

export default Carousel;
