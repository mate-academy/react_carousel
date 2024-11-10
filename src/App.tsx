import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { Input } from './components/Input';
import { State } from './types/State';


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
    step: 1,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false

  };

  componentDidMount() {
    document.title = 'Carousel';
  }


  onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {

    const { name, value, checked, type } = event.target;

    this.setState(prevState => ({
      ...prevState, [name]: type === 'checkbox' ? checked : +value
    }));

  };


  render() {
    const { images, step, frameSize, itemWidth, animationDuration, infinite } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <div className="App__container">
          <form className="form">
            <fieldset>
              <legend>Data:</legend>
              <Input
                text="Step"
                name="step"
                type="number"
                label="stepId"
                value={step}
                onInputChange={this.onInputChange}
                min={1}
                max={images.length}
              />
              <Input
                text="Frame size"
                name="frameSize"
                type="number"
                label="frameSizeId"
                value={frameSize}
                onInputChange={this.onInputChange}
                min={1}
                max={images.length}
              />
              <Input
                text="Item width"
                name="itemWidth"
                label="itemWidthId"
                type="number"
                value={itemWidth}
                onInputChange={this.onInputChange}
                min={30}
              />
              <Input
                text="Animation duration"
                name="animationDuration"
                type="number"
                label="animationDurationId"
                value={animationDuration}
                onInputChange={this.onInputChange}
              />
              <Input
                text="Infinite"
                name="infinite"
                type="checkbox"
                checked={infinite}
                onInputChange={this.onInputChange}
              />
            </fieldset>
          </form>
          <Carousel images={images} frameSize={frameSize} itemWidth={itemWidth} step={step} animationDuration={animationDuration} infinite={infinite} />
        </div>
      </div>
    );
  }
}

export default App;

