import React from 'react';
import { CarouselSettings } from '../../types/CarouselSettings';
import './Carousel.scss';

interface State {
  translate: number;
  itemAmount: number;
}

export class Carousel extends React.Component<CarouselSettings, State> {
  state = {
    translate: 0,
    itemAmount: this.props.images.length,
  };

  caclMaxTranslate = () => {
    const { frameSize, itemWidth } = this.props;
    const { itemAmount } = this.state;

    return itemWidth * (itemAmount - frameSize);
  };

  calcWrapperWidth = () => {
    return this.props.itemWidth * this.props.frameSize;
  };

  nextSlide = () => {
    const { translate } = this.state;
    const { itemWidth, step } = this.props;
    const MaxTranslate = -this.caclMaxTranslate();

    if (translate !== MaxTranslate) {
      this.setState((state) => {
        let toTranslate = state.translate - itemWidth * step;

        if (toTranslate < MaxTranslate) {
          toTranslate = MaxTranslate;
        }

        return {
          translate: toTranslate,
        };
      });
    }
  };

  prevSlide = () => {
    const { translate } = this.state;
    const { itemWidth, step } = this.props;

    if (translate !== 0) {
      this.setState((state) => {
        let toTranslate = state.translate + itemWidth * step;

        if (toTranslate > 0) {
          toTranslate = 0;
        }

        return {
          translate: toTranslate,
        };
      });
    }
  };

  render() {
    const { prevSlide, nextSlide, calcWrapperWidth } = this;
    const { images, animationDuration, itemWidth } = this.props;
    const { translate } = this.state;

    const carouselListStyles = {
      transform: `translateX(${translate}px)`,
      transition: `transform ${animationDuration}ms linear`,
    };

    const carouselWrapperStyles = {
      width: calcWrapperWidth(),
    };

    const slideStyles = {
      width: itemWidth,
    };

    return (
      <div className="carousel">
        <div className="carousel__list-wrapper" style={carouselWrapperStyles}>
          <ul className="carousel__list" style={carouselListStyles}>
            {images.map((image, i) => (
              <li key={image}>
                <img src={image} alt={(i + 1).toString()} style={slideStyles} />
              </li>
            ))}
          </ul>
        </div>

        <button type="button" onClick={prevSlide}>Prev</button>
        <button type="button" onClick={nextSlide}>Next</button>
      </div>
    );
  }
}
