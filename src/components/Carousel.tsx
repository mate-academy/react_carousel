import { Component } from 'react';
import './Carousel.scss';
import { v4 as uuid } from 'uuid';

interface Props {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}

interface State {
  position: number;
}

// eslint-disable-next-line react/prefer-stateless-function
export class Carousel extends Component<Props, State> {
  state = {
    position: 0,
  };

  componentDidMount() {
    const buttons = document.querySelector('.Carousel__buttons');

    if (buttons) {
      buttons.children[0].addEventListener('click', () => {
        this.setState((state, props) => {
          if (props.infinite && !state.position) {
            return { position: props.images.length - props.frameSize };
          }

          return { position: Math.max(0, state.position - props.step) };
        });
      });
      buttons.children[1].addEventListener('click', () => {
        this.setState((state, props) => {
          if (props.infinite && state.position
            === props.images.length - props.frameSize) {
            return { position: 0 };
          }

          return {
            position: Math.min(props.images.length - props.frameSize,
              state.position + props.step),
          };
        });
      });
    }
  }

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      animationDuration,
      infinite,
    } = this.props;
    const { position } = this.state;

    return (
      <div
        className="Carousel"
        style={{ width: itemWidth * frameSize }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${itemWidth * position}px)`,
            width: itemWidth * images.length,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {
            images
              .map((image, i) => (
                <li key={uuid()}>
                  <img
                    src={image}
                    alt={(i + 1).toString()}
                    width={itemWidth}
                    height={itemWidth}
                  />
                </li>
              ))
          }
        </ul>

        <div
          className="Carousel__buttons"
          style={{ width: itemWidth * frameSize }}
        >
          <button
            type="button"
            disabled={!infinite && position === 0}
            className="button"
          >
            ↶
          </button>
          <button
            type="button"
            disabled={!infinite && position === images.length - frameSize}
            data-cy="next"
            className="button"
          >
            ↷
          </button>
        </div>
      </div>
    );
  }
}
