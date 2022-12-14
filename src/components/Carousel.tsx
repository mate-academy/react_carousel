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
      this.setState({ selected: 0 });
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
        selected = (prev.selected + this.props.step
          >= prev.size)
          ? prev.selected + this.props.step - prev.size
          : prev.selected + this.props.step;
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

    const determineTransform = (index: number) => {
      if (index === selected) {
        return 'rotateZ(0)';
      }

      for (let i = 2; i < size / 2; i += 1) {
        if (index === selected + i) {
          return 'rotateZ(-180deg)';
        }

        if (selected + i >= size) {
          if (selected + i - size === index) {
            return 'rotateZ(-180deg)';
          }
        }

        if (selected - i === index) {
          return 'rotateZ(180deg)';
        }

        if (selected - i < 0) {
          if (selected - i + size === index) {
            return 'rotateZ(180deg)';
          }
        }
      }

      if (selected === 0 && index === size - 1) {
        return `rotateZ(${(itemWidth / 130) * 7}deg)`;
      }

      if (index === 0 && selected === size - 1) {
        return `rotateZ(-${(itemWidth / 130) * 7}deg)`;
      }

      if (index + 1 === selected) {
        return `rotateZ(${(itemWidth / 130) * 7}deg)`;
      }

      if (index - 1 === selected) {
        return `rotateZ(-${(itemWidth / 130) * 7}deg)`;
      }

      return 'rotateZ(180deg)';
    };

    let list;

    if (infinite) {
      list = (
        <ul
          className="Carousel__list-inf"
          style={{
            height: `${itemWidth}px`,
            transform: `translateX(${-itemWidth / 2}px)`,
          }}
        >
          {images.map((img, i) => (
            <li
              key={(i + 1).toString()}
              className="Carousel__item-inf"
              style={{
                opacity: i === selected ? 1 : 0.1,
                transform: determineTransform(i),
                transition: `transform ${animationDuration}s`,
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
      );
    }

    return (
      <div className="Carousel">
        <div
          className={`Carousel__wrapper${infinite ? ' Carousel__wrapper-inf' : ''}`}
          style={{ width: `${frameSize * itemWidth}px` }}
        >
          {list}
        </div>

        <button
          onClick={() => this.handlePrev()}
          type="button"
          disabled={selected === 0 && !infinite}
        >
          Prev
        </button>
        <button
          data-cy="next"
          onClick={() => this.handleNext()}
          type="button"
          disabled={selected >= size - frameSize
            && !infinite}
        >
          Next
        </button>
      </div>
    );
  }
}

export default Carousel;
