import React from 'react';
import './App.scss';
import Carousel, { CarouselProps } from './components/Carousel';

class App extends React.Component<{}, CarouselProps> {
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
    step: 3,
    animationDuration: 1000,
    infinite: false,
  };

  render() {
    // eslint-disable-next-line operator-linebreak
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <div className="App__indicator">
          <label htmlFor="itemId" className="App__indicator--text">
            Item width:
            <input
              className="App__indicator--number"
              type="number"
              id="itemId"
              min={0}
              step={10}
              value={itemWidth}
              onChange={e =>
                this.setState({ itemWidth: Number(e.target.value) })
              }
            />
          </label>
          <label htmlFor="frameId" className="App__indicator--text">
            Frame size:
            <input
              className="App__indicator--number"
              type="number"
              id="frameId"
              min={1}
              max={images.length}
              step={1}
              defaultValue={frameSize}
              onChange={e =>
                this.setState({ frameSize: Number(e.target.value) })
              }
            />
          </label>
          <label htmlFor="stepId" className="App__indicator--text">
            Step:
            <input
              className="App__indicator--number"
              type="number"
              id="stepId"
              min={1}
              max={images.length}
              step={1}
              defaultValue={step}
              onChange={e => this.setState({ step: Number(e.target.value) })}
            />
          </label>
          <label htmlFor="animationDuration" className="App__indicator--text">
            Animation duration:
            <input
              className="App__indicator--number"
              type="number"
              id="animationDuration"
              step={100}
              defaultValue={animationDuration}
              onChange={e =>
                this.setState({ animationDuration: Number(e.target.value) })
              }
            />
          </label>
          <label htmlFor="infinite" className="App__indicator--text">
            Infinite:
            <input
              className="App__indicator--checkbox"
              type="checkbox"
              id="infinite"
              defaultChecked={infinite}
              onChange={e => this.setState({ infinite: e.target.checked })}
            />
          </label>
        </div>
        <Carousel
          images={images}
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
