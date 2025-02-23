// App.tsx
import { Component } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
}

class App extends Component<{}, State> {
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

  componentDidMount() {
    document.title = 'Carousel';
  }

  render() {
    const { images, itemWidth, frameSize, step, animationDuration } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel</h1>{' '}
        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
        />
        <form>
          <label htmlFor="itemId">Item Width:</label>
          <input
            type="number"
            value={itemWidth}
            onChange={e =>
              this.setState({ itemWidth: parseInt(e.target.value) })
            }
            data-cy="input-item-width"
            id="itemId"
          />

          <label htmlFor="frameId">Frame Size:</label>
          <input
            type="number"
            value={frameSize}
            onChange={e =>
              this.setState({ frameSize: parseInt(e.target.value) })
            }
            data-cy="input-frame-size"
            id="frameId"
          />

          <label htmlFor="stepId">Step:</label>
          <input
            type="number"
            value={step}
            onChange={e => this.setState({ step: parseInt(e.target.value) })}
            data-cy="input-step"
            id="stepId"
          />

          <label htmlFor="animationDuration">Animation Duration:</label>
          <input
            type="number"
            value={animationDuration}
            onChange={e =>
              this.setState({ animationDuration: parseInt(e.target.value) })
            }
            data-cy="input-animation-duration"
            id="animationDuration"
          />
        </form>
      </div>
    );
  }
}

export default App;
