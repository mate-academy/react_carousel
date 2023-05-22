import React from 'react';
import Gallery from './Gallery';

interface State {
  animationName: string,
  vector: number,
  from: number,
  to: number,
}

interface Props {
  infiniteAuto: boolean,
  infinite: boolean,
  itemWidth: number,
  frameSize: number,
  duration: number,
  images: string[];
  step: number;
}

class Animation extends React.Component<Props, State> {
  state = {
    animationName: '',
    vector: -1,
    from: 0,
    to: 0,
  };

  componentDidUpdate(prevProps: Props) {
    if (prevProps.itemWidth !== this.props.itemWidth
      || prevProps.infiniteAuto !== this.props.infiniteAuto) {
      this.setState({ from: 0, to: 0 });
    }

    document.documentElement.style.setProperty('--from', `${this.state.from}px`);
    document.documentElement.style.setProperty('--to', `${this.state.to}px`);
  }

  setAnimationSteps(start: number, finish: number) {
    this.setState((state) => ({
      animationName: state.animationName === 'scroll' ? 'nextScroll' : 'scroll',
      from: start,
      to: finish,
    }));
  }

  getDistance = () => this.props.itemWidth * this.props.step;

  getFrameLimit = () => this.props.itemWidth * (
    this.props.images.length - this.props.frameSize
  );

  getLimit = () => this.props.itemWidth
    * this.props.images.length
    * this.state.vector;

  setStepsLeft = () => {
    const { to } = this.state;
    const distance = this.getDistance();
    const destination = distance + to;

    const start = to;
    const finish = destination > 0 ? 0 : destination;

    this.setAnimationSteps(start, finish);
  };

  setStepsRight = () => {
    const { to, vector } = this.state;
    const frameLimit = this.getFrameLimit();
    const distance = this.getDistance();

    const destination = distance * vector;
    const avalable = (frameLimit - Math.abs(to)) * vector;

    const start = to;
    const finish = start + (
      destination < avalable ? avalable : destination
    );

    this.setAnimationSteps(start, finish);
  };

  setInfiniteStepsRight = () => {
    const { vector, to } = this.state;
    const distance = this.getDistance();
    const limit = this.getLimit();

    let start = to;
    let finish = (distance + Math.abs(to)) * vector;

    if (finish < limit * 2) {
      start -= limit;
      finish -= limit;
    }

    this.setAnimationSteps(start, finish);
  };

  setInfiniteStepsLeft = () => {
    const { to } = this.state;
    const limit = this.getLimit();
    const distance = this.getDistance();

    let start = (to === 0) ? (limit * 2) : to;
    let finish = start + distance;

    if (finish > 0) {
      start += limit;
      finish += limit;
    }

    this.setAnimationSteps(start, finish);
  };

  setAutoInfinitLeft = () => {
    const start = 0;
    const finish = this.getLimit();

    this.setState({ from: 0, to: 0 });
    this.setAnimationSteps(start, finish);
  };

  setAutoInfinitRight = () => {
    const start = this.getLimit();
    const finish = 0;

    this.setAnimationSteps(start, finish);
  };

  rightButtonHandler = () => {
    if (this.props.infiniteAuto) {
      return this.setAutoInfinitRight();
    }

    return this.props.infinite
      ? this.setInfiniteStepsRight()
      : this.setStepsRight();
  };

  leftButtonHandler = () => {
    if (this.props.infiniteAuto) {
      return this.setAutoInfinitLeft();
    }

    return this.props.infinite
      ? this.setInfiniteStepsLeft()
      : this.setStepsLeft();
  };

  render() {
    const { animationName } = this.state;
    const {
      images,
      itemWidth,
      duration,
      frameSize,
      infiniteAuto,
    } = this.props;

    return (
      <>
        <div className="Carousel__GalleryBorder">
          <Gallery
            images={images}
            itemWidth={itemWidth}
            animationName={animationName}
            infiniteAuto={infiniteAuto}
            duration={duration}
            frameSize={frameSize}
          />
        </div>

        <div className="Carousel__buttons">
          <button
            type="button"
            className="Carousel__buttons--button"
            onClick={this.leftButtonHandler}
          >
            {infiniteAuto ? 'Rotate left' : 'Prev'}
          </button>

          <button
            type="button"
            className="Carousel__buttons--button"
            onClick={this.rightButtonHandler}
          >
            {infiniteAuto ? 'Rotate right' : 'Next'}
          </button>
        </div>
      </>
    );
  }
}

export default Animation;
