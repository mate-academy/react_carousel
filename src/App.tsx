import { Component } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
}

type Props = {
  images: string[]
};

export const imagesList = [
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
];

export class App extends Component<Props, State> {
  state = {
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
  };

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState(prevState => (
      {
        ...prevState,
        [name]: +value,
      }
    ));
  };

  render() {
    const {
      itemWidth,
      frameSize,
      step,
      animationDuration,
    } = this.state;

    const { images } = this.props;

    return (
      <div className="App">
        <h1 title="carousel">
          {`Carousel with ${images.length} images`}
        </h1>

        <div className="labels">
          <label className="labels__item">
            Item width:
            <input
              type="number"
              name="itemWidth"
              value={itemWidth}
              onChange={this.handleInput}
              min="100"
              max="200"
            />
          </label>

          <label className="labels__item">
            Frame size:
            <input
              type="number"
              name="frameSize"
              value={frameSize}
              onChange={this.handleInput}
              min="1"
              max="5"
            />
          </label>

          <label className="labels__item">
            Step:
            <input
              type="number"
              name="step"
              value={step}
              onChange={this.handleInput}
              min="1"
            />
          </label>

          <label className="labels__item">
            Animation duration:
            <input
              type="number"
              name="animationDuration"
              value={animationDuration}
              onChange={this.handleInput}
            />
          </label>
        </div>

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
