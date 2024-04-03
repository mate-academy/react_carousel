import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidthState: number;
  frameSizeState: number;
  stepState: number;
  animationDurationState: number;
  isInfiniteState: boolean;
}

type Props = {
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
};

class App extends React.Component<Props, State> {
  state: State = {
    images: [
      './img/1.png',
      './img/2.png',
      './img/3.png',
      './img/4.png',
      './img/5.png',
      './img/6.png',
      './img/7.png',
      './img/8.png',
      './img/9.png',
      './img/10.png',
    ],
    stepState: this.props.step || 3,
    frameSizeState: this.props.frameSize || 3,
    itemWidthState: this.props.itemWidth || 130,
    animationDurationState: this.props.animationDuration || 1000,
    isInfiniteState: false,
  };

  setStepState = (newStep: number) => {
    this.setState({ stepState: newStep });
  };

  setFrameSizeState = (newFrameSize: number) => {
    this.setState({ frameSizeState: newFrameSize });
  };

  setItemWidthState = (newItemWidth: number) => {
    this.setState({ itemWidthState: newItemWidth });
  };

  setAnimationDurationState = (newDuration: number) => {
    this.setState({ animationDurationState: newDuration });
  };

  setIsInfiniteState = () => {
    this.setState(prevState => ({
      isInfiniteState: !prevState.isInfiniteState,
    }));
  };

  render() {
    const {
      images,
      itemWidthState,
      frameSizeState,
      stepState,
      animationDurationState,
      isInfiniteState,
    } = this.state;

    return (
      <div className="App">
        <h1 className="title" data-cy="title">
          Carousel with {images.length} images
        </h1>

        <Carousel
          itemWidthState={itemWidthState}
          frameSizeState={frameSizeState}
          stepState={stepState}
          animationDurationState={animationDurationState}
          isInfiniteState={isInfiniteState}
          images={images}
        />

        <div className="Carousel__input-box">
          <p>Item Width</p>
          <input
            className="Carousel__input"
            type="number"
            min={50}
            max={300}
            step={10}
            onChange={e => this.setItemWidthState(Number(e.target.value))}
            value={itemWidthState}
          />
          <p>Step</p>
          <input
            className="Carousel__input"
            type="number"
            min={0}
            max={images.length}
            step={1}
            onChange={e => {
              if (
                Number(e.target.value) > images.length ||
                Number(e.target.value) < 0
              ) {
                this.setStepState(1);
              } else {
                this.setStepState(Number(e.target.value));
              }
            }}
            value={stepState}
          />
          <p>Frame Size</p>
          <input
            className="Carousel__input"
            type="number"
            min={0}
            max={images.length}
            step={1}
            onChange={e => {
              if (
                Number(e.target.value) > images.length ||
                Number(e.target.value) < 0
              ) {
                this.setFrameSizeState(3);
              } else {
                this.setFrameSizeState(Number(e.target.value));
              }
            }}
            value={frameSizeState}
          />
          <p>Animation Duration</p>
          <input
            className="Carousel__input"
            type="number"
            min={0}
            step={100}
            onChange={e =>
              this.setAnimationDurationState(Number(e.target.value))
            }
            value={animationDurationState}
          />
          <p>Infinite</p>
          <input
            className="Carousel__input"
            checked={isInfiniteState}
            type="checkbox"
            onChange={() => this.setIsInfiniteState()}
          />
        </div>
      </div>
    );
  }
}

export default App;
