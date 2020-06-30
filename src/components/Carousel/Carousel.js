import React from 'react';
import { CarouselTypes } from '../Shape/propTypes';
import './Carousel.css';
import { Buttons } from '../Buttons/Buttons';

export class Carousel extends React.PureComponent {
  state = {
    initialPosition: 0,
    step: 2,
    frameSize: 3,
    itemWidth: 260,
    animationDuration: 1000,
    translate: 0,
  };

  scrollNext = () => {
    const {
      initialPosition,
      frameSize,
      itemWidth,
      step,
    } = this.state;
    const { images } = this.props;
    const lastedSmiles = images.length - initialPosition - frameSize;
    let scroll = 0;

    if (lastedSmiles < step) {
      scroll = itemWidth * lastedSmiles;
      this.setState(prevState => ({
        initialPosition: prevState.initialPosition + lastedSmiles,
      }));
    } else {
      scroll = itemWidth * step;
      this.setState(prevState => ({
        initialPosition: prevState.initialPosition + step,
      }));
    }

    this.setState(prevState => ({
      translate: prevState.translate + scroll,
    }));
  }

  scrollPrev = () => {
    const {
      initialPosition,
      itemWidth,
      step,
    } = this.state;

    let scroll = 0;

    if (initialPosition < step) {
      scroll = -(itemWidth * initialPosition);
      this.setState(prevState => ({
        initialPosition: prevState.initialPosition - initialPosition,
      }));
    } else {
      scroll = -(itemWidth * step);
      this.setState(prevState => ({
        initialPosition: prevState.initialPosition - step,
      }));
    }

    this.setState(prevState => ({
      translate: prevState.translate + scroll,
    }));
  }

  render() {
    const {
      animationDuration,
      frameSize,
      translate,
      itemWidth,
    } = this.state;
    const { images } = this.props;

    const CarouselWidth = itemWidth * frameSize;

    const carouselListStyle = {
      transform: `translateX(-${translate}px)`,
      transition: `transform ${animationDuration}ms`,
    };

    return (
      <div className="wrapper">
        <div className="Carousel" style={{ width: `${CarouselWidth}px` }}>
          <ul className="Carousel__list" style={carouselListStyle}>
            {images.map((image, imgIndex) => (
              <li className="Carousel__item">
                <img
                  src={image}
                  alt={imgIndex}
                  style={{ width: `${itemWidth}px` }}
                />
              </li>
            ))}
          </ul>

          <Buttons onNext={this.scrollNext} onPrev={this.scrollPrev} />
        </div>
      </div>
    );
  }
}

Carousel.propTypes = CarouselTypes;
