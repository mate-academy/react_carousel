import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

type State = {
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

export class App extends React.Component<unknown, State> {
  state: State = {
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  };

  componentDidMount(): void {
    document.title = 'Carousel';
  }

  private images = [
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

  private clampMin(value: number, min: number) {
    if (Number.isNaN(value)) {
      return min;
    }

    return Math.max(value, min);
  }

  private handleNumberChange = (
    key: keyof Omit<State, 'infinite'>,
    min: number,
  ) => {
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const next = Number(event.target.value);

      this.setState({
        [key]: this.clampMin(next, min),
      } as Pick<State, typeof key>);
    };
  };

  private handleInfiniteChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({ infinite: event.target.checked });
  };

  render() {
    const { itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title" className="App__title">
          Carousel
        </h1>

        <div className="App__controls">
          <label className="App__control">
            <span className="App__label">itemWidth</span>
            <input
              type="number"
              min={1}
              value={itemWidth}
              onChange={this.handleNumberChange('itemWidth', 1)}
            />
          </label>

          <label className="App__control">
            <span className="App__label">frameSize</span>
            <input
              type="number"
              min={1}
              value={frameSize}
              onChange={this.handleNumberChange('frameSize', 1)}
            />
          </label>

          <label className="App__control">
            <span className="App__label">step</span>
            <input
              type="number"
              min={1}
              value={step}
              onChange={this.handleNumberChange('step', 1)}
            />
          </label>

          <label className="App__control">
            <span className="App__label">animationDuration</span>
            <input
              type="number"
              min={0}
              value={animationDuration}
              onChange={this.handleNumberChange('animationDuration', 0)}
            />
          </label>

          <label className="App__control App__control--checkbox">
            <span className="App__label">infinite</span>
            <input
              type="checkbox"
              checked={infinite}
              onChange={this.handleInfiniteChange}
            />
          </label>
        </div>

        <Carousel
          images={this.images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
