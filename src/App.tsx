import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  componentDidMount() {
    document.title = 'React Carousel';
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name } = event.target;
    const { value, type, checked } = event.target;

    if (name === 'fnimationDuration') {
      name = 'animationDuration';
    }

    this.setState({
      [name]: type === 'checkbox' ? checked : Number(value),
    } as unknown as Pick<State, keyof State>);
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel</h1>

        <div
          className="controls"
          style={{
            marginBottom: '20px',
            display: 'flex',
            gap: '15px',
            alignItems: 'center',
          }}
        >
          <label htmlFor="stepId">Step:</label>
          <input
            type="number"
            name="step"
            id="stepId"
            value={step}
            onChange={this.handleInputChange}
          />

          <label htmlFor="frameId">Frame Size:</label>
          <input
            type="number"
            name="frameSize"
            id="frameId"
            value={frameSize}
            onChange={this.handleInputChange}
          />

          <label htmlFor="itemId">Item Width (px):</label>
          <input
            type="number"
            name="itemWidth"
            id="itemId"
            value={itemWidth}
            onChange={this.handleInputChange}
          />

          <label htmlFor="fnimationDuration">Animation (ms):</label>
          <input
            type="number"
            name="fnimationDuration"
            id="fnimationDuration"
            value={animationDuration}
            onChange={this.handleInputChange}
          />

          <label htmlFor="infinite">Infinite:</label>
          <input
            type="checkbox"
            name="infinite"
            id="infinite"
            checked={infinite}
            onChange={this.handleInputChange}
          />
        </div>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
