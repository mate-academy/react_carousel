import React from 'react';
import { ChangeEvent } from 'react';
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
    itemWidth: 390,
    frameSize: 130,
    animationDuration: 500,
    step: 3,
  };

  // handleChange = (name: string, value:number) => {
  //   this.setState((prevState) => ({ ...prevState, [name]: value }));
  // };

  handleChangeWidth = (event: ChangeEvent<HTMLInputElement>) => {
    const itemWidth1 = Number(event.target.value);

    this.setState({ itemWidth: itemWidth1 });
  };

  handleChangeAnimationDuration = (event: ChangeEvent<HTMLInputElement>) => {
    const animationDuration = Number(event.target.value);

    this.setState({ animationDuration });
  };

  handleChangeFrameSize = (event: ChangeEvent<HTMLInputElement>) => {
    const frameSize = Number(event.target.value);

    this.setState({ frameSize });
  };

  handleChangeStep = (event: ChangeEvent<HTMLInputElement>) => {
    const step = Number(event.target.value);

    this.setState({ step });
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
    } = this.state;
    // const inputs:string[] = Object.keys(this.state)
    //   .filter(el => el !== 'images');

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title"
          className="title"
        >
          {`Carousel with ${images.length} images`}
        </h1>
        <label className="variables">
          Item width:
          <input
            className="variables__input"
            type="number"
            name="itemWidth"
            value={itemWidth}
            onChange={this.handleChangeWidth}
          />
        </label>

        <label className="variables">
          Frame size:
          <input
            className="variables__input"
            type="number"
            name="frameSize"
            value={frameSize}
            onChange={this.handleChangeFrameSize}
          />
        </label>

        <label className="variables">
          Step:
          <input
            className="variables__input"
            type="number"
            name="step"
            value={step}
            onChange={this.handleChangeStep}
          />
        </label>

        <label className="variables">
          Animation duration:
          <input
            className="variables__input"
            type="number"
            name="animationDuration"
            value={animationDuration}
            onChange={this.handleChangeAnimationDuration}
          />
        </label>
        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          animationDuration={animationDuration}
          step={step}
        />
        {/* {inputs.map(variable => (
          <label className="variables" key={variable}>
            {`${variable[0].toLocaleUpperCase() + variable.slice(1)} :`}
            <input
              type="number"
              name={`${variable}`}
              value={this.state[`${variable}`]}
              onChange={this.handleChange}
            />
          </label>
        ))} */}
      </div>
    );
  }
}

export default App;
