import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
}

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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  changeValue = (event: { target: { value: string; name: string; } }): void => {
    const targetName = event.target.name;
    const { value } = event.target;

    if (targetName === 'itemWidth') {
      this.setState({
        itemWidth: +value,
      });
    }

    if (targetName === 'animationDuration') {
      this.setState({
        animationDuration: +value,
      });
    }

    if (targetName === 'frameSize') {
      this.setState({
        frameSize: +value,
      });
    }

    if (targetName === 'step') {
      this.setState({
        step: +value,
      });
    }

    if (targetName === 'infinite') {
      this.setState((state) => ({
        infinite: !state.infinite,
      }
      ));
    }
  };

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 className="App__title" >Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          frameSize={this.state.frameSize}
          itemWidth={this.state.itemWidth}
          animationDuration={this.state.animationDuration}
          step={this.state.step}
          infinite={this.state.infinite}
        />

        <div className="App__boxform">
          <form method="get" className="App__form">
            <span className="App__spanform">Item Width:</span>
            <input
              className="App__inputform"
              name="itemWidth"
              type="number"
              min={100}
              max={200}
              defaultValue={this.state.itemWidth}
              onChange={this.changeValue}
            />

            <span className="App__spanform">Frame Size:</span>
            <input
              className="App__inputform"
              name="frameSize"
              type="number"
              min={3}
              max={5}
              defaultValue={this.state.frameSize}
              onChange={this.changeValue}
            />

            <span className="App__spanform">Step:</span>
            <input
              className="App__inputform"
              name="step"
              type="number"
              min={2}
              max={5}
              defaultValue={this.state.step}
              onChange={this.changeValue}
            />

            <span className="App__spanform">Animation Duration ms:</span>
            <input
              className="App__inputform"
              name="animationDuration"
              type="number"
              min={1000}
              max={5000}
              defaultValue={this.state.animationDuration}
              onChange={this.changeValue}
            />

            <span className="App__spanform">Infinity Animation</span>
            <input
              className="App__checkboxform"
              name="infinite"
              type="checkbox"
              onChange={this.changeValue}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
