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

  render() {
    const { images, itemWidth, frameSize, step, animationDuration } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <div className="controls">
          <label htmlFor="itemId">
            itemWidth:
            <input
              type="number"
              id="itemId"
              value={itemWidth}
              onChange={e =>
                this.setState({ itemWidth: Number(e.target.value) || 0 })
              }
            />
          </label>
          <label htmlFor="frameId">
            frameSize:
            <input
              type="number"
              id="frameId"
              value={frameSize}
              onChange={e =>
                this.setState({
                  frameSize: Math.max(1, Number(e.target.value) || 1),
                })
              }
            />
          </label>
          <label htmlFor="stepId">
            step:
            <input
              type="number"
              id="stepId"
              value={step}
              onChange={e =>
                this.setState({
                  step: Math.max(1, Number(e.target.value) || 1),
                })
              }
            />
          </label>
          <label htmlFor="animationId">
            fnimationDuration:
            <input
              type="number"
              id="animationId"
              value={animationDuration}
              onChange={e =>
                this.setState({
                  animationDuration: Math.max(0, Number(e.target.value) || 0),
                })
              }
            />
          </label>
        </div>
        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={true}
        />
      </div>
    );
  }
}
export default App;
