import React from 'react';
import CarouselSlide from '../CarouselSlide/CarouselSlide';
import { CarouselFullShape } from '../Shapes/CarouselFullShape';
import CarouselButtons from '../CarouselButtons/CarouselButtons';

class CarouselList extends React.Component {
  constructor(props) {
    super(props);
    this.list = React.createRef();
    this.state = {
      slidesSize: props.frameSize * props.itemWidth,
    };
  }

  prevClick = (slidesSize) => {
    this.list.current.scrollLeft -= slidesSize;
  };

  nextClick = (slidesSize) => {
    if (this.list.current.scrollLeft
      === (this.props.images.length * this.props.itemWidth)
      - (this.props.frameSize * this.props.itemWidth)) {
      this.list.current.scrollLeft = 0;
    }

    this.list.current.scrollLeft += slidesSize;
  }

  render() {
    const { itemWidth, images } = this.props;

    return (
      <>
        <div
          ref={this.list}
          className="Carousel__wrapper"
          style={{ width: `${this.state.slidesSize}px` }}
        >
          <ul className="Carousel__list">
            {images.map(image => (
              <CarouselSlide
                image={image}
                key={image}
                itemWidth={itemWidth}
              />
            ))}
          </ul>
        </div>
        <CarouselButtons
          slidesSize={this.state.slidesSize}
          prevClick={this.prevClick}
          nextClick={this.nextClick}
        />
      </>
    );
  }
}

CarouselList.propTypes = CarouselFullShape.isRequired;

export default CarouselList;
