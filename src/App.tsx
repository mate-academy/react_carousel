import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

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

  handleEvent = (id: string) => {
    const element = document.querySelector(`#${id}`) as HTMLInputElement;

    switch (id) {
      case 'step':
        if (+element.value >= 0 && +element.value <= 10) {
          this.setState({
            [id]: +element.value,
          });
        }

        break;

      case 'frameSize':
        if (+element.value >= 0 && +element.value <= 10) {
          this.setState({
            [id]: +element.value,
          });
        }

        break;

      case 'itemWidth':
        if (+element.value >= 0 && +element.value <= 400) {
          this.setState({
            [id]: +element.value,
          });
        }

        break;

      case 'animationDuration':
        if (+element.value >= 0 && +element.value <= 10000) {
          this.setState({
            [id]: +element.value,
          });
        }

        break;

      case 'infinite':
        this.setState(state => ({
          [id]: !state.infinite,
        }));

        break;

      default:
        throw new Error('Wrong id');
    }
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <form className="App__form">
          <label className="App__field" htmlFor="step">Step</label>

          <input
            id="step"
            className="App__input"
            type="number"
            onChange={() => (this.handleEvent('step'))}
            value={step}
          />

          <label className="App__field" htmlFor="frameSize">Frame Size</label>

          <input
            id="frameSize"
            className="App__input"
            type="number"
            onChange={() => (this.handleEvent('frameSize'))}
            value={frameSize}
          />

          <label className="App__field" htmlFor="itemWidth">Item Width</label>

          <input
            id="itemWidth"
            className="App__input"
            type="number"
            onChange={() => (this.handleEvent('itemWidth'))}
            value={itemWidth}
          />

          <label
            className="App__field"
            htmlFor="animationDuration"
          >
            Animation Duration
          </label>

          <input
            id="animationDuration"
            className="App__input"
            type="number"
            onChange={() => (this.handleEvent('animationDuration'))}
            value={animationDuration}
          />

          <label className="App__field" htmlFor="infinite">Infinite</label>

          <input
            type="checkbox"
            onChange={() => (this.handleEvent('infinite'))}
          />
        </form>

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
