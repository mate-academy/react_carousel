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
    const { name, value } = e.currentTarget;

    this.setState({ [name]: Number(value) });
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
          <label className="App__controlsField">
            <span className="App_controlsLabel">Images Size:</span>
            <input
              onChange={(e) => this.setParams(e)}
              className="App__controlsInput"
              type="number"
              name="itemWidth"
              defaultValue={itemWidth}
              required
            />
          </label>

          <label className="App__controlsField">
            <span className="App_controlsLabel">Frame Size:</span>
            <input
              onChange={(e) => this.setParams(e)}
              className="App__controlsInput"
              type="number"
              name="frameSize"
              defaultValue={frameSize}
              min={1}
              max={images.length}
              required
            />
          </label>

          <label className="App__controlsField">
            <span className="App_controlsLabel">Step:</span>
            <input
              onChange={(e) => this.setParams(e)}
              className="App__controlsInput"
              type="number"
              name="step"
              defaultValue={step}
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
              defaultValue={animationDuration}
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
