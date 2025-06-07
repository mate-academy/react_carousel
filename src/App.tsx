import React from "react";
import "./App.scss";
import Carousel from "./components/Carousel";
import CarouselSettings from "./components/CarouselSettings";

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
}

class App extends React.Component<{}, State> {
  state = {
    images: [
      "./img/1.png",
      "./img/2.png",
      "./img/3.png",
      "./img/4.png",
      "./img/5.png",
      "./img/6.png",
      "./img/7.png",
      "./img/8.png",
      "./img/9.png",
      "./img/10.png",
    ],
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  handleStepChange = (value: number) => {
    this.setState({ step: value });
  };

  handleItemWidthChange = (value: number) => {
    this.setState({ itemWidth: value });
  };

  handleFrameSizeChange = (value: number) => {
    this.setState({ frameSize: value });
  };

  handleAnimationDurationChange = (value: number) => {
    this.setState({ animationDuration: value });
  };

  handleInfiniteChange = (value: boolean) => {
    this.setState({ infinite: value });
  };

  render() {
    const { images, step, itemWidth, frameSize, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <CarouselSettings
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
          onStepChange={this.handleStepChange}
          onFrameSizeChange={this.handleFrameSizeChange}
          onItemWidthChange={this.handleItemWidthChange}
          onAnimationDurationChange={this.handleAnimationDurationChange}
          onInfiniteChange={this.handleInfiniteChange}
        />
      </div>
    );
  }
}

export default App;
