import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { Images } from './types/Images';
import { getUniqueId } from './utils/getUniqueId';

interface State {
  images: Images;
  steps: number[];
  selectedStep: number;
  framesSize: number[];
  selectedFrameSize: number;
  itemsWidth: number[];
  selectedItemWidth: number;
  animationsDuration: number[];
  selectedAnimationDuration: number;
}

class App extends React.Component<{}, State> {
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

    steps: [
      1,
      2,
      3,
      4,
      5,
    ],

    selectedStep: 3,

    framesSize: [
      1,
      2,
      3,
      4,
      5,
    ],

    selectedFrameSize: 3,

    itemsWidth: [
      130,
      140,
      150,
      160,
      170,
      180,
    ],

    selectedItemWidth: 130,

    animationsDuration: [
      500,
      1000,
      1500,
      2000,
      1500,
      2500,
      3000,
      3500,
    ],

    selectedAnimationDuration: 1000,
  };

  handleStepChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ selectedStep: +event.target.value });
  };

  handleFrameSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ selectedFrameSize: +event.target.value });
  };

  handleItemWidthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ selectedItemWidth: +event.target.value });
  };

  handleAnimationDurationChange =
  (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ selectedAnimationDuration: +event.target.value });
  };

  render() {
    const {
      images,
      steps,
      selectedStep,
      framesSize,
      selectedFrameSize,
      itemsWidth,
      selectedItemWidth,
      animationsDuration,
      selectedAnimationDuration,
    } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title">{`Carousel with ${images.length} images`}</h1>

        <section className="Control-panel">
          <div className="Control-panel__select-steps">
            <label htmlFor="label-step">
              Enter the number of steps
            </label>

            <select
              name="label-step"
              onChange={this.handleStepChange}
              value={selectedStep}
            >
              {
                steps.map(item => (
                  <option
                    value={item}
                    key={getUniqueId()}
                  >
                    {item}
                  </option>
                ))
              }
            </select>
          </div>

          <div className="Control-panel__select-frameSize">
            <label htmlFor="label-frameSize">
              Enter the number of frameSize
            </label>

            <select
              name="label-frameSize"
              onChange={this.handleFrameSizeChange}
              value={selectedFrameSize}
            >
              {
                framesSize.map(item => (
                  <option
                    value={item}
                    key={getUniqueId()}
                  >
                    {item}
                  </option>
                ))
              }
            </select>
          </div>

          <div className="Control-panel__select-itemsWidth">
            <label htmlFor="itemsWidthSelect">
              Select image width
            </label>

            <select
              name="itemsWidthSelect"
              onChange={this.handleItemWidthChange}
              value={selectedItemWidth}
            >
              {
                itemsWidth.map(item => (
                  <option
                    value={item}
                    key={getUniqueId()}
                  >
                    {item}
                  </option>
                ))
              }
            </select>
          </div>

          <div className="Control-panel__select-animationsDuration">
            <label htmlFor="itemsWidthSelect">
              Select the duration of the animation
            </label>

            <select
              name="itemsWidthSelect"
              onChange={this.handleAnimationDurationChange}
              value={selectedAnimationDuration}
            >
              {
                animationsDuration.map(item => (
                  <option
                    value={item}
                    key={getUniqueId()}
                  >
                    {item}
                  </option>
                ))
              }
            </select>
          </div>
        </section>

        <Carousel
          images={images}
          step={selectedStep}
          frameSize={selectedFrameSize}
          itemWidth={selectedItemWidth}
          animationDuration={selectedAnimationDuration}
        />
      </div>
    );
  }
}

export default App;
