import React from 'react';
import classnames from 'classnames';
import './Carousel.scss';

interface Props {
  images: string[],
}

interface State {
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
  transtaleX: number,
}

class Carousel extends React.Component<Props, State> {
  state = {
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
    transtaleX: 0,
  };

  infiniteState = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      this.setState({ infinite: true });

      return;
    }

    if (!e.target.checked) {
      this.setState({ infinite: false });
    }
  };

  frameSizeState = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      frameSize: +e.currentTarget.value,
    });
  };

  stepState = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      step: +e.currentTarget.value,
    });
  };

  itemWidthState = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      itemWidth: +e.currentTarget.value,
    });
  };

  animationState = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      animationDuration: +e.currentTarget.value,
    });
  };

  render() {
    const {
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
      transtaleX,
    } = this.state;

    const { images } = this.props;

    const containerWidth = frameSize * itemWidth;
    const maxContainerWidth = itemWidth * images.length;
    const translateShift = step * itemWidth;

    const containerStyle = {
      maxWidth: `${containerWidth}px`,
    };

    const listAnimationStyle = {
      transition: `all ${animationDuration / 1000}s ease 0s`,
      transform: `translateX(${transtaleX}px)`,
    };

    const handleLeftClick = () => {
      if (transtaleX === 0 && infinite) {
        this.setState({ transtaleX: -maxContainerWidth + containerWidth });

        return;
      }

      if (transtaleX + translateShift > 0) {
        this.setState({ transtaleX: 0 });

        return;
      }

      this.setState({ transtaleX: transtaleX + translateShift });
    };

    const handleRightClick = () => {
      if (transtaleX === -maxContainerWidth + containerWidth && infinite) {
        this.setState({ transtaleX: 0 });

        return;
      }

      if (transtaleX + (-translateShift)
      - containerWidth <= -maxContainerWidth) {
        this.setState({
          transtaleX: -maxContainerWidth + containerWidth,
        });

        return;
      }

      this.setState({ transtaleX: transtaleX + -translateShift });
    };

    return (
      <div className="wrapper">
        <div className="Carousel">
          <button
            className={classnames({
              Carousel__button: true,
              Carousel__button_left: true,
              disabledLeft: transtaleX === 0 && !infinite,
            })}
            type="button"
            disabled={transtaleX === 0 && !infinite}
            onClick={handleLeftClick}
          >
            {' '}
          </button>
          <div className="Carousel__container" style={containerStyle}>
            <ul className={`Carousel__list ${infinite ? '_active' : ''}`} style={listAnimationStyle}>
              {images.map(item => (
                <li
                  key={item}
                >
                  <img
                    height={itemWidth}
                    width={itemWidth}
                    src={item}
                    alt={item.match(/\d+/g)?.join('')}
                  />
                </li>
              ))}
            </ul>
          </div>
          <button
            type="button"
            className={classnames({
              Carousel__button: true,
              Carousel__button_right: true,
              disabledRight:
                transtaleX === -maxContainerWidth + containerWidth && !infinite,
            })}
            data-cy="next"
            disabled={
              transtaleX === -maxContainerWidth + containerWidth && !infinite
            }
            onClick={handleRightClick}
          >
            {' '}
          </button>
        </div>
        <div className="wrapper__items">
          <div className="wrapper__item wrapper__item-framesize">
            <label htmlFor="">
              {`Frame size is ${frameSize} `}
              <input
                onInput={this.frameSizeState}
                type="range"
                min={2}
                max={5}
                defaultValue={frameSize}
              />
            </label>
          </div>
          <div className="wrapper__item wrapper__item-step">
            <label htmlFor="">
              {`Step number is ${step} `}
              <input
                onInput={this.stepState}
                type="range"
                min={2}
                max={5}
                defaultValue={step}
              />
            </label>
          </div>
          <div className="wrapper__item wrapper__item-itemWidth">
            <label htmlFor="">
              {`Itemwidth is ${itemWidth}px `}
              <input
                onInput={this.itemWidthState}
                type="range"
                min={130}
                max={200}
                defaultValue={itemWidth}
              />
            </label>
          </div>
          <div className="wrapper__item wrapper__item-animationDuration">
            <label htmlFor="">
              {`Animation duration is ${Math.round(animationDuration / 1000)}s `}
              <input
                onInput={this.animationState}
                type="range"
                min={1000}
                max={3000}
                defaultValue={animationDuration}
              />
            </label>
          </div>
          <div className="wrapper__item wrapper__item-infinite">
            <label htmlFor="">
              {'Infinite '}
              <input
                onChange={this.infiniteState}
                type="checkbox"
              />
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;
