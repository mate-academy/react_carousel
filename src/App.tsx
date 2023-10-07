import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  images: string[];
  infinite: boolean,
}

const dataInput = ['itemWidth', 'frameSize', 'step', 'animationDuration'];

class App extends React.Component<{}, State> {
  state = {
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
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

  handleChangeItemWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +event.target.value });
  };

  handleChangeFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: +event.target.value });
  };

  handleChangeStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +event.target.value });
  };

  handleChangeAnimationDuration =
  (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: +event.target.value });
  };

  chooseInput = (data: string, event: React.ChangeEvent<HTMLInputElement>) => {
    switch (data) {
      case dataInput[0]:
        return this.handleChangeItemWidth(event);
      case dataInput[1]:
        return this.handleChangeFrameSize(event);
      case dataInput[2]:
        return this.handleChangeStep(event);
      default:
        return this.handleChangeAnimationDuration(event);
    }
  };

  getInfiniteInput = () => {
    this.setState((prev) => ({ infinite: !(prev.infinite) }));
  };

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">
          {`Carousel with ${images.length} images`}
        </h1>

        <ul>
          {dataInput.map(data => (
            <li key={data}>
              <label htmlFor={data}>
                {`${data}: `}
              </label>

              <input
                type="text"
                id={data}
                placeholder={`Enter a ${data}`}
                value={String(this.state[data as keyof State])}
                onChange={event => this.chooseInput(data, event)}
              />
            </li>
          ))}
        </ul>

        <label>
          <input
            type="checkbox"
            checked={this.state.infinite}
            onChange={() => this.getInfiniteInput()}
          />
          infinite
        </label>

        <Carousel
          images={this.state.images}
          step={this.state.step}
          frameSize={this.state.frameSize}
          itemWidth={this.state.itemWidth}
          animationDuration={this.state.animationDuration}
          infinite={this.state.infinite}
        />
      </div>
    );
  }
}

export default App;
