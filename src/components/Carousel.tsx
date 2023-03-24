/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Component } from 'react';
import './Carousel.scss';

interface Props {
  images: string[],
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  infinite: boolean,
}

interface State {
  position: number,
}

export class Carousel extends Component<Props, State> {
  state: State = {
    position: 0,
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinite,
    } = this.props;

    const { position } = this.state;

    const maxPosition = -(images.length * itemWidth - frameSize * itemWidth);

    const clickNext = () => {
      const newPosition = position - itemWidth * step;

      if (infinite && (position === maxPosition)) {
        this.setState({ position: 0 });

        return;
      }

      this.setState({ position: Math.max(newPosition, maxPosition) });
    };

    const clickPrev = () => {
      const newPosition = position + itemWidth * step;

      if (infinite && !position) {
        this.setState({ position: maxPosition });

        return;
      }

      this.setState({ position: Math.min(newPosition, 0) });
    };

    return (
      <div
        className="Carousel"
        style={{ width: itemWidth * frameSize }}
      >
        <div
          className="Carousel__container"
          style={{
            border: '2px solid grey',
            borderRadius: '80px',
          }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(${position}px)`,
              transition: `${animationDuration}ms`,
            }}
          >
            {images.map((image, index) => {
              return (
                <li key={image}>
                  <img
                    src={image}
                    alt={`${index + 1}`}
                    width={itemWidth}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        <div className="Carousel__buttons">
          <button
            className="Carousel__button Carousel__button-left "
            type="button"
            onClick={clickPrev}
            disabled={!infinite && position === 0}
          />

          <button
            data-cy="next"
            className=" Carousel__button Carousel__button-right"
            type="button"
            onClick={clickNext}
            disabled={!infinite && position === maxPosition}
          />
        </div>
      </div>
    );
  }
}
