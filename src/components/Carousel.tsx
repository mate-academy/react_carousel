import React from 'react';
import './Carousel.scss';

type State = {
  transform: number;
};

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
};

export class Carousel extends React.Component<Props, State> {
  state = {
    transform: 0,
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;
    const { transform } = this.state;
    const frame = itemWidth * frameSize;
    const offSetValue = step * itemWidth;
    const maxOffSet = -(itemWidth * (images.length - frameSize));

    const moveNext = () => {
      if (transform === maxOffSet && infinite) {
        return this.setState({ transform: 0 });
      }

      return (this.setState(
        (transform - offSetValue) < maxOffSet
          ? { transform: maxOffSet }
          : { transform: transform - offSetValue },
      ));
    };

    const movePrev = () => {
      if (transform === 0 && infinite) {
        return this.setState({ transform: maxOffSet });
      }

      return (this.setState(
        (transform + offSetValue) > 0
          ? { transform: 0 }
          : { transform: transform + offSetValue },
      ));
    };

    return (
      <div
        className="Carousel__container"
        style={{ width: `${frame}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `TranslateX(${transform}px)`,
            transition: `transform ${animationDuration}ms linear`,
          }}
        >
          {images.map((image: string) => {
            const imgId = image
              .slice(image.lastIndexOf('/') + 1, image.lastIndexOf('.'));

            return (
              <li key={imgId}>
                <img
                  src={image}
                  alt={imgId}
                  height={itemWidth}
                  width={itemWidth}
                />
              </li>
            );
          })}
        </ul>
        <div className="Carousel__button_container">

          <button
            type="button"
            className="Carousel__button"
            onClick={movePrev}
            disabled={!infinite ? transform === 0 : false}
          >
            Prev
          </button>

          <button
            type="button"
            className="Carousel__button"
            data-cy="next"
            onClick={moveNext}
            disabled={!infinite ? transform === maxOffSet : false}
          >
            Next
          </button>

        </div>
      </div>
    );
  }
}
