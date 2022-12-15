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
  selected: number;
  size: number;
};

class Carousel extends React.Component<Props, State> {
  state = {
    selected: 0,
    size: this.props.images.length || 0,
  };

  componentDidUpdate(prevProps: Readonly<Props>): void {
    if (prevProps.infinite !== this.props.infinite) {
      this.setState({
        selected: 0,
      });
    }
  }

  handlePrev(): void {
    this.setState((prev => {
      let selected;

      if (this.props.infinite) {
        selected = prev.selected - this.props.step < 0
          ? prev.selected - this.props.step + prev.size
          : prev.selected - this.props.step;
      } else {
        selected = prev.selected - this.props.step <= 0
          ? 0
          : prev.selected - this.props.step;
      }

      return {
        selected,
      };
    }));
  }

  handleNext(): void {
    this.setState((prev => {
      let selected;

      if (this.props.infinite) {
        selected = (prev.selected + this.props.step >= prev.size
          ? prev.selected + this.props.step - prev.size
          : prev.selected + this.props.step);
      } else {
        selected = (prev.selected + this.props.step
          > prev.size - this.props.frameSize)
          ? prev.size - this.props.frameSize
          : prev.selected + this.props.step;
      }

      return {
        selected,
      };
    }));
  }

  render() {
    const {
      itemWidth,
      frameSize,
      animationDuration,
      infinite,
      images,
    } = this.props;

    const {
      selected,
      size,
    } = this.state;

    const determineHidden = (index: number) => {
      for (let i = 0; i < frameSize; i += 1) {
        if (selected + i >= size) {
          if (selected + i - size === index) {
            return 1;
          }
        } else if (selected + i === index) {
          return 1;
        }
      }

      return 0;
    };

    const determineTransform = (index: number) => { // selected: 9, index: 2
      for (let i = 0; i < frameSize; i += 1) {
        if (selected + i >= size) {
          if (selected + i - size === index) {
            return `rotateY(${-10 + ((i * 20) / (frameSize - 1))}deg)`;
          }
        } else if (selected + i === index) {
          return `rotateY(${-10 + ((i * 20) / (frameSize - 1))}deg)`;
        }
      }

      if (selected - this.props.step < 0) {
        if (selected - this.props.step + size <= index) {
          return 'rotateY(-180deg)';
        }
      }

      if (selected + frameSize + this.props.step >= size) {
        if (index <= selected + frameSize + this.props.step - size) {
          return 'rotateY(180deg)';
        }
      }

      if (index < selected) {
        return 'rotateY(-180deg)';
      }

      if (index > selected + frameSize) {
        return 'rotateY(180deg)';
      }

      return 'rotateY(180deg)';
    };

    let list;

    if (infinite) {
      list = (
        <ul
          className="Carousel__list-inf"
          style={{
            height: `${itemWidth}px`,
          }}
        >
          {images.map((img, i) => (
            <li
              key={(i + 1).toString()}
              className="Carousel__item-inf"
              style={{
                transform: determineTransform(i),
                transition: `transform ${animationDuration}s,
                  opacity ${animationDuration}s ease-in-out`,
                opacity: determineHidden(i),
              }}
            >
              <img
                width={itemWidth}
                height={itemWidth}
                src={img}
                alt={(i + 1).toString()}
              />
            </li>
          ))}
        </ul>
      );
    } else {
      list = (
        <div
          className={`Carousel__wrapper${infinite ? ' Carousel__wrapper-inf' : ''}`}
          style={{ width: `${frameSize * itemWidth}px` }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(-${selected * itemWidth}px)`,
              transition: `transform ${animationDuration}s`,
              height: `${itemWidth}px`,
            }}
          >
            {images.map((img, i) => (
              <li
                key={(i + 1).toString()}
                className="Carousel__item"
              >
                <img
                  width={itemWidth}
                  height={itemWidth}
                  src={img}
                  alt={(i + 1).toString()}
                />
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      <div className="Carousel">
        {list}

        <div>
          <button
            className="Carousel__button"
            onClick={() => this.handlePrev()}
            type="button"
            disabled={selected === 0 && !infinite}
          >
            Prev
          </button>
          <button
            className="Carousel__button"
            data-cy="next"
            onClick={() => this.handleNext()}
            type="button"
            disabled={selected >= size - frameSize
              && !infinite}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;

/**
 * A function to determine where the incoming items should be directed from.
 * Let's see if it will be implemented.
  setPositions(towards: boolean) {
    const {
      frameSize,
      step,
      images,
    } = this.props;

    const {
      size,
      selected,
    } = this.state;

    this.setState({
      position: images.map((_el, i) => {
        if (towards) {
          if (i >= selected + frameSize) {
            if (selected + frameSize + step > size) {
              if (selected + frameSize + step - size > i) {
                return true;
              }
            } else {
              return true;
            }
          }
        }

        if (i < selected) {
          if (selected - step < 0) {
            if (selected - step + size < i) {
              return true;
            }
          } else {
            return true;
          }
        }

        return false;
      }),
    });
  }

 */
