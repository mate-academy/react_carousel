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

    if (!element.value) {
      this.setState(state => ({
        step: state.step,
      }));
    } else {
      switch (id) {
        case 'step':
          this.setState({
            step: +element.value,
          });
          break;

        case 'frameSize':
          this.setState({
            frameSize: +element.value,
          });
          break;

        case 'itemWidth':
          this.setState({
            itemWidth: +element.value,
          });
          break;

        case 'animationDuration':
          this.setState({
            animationDuration: +element.value,
          });
          break;

        default:
          throw new Error('Wrong id');
      }
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

        <form className="form">
          <label className="form__field" htmlFor="step">Step</label>

          <input
            id="step"
            className="form__input"
            type="number"
            min="0"
            onBlur={() => (this.handleEvent('step'))}
            placeholder={`${step}`}
          />

          <label className="form__field" htmlFor="frameSize">Frame Size</label>

          <input
            id="frameSize"
            className="form__input"
            type="number"
            min="0"
            max="10"
            onBlur={() => (this.handleEvent('frameSize'))}
            placeholder={`${frameSize}`}
          />

          <label className="form__field" htmlFor="itemWidth">Item Width</label>

          <input
            id="itemWidth"
            className="form__input"
            type="number"
            min="130"
            max="1300"
            onBlur={() => (this.handleEvent('itemWidth'))}
            placeholder={`${itemWidth}`}
          />

          <label
            className="form__field"
            htmlFor="animationDuration"
          >
            Animation Duration
          </label>

          <input
            id="animationDuration"
            className="form__input"
            type="number"
            min="0"
            max="10000"
            onBlur={() => (this.handleEvent('animationDuration'))}
            placeholder={`${animationDuration}`}
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
