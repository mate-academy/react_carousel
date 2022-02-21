import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
};

type State = {
  transX: number,
};

/**
 *   images: Props,
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,

 *     images: this.props.images,
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
 */

class Carousel extends React.Component<Props, State> {
  state = {
    transX: 0,
  };

  nextImg = () => {
    this.setState((prev) => {
      let adder = 0;

      if (prev.transX > -1000) {
        adder = 130;
      }

      return ({
        transX: prev.transX - adder,
      });
    });
  };

  prevImg = () => {
    this.setState((prev) => {
      let adder = 0;

      if (prev.transX < 0) {
        adder += 130;
      }

      return ({
        transX: prev.transX + adder,
      });
    });
  };

  render() {
    const { images } = this.props;
    const transformValue = {
      left: `${this.state.transX}px`,
    };
    const btnStyle = 'waves-effect waves-light btn';

    return (
      <>
        <div className="Carousel">
          <ul className="Carousel__list" style={transformer}>
            {images.map((image, index) => {
              return (
                <li key={image}>
                  <img src={image} alt={`${index}`} />
                </li>
              );
            })}
          </ul>
        </div>
        <div className="buttons">
          <button type="button" className={btnStyle} onClick={this.prevImg}>Prev</button>
          <button type="button" className={btnStyle} onClick={this.nextImg}>Next</button>
        </div>
      </>
    );
  }
}

export default Carousel;
