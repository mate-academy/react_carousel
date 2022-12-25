import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;

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
  };

  handleFormChange = (e:React.ChangeEvent) => {
    const newVal = Number((e.target as HTMLInputElement).value);
    const key = e.target.id;

    switch (key) {
      case 'step':
        this.setState({ step: newVal });
        break;
      case 'itemWidth':
        this.setState({ itemWidth: newVal });
        break;
      case 'frameSize':
        this.setState({ frameSize: newVal });
        break;
      case 'animationDuration':
        this.setState({ animationDuration: newVal });
        break;
      default:
        this.setState({});
    }
  };

  render() {
    const {
      images, step, itemWidth, frameSize, animationDuration,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <form className="form">
          <label>
            Item Width
            <input
              type="number"
              id="itemWidth"
              defaultValue={this.state.itemWidth}
              onChange={this.handleFormChange}
            />
          </label>
          <label>
            Frame Size
            <input
              type="number"
              id="frameSize"
              defaultValue={this.state.frameSize}
              onChange={this.handleFormChange}
            />
          </label>
          <label>
            Step
            <input
              type="number"
              id="step"
              defaultValue={this.state.step}
              onChange={this.handleFormChange}
            />
          </label>
          <label>
            Animation Duration
            <input
              type="number"
              id="animationDuration"
              defaultValue={this.state.animationDuration}
              onChange={this.handleFormChange}
            />
          </label>
        </form>
        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
        />
      </div>
    );
  }
}

export default App;
