import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
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

  handleChange = (target: EventTarget & HTMLInputElement) => {
    const { name, value } = target;

    this.setState(prevState => ({
      ...prevState,
      [name]: value,

    }));
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.state;

    return (
      <>
        <div className="App">
          <h1>{`Carousel with ${images.length} images`}</h1>

          <Carousel
            images={images}
            step={step}
            frameSize={frameSize}
            itemWidth={itemWidth}
            animationDuration={animationDuration}
          />
        </div>

        <form action="#" method="get" className="form">
          <label>
            <input
              type="number"
              name="step"
              min={1}
              value={step}
              onChange={(event) => {
                this.handleChange(event.target);
              }}
            />
            <span> - step</span>
          </label>

          <label>
            <input
              type="number"
              name="frameSize"
              min={1}
              value={frameSize}
              onChange={(event) => {
                this.handleChange(event.target);
              }}
            />
            <span> - frameSize</span>
          </label>

          <label>
            <input
              type="number"
              name="itemWidth"
              min={1}
              value={itemWidth}
              onChange={(event) => {
                this.handleChange(event.target);
              }}
            />
            <span> - itemWidth</span>
          </label>

          <label>
            <input
              type="number"
              name="animationDuration"
              min={0}
              value={animationDuration}
              onChange={(event) => {
                this.handleChange(event.target);
              }}
            />
            <span> - animationDuration</span>
          </label>
        </form>
      </>
    );
  }
}

export default App;
