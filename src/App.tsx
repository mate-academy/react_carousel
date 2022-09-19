import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';
import { LabelInput } from './components/Label';

interface State {
  images?: string[];
  itemWidth?: number;
  step?: number;
  frameSize?: number;
  animationDuration?: number;
  infinite?: boolean;
}

const smileImages = [
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

class App extends React.Component<{}, State> {
  state = {
    images: smileImages,
    itemWidth: 130,
    step: 3,
    frameSize: 3,
    animationDuration: 1000,
    infinite: false,
  };

  handleInfinity = () => {
    const { infinite } = this.state;

    this.setState({ infinite: !infinite });
  };

  changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name, value, type, checked,
    } = event.target;

    this.setState({
      [name]: type === 'checkbox'
        ? checked
        : +value,
    });
  };

  render() {
    const {
      images,
      itemWidth,
      step,
      frameSize,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">

        <h1 data-cy="title">{`Carousel with ${images.length} images`}</h1>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          transitionDuration={animationDuration}
          step={step}
          infinite={infinite}
        />

        <LabelInput
          labelName="Item Width: "
          value={itemWidth}
          onChange={this.changeInput}
          min={100}
          max={300}
          name="itemWidth"
        />

        <LabelInput
          labelName="Frame Size: "
          value={frameSize}
          onChange={this.changeInput}
          min={0}
          max={10}
          name="frameSize"
        />

        <LabelInput
          labelName="Carousel step: "
          value={step}
          onChange={this.changeInput}
          min={0}
          max={10}
          name="step"
        />

        <LabelInput
          labelName="Animation duration"
          value={animationDuration}
          onChange={this.changeInput}
          min={0}
          max={5000}
          name="animationDuration"
        />

        <label>
          {'Infinite? '}

          <input
            type="checkbox"
            checked={infinite}
            onClick={this.handleInfinity}
          />
        </label>
      </div>
    );
  }
}

export default App;
