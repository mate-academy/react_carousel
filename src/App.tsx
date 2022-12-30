import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {[key: string]: number | string[]}

class App extends React.Component<{}, State> {
  state = {
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
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
  };

  setParams = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name } = e.currentTarget;
    const value = Number(e.currentTarget.value);
    const min = Number(e.currentTarget.min);
    const max = Number(e.currentTarget.max);

    switch (true) {
      case (value < min):
        this.setState({ [name]: min });
        break;
      case (value > max):
        this.setState({ [name]: max });
        break;
      default:
        this.setState({ [name]: value });
    }
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
    } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title">
          {`Carousel with ${images.length} images`}
        </h1>

        <form className="App__controls">
          <label className="App__controlsField" htmlFor="itemId">
            <span className="App_controlsLabel">Images Size:</span>
            <input
              id="itemId"
              onChange={(e) => this.setParams(e)}
              className="App__controlsInput"
              type="number"
              name="itemWidth"
              min={1}
              max={500}
              value={itemWidth}
              required
            />
          </label>

          <label className="App__controlsField" htmlFor="frameId">
            <span className="App_controlsLabel">Frame Size:</span>
            <input
              id="frameId"
              onChange={(e) => this.setParams(e)}
              className="App__controlsInput"
              type="number"
              name="frameSize"
              value={frameSize}
              min={1}
              max={images.length}
              required
            />
          </label>

          <label className="App__controlsField" htmlFor="stepId">
            <span className="App_controlsLabel">Step:</span>
            <input
              id="stepId"
              onChange={(e) => this.setParams(e)}
              className="App__controlsInput"
              type="number"
              name="step"
              value={step}
              min={1}
              max={images.length}
              required
            />
          </label>

          <label className="App__controlsField">
            <span className="App_controlsLabel">Animation duration:</span>
            <input
              onChange={(e) => this.setParams(e)}
              className="App__controlsInput"
              type="number"
              name="animationDuration"
              min={0}
              max={100000}
              value={animationDuration}
              required
            />
          </label>
        </form>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
        />
      </div>
    );
  }
}

export default App;
