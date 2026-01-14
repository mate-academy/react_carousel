import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { Input } from './components/input/Input';
import { Label } from './types/label';
import { State } from './types/State';
import { NumericKeys } from './types/NumericKeys';

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
    infinity: false,
  };

  handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as NumericKeys;
    const value =
      name === 'infinity' ? event.target.checked : Number(event.target.value);

    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="App__input-wrraper">
          <Input
            labelValue={Label.ItemWidth}
            type="number"
            handleOnChange={this.handleOnChange}
            name="itemWidth"
            value={this.state.itemWidth}
          />
          <Input
            labelValue={Label.FrameSize}
            type="number"
            handleOnChange={this.handleOnChange}
            name="frameSize"
            value={this.state.frameSize}
          />
          <Input
            labelValue={Label.Step}
            type="number"
            handleOnChange={this.handleOnChange}
            name="step"
            value={this.state.step}
          />
          <Input
            labelValue={Label.AnimationDuration}
            type="number"
            handleOnChange={this.handleOnChange}
            name="animationDuration"
            value={this.state.animationDuration}
          />
          <Input
            labelValue={Label.Infinity}
            type="checkbox"
            handleOnChange={this.handleOnChange}
            name="infinity"
            checked={this.state.infinity}
          />
        </div>

        <Carousel
          images={this.state.images}
          itemWidth={this.state.itemWidth}
          frameSize={this.state.frameSize}
          step={this.state.step}
          animationDuration={this.state.animationDuration}
          infinity={this.state.infinity}
        />
      </div>
    );
  }
}

export default App;
