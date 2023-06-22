import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};
type State = {
  imagesArr: string[];
  countImages: number;
  isTransition: boolean;
  isNext: boolean;
};

export class Carousel extends React.Component<Props, State> {
  state = {
    imagesArr: [...this.props.images],
    countImages: 0,
    isTransition: false,
    isNext: false,
  };

  componentDidUpdate() {
    const {
      isNext,
      isTransition,
    } = this.state;
    const {
      infinite,
      animationDuration,
    } = this.props;

    if (isTransition && infinite && isNext) {
      setTimeout(() => this.updateImagesArr(), animationDuration);
    } else if (!isTransition && infinite
      && !isNext && this.state.countImages !== 0) {
      setTimeout(() => {
        this.setState((state) => {
          return {
            countImages: state.countImages - this.props.step,
            isTransition: true,
          };
        });
      }, 100);
    }
  }

  updateImagesArr() {
    const {
      step,
    } = this.props;

    this.setState((state) => {
      return {
        imagesArr: [
          ...state.imagesArr.slice(step),
          ...state.imagesArr.slice(0, step),
        ],
        countImages: state.countImages - step,
        isTransition: false,
      };
    });
  }

  nextMove() {
    const {
      images,
      step,
      frameSize,
    } = this.props;

    const countSteps = this.state.countImages + step;
    const leftSpace = images.length - frameSize < step
    || images.length - step <= step
      ? images.length - Math.min(frameSize, step)
      : Math.min(images.length - step, images.length - frameSize);

    this.setState({
      countImages: Math.min(countSteps, leftSpace),
      isTransition: true,
      isNext: true,
    });
  }

  prevMove() {
    const { step, infinite, images } = this.props;
    const countSteps = this.state.countImages - step;

    if (infinite) {
      this.setState((state) => {
        return {
          imagesArr: [
            ...state.imagesArr.slice(images.length - step),
            ...state.imagesArr.slice(0, images.length - step),
          ],
          countImages: step,
          isNext: false,
          isTransition: false,
        };
      });
    } else {
      this.setState({ countImages: Math.max(countSteps, 0) });
    }
  }

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    const {
      countImages,
      imagesArr,
      isTransition,
    } = this.state;

    return (
      <div className="Carousel">
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          type="button"
          disabled={!infinite ? countImages === 0 : false}
          className="Carousel__button Carousel__button--prev"
          onClick={() => {
            this.prevMove();
          }}
        />
        <div
          className="Carousel__wrapper"
          style={{ width: `${frameSize * itemWidth}px` }}
        >
          <ul
            className="Carousel__container"
            style={{
              transform: `translateX(${-(countImages * itemWidth)}px)`,
              transitionDuration: `${isTransition ? animationDuration : 0}ms`,
            }}
          >
            {
              imagesArr.map((image) => {
                return (
                  <li key={image} className="Carousel__image">
                    <img
                      src={image}
                      alt="1"
                      width={`${itemWidth}`}
                    />
                  </li>
                );
              })
            }
          </ul>
        </div>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          type="button"
          data-cy="next"
          disabled={!infinite
            ? countImages + frameSize >= images.length
            : false}
          className="Carousel__button Carousel__button--next"
          onClick={() => {
            this.nextMove();
          }}
        />
      </div>
    );
  }
}
