import { Component } from 'react';
import { CarouselList } from '../CarouselList';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

type State = {
  images: string[];
  offset: number;
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

export class Carousel extends Component<Props, State> {
  state: Readonly<State> = {
    images: this.props.images,
    itemWidth: this.props.itemWidth,
    frameSize: this.props.frameSize,
    step: this.props.step,
    animationDuration: this.props.animationDuration,
    offset: 0,
    infinite: this.props.infinite,

  };

  componentDidMount(): void {
    const { infinite } = this.props;

    if (infinite) {
      this.addCloneSlidesForInfinitySlider();
    }
  }

  handleNextClick = (): void => {
    const {
      images,
      offset,
      infinite,
      itemWidth,
      step,
      animationDuration,

    } = this.state;
    const maxOffset = !infinite
      ? -((images.length - step) * itemWidth)
      : -((images.length - 2 * step) * itemWidth);
    const currentoffset = offset - step * itemWidth;

    if (!infinite) {
      this.setState({
        offset: Math.max(maxOffset, currentoffset),
      });
    }

    if (infinite) {
      this.setState({
        offset: currentoffset,
      });

      if (Math.abs(currentoffset) > Math.abs(maxOffset)) {
        setTimeout(() => {
          this.setState({
            animationDuration: 0,
            offset: (currentoffset - maxOffset),
          }, () => {
            setTimeout(() => {
              this.setState({ animationDuration });
            }, animationDuration);
          });
        }, animationDuration);
      }
    }
  };

  handlePrevClick = (): void => {
    const {
      offset,
      images, itemWidth,
      step,
      animationDuration,
      infinite,
    } = this.state;
    const currentOffset = offset + step * itemWidth;
    const offsetBySlide = step * itemWidth;

    if (!infinite) {
      this.setState({
        offset: Math.min(0, currentOffset),
      });
    }

    if (infinite) {
      const lastPositionRealSlide = -(images.length - 2 * step) * itemWidth;

      if (currentOffset === 0) {
        this.setState({
          offset: Math.min(0, currentOffset),
        });
        setTimeout(() => {
          this.setState({
            animationDuration: 0,
            offset: (lastPositionRealSlide),
          }, () => {
            setTimeout(() => {
              this.setState({ animationDuration });
            }, animationDuration);
          });
        }, animationDuration);

        return;
      }

      if (Math.abs(offset) - offsetBySlide < offsetBySlide) {
        this.setState({
          offset: currentOffset,
        });

        setTimeout(() => {
          this.setState({
            animationDuration: 0,
            offset: lastPositionRealSlide + currentOffset,
          }, () => {
            setTimeout(() => {
              this.setState({ animationDuration });
            }, animationDuration);
          });
        }, animationDuration);

        return;
      }

      this.setState({
        offset: currentOffset,
      });
    }
  };

  addCloneSlidesForInfinitySlider = () => {
    const imagesFromServer = this.props.images;
    const { step, itemWidth } = this.props;

    const imagesWithClones = [...this.props.images];

    imagesWithClones.push(...imagesFromServer.slice(0, step));
    imagesWithClones.unshift(...imagesFromServer.slice(-step));

    this.setState({
      offset: -(itemWidth * step),
      images: [...imagesWithClones],
    });
  };

  updateSlidesList = (isInfinite: boolean): void => {
    const { images } = this.props;

    if (isInfinite) {
      this.addCloneSlidesForInfinitySlider();

      return;
    }

    this.setState({ images, offset: 0, infinite: isInfinite });
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      offset,
      animationDuration,
      infinite,
    } = this.state;

    const imagesFromServer = this.props.images;

    const widthContainer = itemWidth * frameSize;
    const maxOffset = -((images.length - step) * itemWidth);

    return (
      <div
        className="wrapper"
      >
        <div className="Carousel">
          <div
            className="Carousel__wrapper"
            style={{
              width: `${widthContainer}px`,
            }}
          >
            <CarouselList
              images={images}
              itemWidth={itemWidth}
              style={{
                transform: `translateX(${offset}px)`,
                transition: `transform ${animationDuration}ms`,
              }}
            />
          </div>
          <div className="Carousel__buttons">
            <button
              type="button"
              data-cy="prev"
              onClick={this.handlePrevClick}
              disabled={!infinite && offset === 0}
            >
              Prev
            </button>
            <button
              type="button"
              data-cy="next"
              onClick={this.handleNextClick}
              disabled={!infinite && offset === maxOffset}
            >
              Next
            </button>
          </div>

          <div className="Carousel__properties">
            <label htmlFor="itemId">
              Slider Item Width
              <input
                id="itemId"
                type="number"
                defaultValue={itemWidth}
                onChange={
                  (e) => this.setState({ itemWidth: +e.target.value })
                }
              />
            </label>
            <label htmlFor="frameId">
              Slides Per Frame
              <input
                id="frameId"
                type="number"
                min="1"
                max={images.length}
                defaultValue={frameSize}
                onChange={
                  (e) => this.setState({
                    frameSize: +e.target.value,
                    images: imagesFromServer,
                  })
                }
              />
            </label>
            <label htmlFor="stepId">
              Step
              <input
                id="stepId"
                type="number"
                defaultValue={step}
                onChange={
                  (e) => this.setState({ step: +e.target.value })
                }
              />
            </label>
            <label htmlFor="durationId">
              Animation Duration (in ms)
              <input
                id="durationId"
                type="number"
                defaultValue={animationDuration}
                onChange={
                  (e) => this.setState({ animationDuration: +e.target.value })
                }
              />
            </label>

            <label htmlFor="infiniteId">
              Infinite
              <input
                id="infiniteId"
                type="checkbox"
                defaultChecked={infinite}
                onChange={
                  // (e) => this.setState({ infinite: e.target.checked })
                  (e) => this.updateSlidesList(e.target.checked)
                }
              />
            </label>

          </div>

        </div>
      </div>
    );
  }
}
