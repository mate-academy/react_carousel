import React from 'react';
import './Carousel.scss';

// const Carousel: React.FC = () => (
//   <div className="Carousel">
//     <ul className="Carousel__list">
//       <li><img src="./img/1.png" alt="1" /></li>
//       <li><img src="./img/1.png" alt="2" /></li>
//       <li><img src="./img/1.png" alt="3" /></li>
//       <li><img src="./img/1.png" alt="4" /></li>
//     </ul>

//     <button type="button">Prev</button>
//     <button type="button">Next</button>
//   </div>
// );

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

type State = {
  current: number,
};

export class Carousel extends React.Component<Props, State> {
  state = {
    current: 0,
  };

  render() {
    const {
      images,
      step = 3,
      frameSize = 3,
      itemWidth = 130,
      animationDuration = 1000,
      infinite = false,
    } = this.props;
    const { current } = this.state;
    const imageStyle = {
      width: `${itemWidth}px`,
      height: `${itemWidth}px`,
    };
    const listStyle = {
      width: `${frameSize * itemWidth}px`,
      transform: '',
      transitionDuration: `${animationDuration}s`,
    };
    const handlePrev = () => {
      if (!infinite) {
        if (current > 3) {
          listStyle.transform = `translate(${current * itemWidth - step * itemWidth}px, 0)`;
        } else {
          listStyle.transform = 'translate(0, 0)';
        }
      }
    };

    const handleNext = () => {
      if (!infinite) {
        if (current < images.length - 3) {
          listStyle.transform = `translate(${current * itemWidth + step * itemWidth}px, 0)`;
        }
      }
    };

    return (
      <div className="Carousel">
        <ul className="Carousel__list" style={listStyle}>
          {images.map(image => (
            <li key={image}>
              <img className="image" style={imageStyle} src={image} alt={`${images.indexOf(image)}`} />
            </li>
          ))}
        </ul>

        <button type="button" onClick={handlePrev}>Prev</button>
        <button type="button" onClick={handleNext}>Next</button>
      </div>
    );
  }
}

// export default Carousel;
