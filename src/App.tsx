import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  images: string[];
}

class App extends React.Component<{}, State> {
  state = {
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
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
  };

  itemWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +event.target.value });
  };

  frameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: +event.target.value });
  };

  step = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +event.target.value });
  };

  animationDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: +event.target.value });
  };

  chooseInput = (data: string, event: React.ChangeEvent<HTMLInputElement>) => {
    switch (data) {
      case 'itemWidth':
        return this.itemWidth(event);
      case 'frameSize':
        return this.frameSize(event);
      case 'step':
        return this.step(event);
      default:
        return this.animationDuration(event);
    }
  };

  render() {
    const { images } = this.state;
    const dataInput = ['itemWidth', 'frameSize', 'step', 'animationDuration'];

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <ul>
          {dataInput.map(data => (
            <li>
              <label htmlFor={data}>
                {`${data}: `}
              </label>

              <input
                type="text"
                id={data}
                placeholder={`Enter a ${data}`}
                value={this.state[data as keyof State]}
                onChange={event => this.chooseInput(data, event)}
              />
            </li>
          ))}
        </ul>

        <Carousel
          images={this.state.images}
          step={this.state.step}
          frameSize={this.state.frameSize}
          itemWidth={this.state.itemWidth}
          animationDuration={this.state.animationDuration}
          // infinite={false}
        />
      </div>
    );
  }
}

export default App;
