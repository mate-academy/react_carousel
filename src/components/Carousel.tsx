import React from 'react';
import classNames from 'classnames';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
}

interface State {
  move: number
}

enum Action{
  previous = 'Prev',
  next = 'Next',
}

export class Carousel extends React.Component<Props, State> {
  state = {
    move: 0,
  };

  moveAction = (event: React.MouseEvent<HTMLButtonElement>) => {
    const direction: Action = event.currentTarget.innerText as Action;

    const {
      images,
      step,
      frameSize,
      itemWidth,
      infinite,
    } = this.props;

    const endOfCarousel = itemWidth * images.length - frameSize * itemWidth;

    if (direction === 'Prev') {
      this.setState(({ move }) => {
        const scroll = move - step * itemWidth;

        switch (true) {
          case (move === 0 && infinite):
            return { move: endOfCarousel };

          case (scroll <= 0):
            return ({ move: 0 });

          default:
            return ({ move: scroll });
        }
      });
    }

    if (direction === 'Next') {
      this.setState(({ move }) => {
        const scroll = move + step * itemWidth;

        switch (true) {
          case (move === endOfCarousel && !infinite):
            return null;

          case (move === endOfCarousel && infinite):
            return ({ move: 0 });

          case (scroll >= endOfCarousel):
            return ({ move: endOfCarousel });

          default:
            return ({ move: scroll });
        }
      });
    }
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    const { move } = this.state;

    const endOfCarousel = itemWidth * images.length - frameSize * itemWidth;

    return (
      <div
        className="Carousel"
        style={{
          width: `${frameSize * itemWidth}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translate(-${move}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((img, id) => (
            <li
              className="Carousel__list-item"
              key={`${id + 1}`}
              style={{
                minWidth: itemWidth,
                height: itemWidth,
              }}
            >
              <img
                src={img}
                alt={`smile#${id + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </li>
          ))}
        </ul>

        <div className="Carousel__buttons">
          <button
            className={classNames(
              'Carousel__buttons-left',
              {
                'Carousel__buttons-left_disabled': !!(move === 0 && !infinite),
              },
            )}
            disabled={!!(move === 0 && !infinite)}
            type="button"
            onClick={this.moveAction}
          >
            Prev
          </button>
          <button
            className={classNames(
              'Carousel__buttons-right',
              {
                'Carousel__buttons-right_disabled':
                !!(move === endOfCarousel && !infinite),
              },
            )}
            disabled={!!(move === endOfCarousel && !infinite)}
            type="button"
            onClick={this.moveAction}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
