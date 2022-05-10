import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
  step: number;
};

type State = {
  way: number;
};

export class Carousel extends React.Component<Props, State> {
  state = {
    way: 0,
  };

  scrollerRight = () => {
    const {
      frameSize,
      itemWidth,
      images,
      infinite,
      step,
    } = this.props;
    const { way } = this.state;
    const newWay = Math.max(
      way - step * itemWidth,
      -(itemWidth * (images.length - frameSize)),
    );
    const cycleWay = newWay === way ? 0 : newWay;

    this.setState({
      way: infinite ? cycleWay : newWay,
    });
  };

  scrollerLeft = () => {
    const {
      frameSize,
      itemWidth,
      images,
      infinite,
      step,
    } = this.props;
    const { way } = this.state;
    const newWay = Math.min(0, way + step * itemWidth);
    const limit = -(itemWidth * (images.length - frameSize));
    const cycleWay = newWay === way ? limit : newWay;

    this.setState({
      way: infinite ? cycleWay : newWay,
    });
  };

  render() {
    const {
      itemWidth,
      frameSize,
      animationDuration,
      images,
    } = this.props;
    const { way } = this.state;

    return (
      <div className="Carousel" style={{ width: itemWidth * frameSize }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${way}px)`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {images.map((img, index) => (
            <li key={img}>
              <img
                src={img}
                alt={String(index + 1)}
                style={{ width: itemWidth }}
              />
            </li>
          ))}
        </ul>
        <div
          className="Carousel__wrapper"
          style={{ width: itemWidth * frameSize }}
        >
          <button
            className="Carousel__prevButton"
            type="button"
            aria-label="Left scroll"
            onClick={this.scrollerLeft}
          />
          <button
            className="Carousel__nextButton"
            type="button"
            aria-label="Right scroll"
            onClick={this.scrollerRight}
          />
        </div>
      </div>
    );
  }
}
