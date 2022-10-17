import React from 'react';
import './Carousel.scss';
import { Image } from '../Image';

type Props = {
  images: string[];
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
};

type State = {
  shiftWidth: number;
};

export class Carousel extends React.Component<Props, State> {
  state = {
    shiftWidth: 0,
  };

  getMaxWidth = () => {
    return this.props.itemWidth * this.props.images.length;
  };

  getFrameWidth = () => {
    return this.props.itemWidth * this.props.frameSize;
  };

  getStepWidth = () => {
    return this.props.itemWidth * this.props.step;
  };

  isGetMaxLength = () => {
    return this.state.shiftWidth + this.getFrameWidth();
  };

  mooveRight = () => {
    return (
      ((this.isGetMaxLength() + this.getStepWidth()) > this.getMaxWidth())
        ? this.setState({
          shiftWidth: this.getMaxWidth() - this.getFrameWidth(),
        })
        : this.setState(prevState => ({
          shiftWidth: prevState.shiftWidth + this.getStepWidth(),
        }))
    );
  };

  mooveLeft = () => {
    return (
      ((this.state.shiftWidth - this.getStepWidth()) < 0)
        ? this.setState({ shiftWidth: 0 })
        : this.setState(prevState => ({
          shiftWidth: prevState.shiftWidth - this.getStepWidth(),
        }))
    );
  };

  render() {
    const {
      images,
      animationDuration,
      itemWidth,
    } = this.props;

    return (
      <div className="Carousel">
        <button
          className="Carousel__buttonLeft"
          type="button"
          onClick={this.mooveLeft}
          disabled={this.state.shiftWidth === 0}
        >
          Prev
        </button>

        <ul className="Carousel__list" style={{ width: `${this.getFrameWidth()}px` }}>
          {images.map(image => (
            <li
              key={image}
              style={{
                transform: `translate(${-this.state.shiftWidth}px)`,
                transitionDuration: `${animationDuration}ms`,
                transitionProperty: 'transform',
              }}
            >
              <Image image={image} itemWidth={itemWidth} />
            </li>
          ))}
        </ul>

        <button
          className="Carousel__buttonRight"
          type="button"
          onClick={this.mooveRight}
          disabled={this.isGetMaxLength() === this.getMaxWidth()}
        >
          Next
        </button>
      </div>
    );
  }
}
