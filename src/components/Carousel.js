import React from 'react';
import classNames from 'classnames/bind';

import styles from './Carousel.scss';

const cn = classNames.bind(styles);

class Carousel extends React.Component {
  state = {
    scrollLeft: 0,
    images: this.props.images,
    jump: true,
  }

  clickHandlerNext = () => {
    const { scrollLeft, images } = this.state;
    const { step, frameSize, itemWidth } = this.props;

    const widthScroll = itemWidth * step;
    const maxWidthScroll = (itemWidth * images.length) - (itemWidth * frameSize);
    let scrollStep = widthScroll;

    if (scrollLeft - widthScroll <= -maxWidthScroll) {
      scrollStep = maxWidthScroll + scrollLeft;
    }

    this.setState((state) => ({
      scrollLeft: state.scrollLeft - scrollStep,
    }));
  }

  clickHandlerNextCarousel = () => {
    const { images } = this.state;
    const { step, itemWidth, animationDuration } = this.props;

    const scrollStep = itemWidth * step;

    this.setState({
      jump: true,
      scrollLeft: 0 - scrollStep,
    });

    const copyImages = [...images];
    const removeImages = copyImages.splice(0, step);
    removeImages.forEach(image => copyImages.push(image));

    setTimeout(() => {
      this.setState({
        jump: false,
        scrollLeft: 0,
        images: copyImages,
      });
    }, animationDuration);
  }

  clickHandlerPrev = () => {
    const { scrollLeft } = this.state;
    const { step, itemWidth } = this.props;

    const widthScroll = itemWidth * step;
    let scrollStep = widthScroll;

    if (scrollLeft + widthScroll >= 0) {
      scrollStep = 0 - scrollLeft;
    }

    this.setState((state) => ({
      scrollLeft: state.scrollLeft + scrollStep,
    }));
  }

  clickHandlerPrevCarousel = () => {
    const { images } = this.state;
    const { step, itemWidth } = this.props;

    const scrollStep = itemWidth * step;

    this.setState({
      jump: true,
      scrollLeft: 0 + scrollStep,
    });

    const copyImages = [...images];
    const removeImages = copyImages.splice(images.length - step, step);
    removeImages
      .reverse()
      .forEach(image => copyImages.unshift(image));

    this.setState({
      jump: false,
      images: copyImages,
      scrollLeft: 0 - scrollStep,
    });

    setTimeout(() => {
      this.setState({
        jump: true,
        scrollLeft: 0,
      });
    });
  }

  render() {
    const { scrollLeft, images, jump } = this.state;

    const {
      frameSize = 3,
      itemWidth = 130,
      animationDuration = 1000,
      infinite = false,
    } = this.props;

    const buttonPrevClassName = cn('button', {hiden: !infinite && scrollLeft === 0});
    const buttonNextClassName = cn('button', {hiden: scrollLeft === -((itemWidth * images.length) - (itemWidth * frameSize))});

    return (
      <div className="container-carousel">
        <button
          type="button"
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
              transition: jump ? `left ${animationDuration / 1000}s ease-in-out` : 'none',
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
