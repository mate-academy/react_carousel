/* eslint-disable max-len */
import React from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinity: boolean,
};

type State = {
  currentItemIndex: number,
};

export class Carousel extends React.Component<Props, State> {
  state: Readonly<State> = {
    currentItemIndex: 0,
  };

  handleButton = (step: number) => () => {
    const { images, frameSize } = this.props;
    const { currentItemIndex } = this.state;
    const lastItemIndex = images.length - frameSize;
    const firstItemIndex = 0;
    let nextItemIndex = currentItemIndex + step;

    if (step < 0) {
      if (currentItemIndex === firstItemIndex) {
        nextItemIndex = lastItemIndex;
      } else if (nextItemIndex < firstItemIndex) {
        nextItemIndex = firstItemIndex;
      }
    }

    if (step > 0) {
      if (currentItemIndex === lastItemIndex) {
        nextItemIndex = firstItemIndex;
      } else if (nextItemIndex > lastItemIndex) {
        nextItemIndex = lastItemIndex;
      }
    }

    this.setState(() => ({
      currentItemIndex: nextItemIndex,
    }));
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinity,
    } = this.props;

    const { currentItemIndex } = this.state;

    return (
      <div
        className="Carousel"
        style={{
          width: `${frameSize * itemWidth}px`,
          transition: `${animationDuration}ms`,
        }}
      >
        <ul className="Carousel__list">
          {
            images.map((img, index) => {
              return (
                <li
                  className="Carousel__item"
                  key={img}
                  style={{
                    transform: `translateX(${-currentItemIndex * itemWidth}px)`,
                    transition: `${animationDuration}ms`,
                  }}
                >
                  <img
                    width={itemWidth}
                    src={img}
                    alt={`emoji-${index + 1}`}
                  />
                </li>
              );
            })
          }
        </ul>

        <div className="Carousel__btn">
          <button
            className="Carousel__buttons"
            disabled={currentItemIndex <= 0 && !infinity}
            type="button"
            data-cy="prev"
            onClick={this.handleButton(-step)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="arrowleft"
                d="M11.9481 14.8285L10.5339 16.2427L6.29122 12L10.5339 7.7574L11.9481 9.17161L10.1196 11H17.6568V13H10.1196L11.9481 14.8285Z"
                fill="currentColor"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.22183 19.7782C-0.0739419 15.4824 -0.0739419 8.51759 4.22183 4.22183C8.51759 -0.0739419 15.4824 -0.0739419 19.7782 4.22183C24.0739 8.51759 24.0739 15.4824 19.7782 19.7782C15.4824 24.0739 8.51759 24.0739 4.22183 19.7782ZM5.63604 18.364C2.12132 14.8492 2.12132 9.15076 5.63604 5.63604C9.15076 2.12132 14.8492 2.12132 18.364 5.63604C21.8787 9.15076 21.8787 14.8492 18.364 18.364C14.8492 21.8787 9.15076 21.8787 5.63604 18.364Z"
                fill="currentColor"
              />
            </svg>
          </button>

          <button
            className="Carousel__buttons"
            disabled={
              currentItemIndex >= images.length - frameSize && !infinity
            }
            type="button"
            data-cy="next"
            onClick={this.handleButton(step)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="arrow"
                d="M12.0519 14.8285L13.4661 16.2427L17.7088 12L13.4661 7.7574L12.0519 9.17161L13.8804 11H6.34321V13H13.8803L12.0519 14.8285Z"
                fill="currentColor"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.7782 19.7782C24.0739 15.4824 24.0739 8.51759 19.7782 4.22183C15.4824 -0.0739417 8.51759 -0.0739417 4.22183 4.22183C-0.0739417 8.51759 -0.0739417 15.4824 4.22183 19.7782C8.51759 24.0739 15.4824 24.0739 19.7782 19.7782ZM18.364 18.364C21.8787 14.8492 21.8787 9.15076 18.364 5.63604C14.8492 2.12132 9.15076 2.12132 5.63604 5.63604C2.12132 9.15076 2.12132 14.8492 5.63604 18.364C9.15076 21.8787 14.8492 21.8787 18.364 18.364Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }
}
