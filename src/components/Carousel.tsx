import { Component } from 'react';
import './Carousel.scss';

type State = {
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration:number;
  infinite: boolean;
};

type Props = {
  images: string[];
};

class Carousel extends Component<Props, State> {
  state = {
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    // infinite: false,
  };

  render() {
    const { images } = this.props;
    const {
      itemWidth,
      step,
      frameSize,
      animationDuration,
    } = this.state;

    return (
      <>
        <div className="Form">
          <form>
            <label>
              ItemWidth:
              <input type="number" id="ItemWidth" name="ItemWidth" required />
            </label>

            <label>
              FrameSize:
              <input type="number" id="FrameSize" name="FrameSize" required />
            </label>

            <label>
              Step:
              <input type="number" id="Step" name="Step" required />
            </label>

            <label>
              Animation Duration:
              <input
                type="number"
                id="Animation"
                name="AnimationDuration"
                required
              />
            </label>

            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                e.persist();
                const itemWidthEl
                = document.getElementById('ItemWidth') as HTMLInputElement;
                const frameSizeEl
                = document.getElementById('FrameSize') as HTMLInputElement;
                const stepEl
                = document.getElementById('Step') as HTMLInputElement;
                const animationDurationEl
                = document.getElementById('Animation') as HTMLInputElement;

                const itemWidthValue
                = itemWidthEl ? +itemWidthEl.value : itemWidth;
                const frameSizeValue
                = frameSizeEl ? +frameSizeEl.value : frameSize;
                const stepValue
                = stepEl ? +stepEl.value : step;
                const animationDurationValue
                = animationDurationEl
                  ? +animationDurationEl.value
                  : animationDuration;

                this.setState({
                  itemWidth: itemWidthValue,
                  frameSize: frameSizeValue,
                  step: stepValue,
                  animationDuration: animationDurationValue,
                });
              }}
            >
              Save
            </button>

          </form>
        </div>
        <div className="Carousel">
          <ul
            className="Carousel__list"
            style={{ width: `${itemWidth * frameSize}px` }}
          >
            {images.map(pic => (
              <li
                key={images.indexOf(pic)}
                style={{ width: `${itemWidth}px` }}
              >
                <img
                  src={pic}
                  alt={images.indexOf(pic).toString()}
                  width={`${itemWidth}`}
                />
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => {
              const list = document.querySelector('.Carousel__list');

              if (list) {
                list.scrollBy({
                  top: 0,
                  left: -itemWidth * step,
                });
              }
            }}
          >
            Prev
          </button>
          <button
            type="button"
            data-cy="next"
            onClick={() => {
              const list = document.querySelector('.Carousel__list');

              if (list) {
                list.scrollBy({
                  top: 0,
                  left: itemWidth * step,
                });
              }
            }}
          >
            Next
          </button>
        </div>
      </>
    );
  }
}

export default Carousel;
