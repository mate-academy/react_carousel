import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth?: number;
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
    itemWidth: 130,
    frameSize: 3,
    animationDuration: 500,
    step: 3,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValueVariable = Number(event.target.value);
    const { name } = event.target;

    const isStateKey = (str: string): str is keyof State => (
      Object.keys(this.state).includes(str)
    );

    if (isStateKey(name)) {
      this.setState({
        [name]: newValueVariable,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
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

    const inputs:string[] = Object.keys(this.state)
      .filter(el => el !== 'images');

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title"
          className="title"
        >
          {`Carousel with ${images.length} images`}
        </h1>
        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          animationDuration={animationDuration}
          step={step}
        />
        {inputs.map(variable => (
          <label className="variables" key={variable}>
            {`${variable[0].toLocaleUpperCase() + variable.slice(1)} :`}
            <input
              type="number"
              className="variables__input"
              name={`${variable}`}
              value={this.state[variable as keyof State]}
              onChange={this.handleChange}
            />
          </label>
        ))}
      </div>
    );
  }
}

export default App;
