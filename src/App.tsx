import React from "react";
import "./App.scss";
import Carousel from "./components/Carousel";
import { State } from "./types";

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

  handleStateChange = (field: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState((prevState) => ({
      ...prevState,
      [field]: +event.target.value || event.target.checked,
    }));
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>Carousel with {images.length} images</h1>
        <form action="" className="App__carousel-opt-form">
          <div className="App__carousel-opt-form-field">
            <label htmlFor="step">Enter Desired Step: </label>
            <input
              className="App__carousel-opt-form-field-input"
              id="item-step"
              name="item-step"
              type="number"
              min="1"
              max={images.length}
              value={step}
              onChange={this.handleStateChange("step")}
            />
          </div>
          <div className="App__carousel-opt-form-field">
            <label htmlFor="frame-size">Enter Desired Frame Size: </label>
            <input
              className="App__carousel-opt-form-field-input"
              id="frame-size"
              name="frame-size"
              type="number"
              min="1"
              max={images.length}
              value={frameSize}
              onChange={this.handleStateChange("frameSize")}
            />
          </div>
          <div className="App__carousel-opt-form-field">
            <label htmlFor="item-width">Enter Desired Frame Size: </label>
            <input
              className="App__carousel-opt-form-field-input"
              id="item-width"
              name="item-width"
              type="number"
              min="10"
              step="10"
              value={itemWidth}
              onChange={this.handleStateChange("itemWidth")}
            />
          </div>
          <div className="App__carousel-opt-form-field">
            <label htmlFor="animation-duration">
              Enter Desired Animation Duration Time (in ms):
            </label>
            <input
              className="App__carousel-opt-form-field-input"
              id="animation-duration"
              name="animation-duration"
              type="number"
              min="0"
              step="500"
              value={animationDuration}
              onChange={this.handleStateChange("animationDuration")}
            />
          </div>
          <div className="App__carousel-opt-form-field">
            <label htmlFor="is-infinite">Infinite flag:</label>
            <input
              className="App__carousel-opt-form-field-input"
              id="is-infinite"
              name="is-infinite"
              type="checkbox"
              onChange={this.handleStateChange("infinite")}
            />
          </div>
        </form>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
