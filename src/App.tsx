/* eslint-disable no-console */
import React from 'react';
import './App.scss';
import './components/Form.scss';
import Carousel from './components/Carousel';
import { FormField } from './components/FormField';

interface State {
  images: string[];
  step: number,
  frameSize: number;
  itemWidth: number;
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
    step: 2,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 700,
    infinite: false,
  };

  handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;

    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  setInfinite = () => {
    this.setState(state => ({
      infinite: !state.infinite,
    }));
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1
          className="App__title"
          data-cy="title"
        >
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <form className="Form" action="./">
          <FormField
            name="step"
            label="Step"
            value={step}
            onChange={this.handleChange}
          />
          <FormField
            name="frameSize"
            label="Frame Size"
            value={frameSize}
            onChange={this.handleChange}
          />
          <FormField
            name="itemWidth"
            label="Item Width"
            value={itemWidth}
            onChange={this.handleChange}
          />
          <FormField
            name="animationDuration"
            label="Animation Duration"
            value={animationDuration}
            onChange={this.handleChange}
          />
          <label className="Form__field-checbox-text">
            Infinite:
            <input
              type="checkbox"
              checked={infinite}
              onChange={(e) => {
                this.setState({ infinite: e.target.checked });
              }}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default App;
