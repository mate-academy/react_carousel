import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
}

class App extends React.Component<{}, State> {
  state: State = {
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
  };

  handleChange =
    (key: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({
        [key]: Number(event.target.value),
      } as Pick<State, keyof State>);
    };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel</h1>

        <label htmlFor="itemId">Item width:</label>
        <input
          id="itemId"
          type="number"
          value={itemWidth}
          onChange={this.handleChange('itemWidth')}
        />

        <label htmlFor="frameId">Frame size:</label>
        <input
          id="frameId"
          type="number"
          value={frameSize}
          onChange={this.handleChange('frameSize')}
        />

        <label htmlFor="stepId">Step:</label>
        <input
          id="stepId"
          type="number"
          value={step}
          onChange={this.handleChange('step')}
        />

        <label htmlFor="animationId">Animation duration:</label>
        <input
          id="animationId"
          type="number"
          value={animationDuration}
          onChange={this.handleChange('animationDuration')}
        />

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={false}
        />
      </div>
    );
  }
}

export default App;
