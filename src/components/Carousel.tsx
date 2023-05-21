import React from 'react';
import './Carousel.scss';
import Animation from './Animation';

interface State {
  infiniteAuto: boolean,
  infinite: boolean;
  itemWidth: number,
  frameSize: number,
  duration: number,
  step: number;
}

interface Props {
  images: string[];
}

class Carousel extends React.Component<Props, State> {
  state = {
    infiniteAuto: false,
    infinite: false,
    duration: 1000,
    itemWidth: 130,
    frameSize: 3,
    step: 3,
  };

  frameSizeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: Number(e.target.value) });
  };

  itemWidthHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: Number(e.target.value) });
  };

  stepHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: Number(e.target.value) });
  };

  durationHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    this.setState((state) => ({
      duration: state.infiniteAuto
        ? Number(e.target.value) * 3
        : Number(e.target.value),
    }));
  };

  infiniteHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      infinite: e.target.checked,
      infiniteAuto: false,
    });
  };

  autoInfiniteHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      infiniteAuto: e.target.checked,
      infinite: false,
    });
  };

  render() {
    const {
      step,
      frameSize,
      itemWidth,
      duration,
      infinite,
      infiniteAuto,
    } = this.state;

    return (
      <div className="Carousel">
        <Animation
          step={step}
          infinite={infinite}
          infiniteAuto={infiniteAuto}
          duration={duration}
          itemWidth={itemWidth}
          frameSize={frameSize}
          images={this.props.images}
        />

        <div className="Carousel__check">
          <label htmlFor="infinite" className="Carousel__check--lable">
            Infinite steps
          </label>
          <input
            className="Carousel__check--checkbox"
            id="infinite"
            name="infinite"
            type="checkbox"
            checked={infinite}
            onChange={this.infiniteHandler}
          />

          <label htmlFor="autoInfinite" className="Carousel__check-lable">
            Auto-infinite
          </label>
          <input
            className="Carousel__check--checkbox"
            id="autoInfinite"
            name="autoInfinite"
            type="checkbox"
            checked={infiniteAuto}
            onChange={this.autoInfiniteHandler}
          />
        </div>
        <div className="Carousel__setting">
          <div className="Carousel__setting--lable">
            <label htmlFor="step" className="lable">Step:</label>
            <label htmlFor="itemWidth" className="lable">Withdrow:</label>
            <label htmlFor="frameSize" className="lable">Fraim size:</label>
            <label htmlFor="duration" className="lable"> Duration:</label>
          </div>

          <div className="Carousel__setting--slider">
            <input
              id="step"
              name="step"
              type="range"
              step="1"
              max="10"
              min="1"
              defaultValue="3"
              onChange={this.stepHandler}
              disabled={infiniteAuto && true}
            />

            <input
              id="itemWidth"
              name="itemWidth"
              type="range"
              step="10"
              min="100"
              max="200"
              defaultValue="130"
              onChange={this.itemWidthHandler}
            />

            <input
              id="frameSize"
              name="frameSize"
              type="range"
              step="1"
              max="10"
              min="1"
              defaultValue="3"
              onChange={this.frameSizeHandler}
            />

            <input
              id="duration"
              name="duration"
              type="range"
              step="250"
              max="2000"
              min="250"
              defaultValue="1000"
              onChange={this.durationHandler}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;
