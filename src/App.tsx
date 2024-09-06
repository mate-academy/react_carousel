import React from "react";
import "./App.scss";
import Carousel from "./components/Carousel";

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
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({
      [name]: Number(value),
    } as unknown as Pick<State, keyof State>);
  };

  handleInfiniteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      infinite: event.target.checked,
    });
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration, infinite } = this.state;

    return (
      <div className="App">
        <h1>Carousel with {images.length} images</h1>

        <div className="controls">
          <label>
            Item Width:
            <input
              type="number"
              name="itemWidth"
              value={itemWidth}
              onChange={this.handleChange}
              min={50}
            />
          </label>
          <label>
            Frame Size:
            <input
              type="number"
              name="frameSize"
              value={frameSize}
              onChange={this.handleChange}
              min={1}
            />
          </label>
          <label>
            Step:
            <input
              type="number"
              name="step"
              value={step}
              onChange={this.handleChange}
              min={1}
            />
          </label>
          <label>
            Animation Duration (ms):
            <input
              type="number"
              name="animationDuration"
              value={animationDuration}
              onChange={this.handleChange}
              min={100}
            />
          </label>
          <label>
            Infinite:
            <input
              type="checkbox"
              checked={infinite}
              onChange={this.handleInfiniteChange}
            />
          </label>
        </div>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
