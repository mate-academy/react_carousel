import { ChangeEvent, Component } from 'react';

import { Carousel } from './components/Carousel';

import './App.scss';

type State = {
  images: string[];
  itemWidth: number;
  step: number;
  frameSize: number;
  animationDuration: number;
  infinite: boolean;
};

class App extends Component<{}, State> {
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

  handleInputChange = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;

    switch (name) {
      case 'step':
        if (+value >= 0 && +value <= 10) {
          this.setState({ [name]: +value });
        }

        break;

      case 'frameSize':
        if (+value >= 0 && +value <= 10) {
          this.setState({ [name]: +value });
        }

        break;

      case 'itemWidth':
        if (+value >= 0 && +value <= 300) {
          this.setState({ [name]: +value });
        }

        break;

      case 'animationDuration':
        if (+value >= 0 && +value <= 7000) {
          this.setState({ [name]: +value });
        }

        break;

      case 'infinite':
        this.setState((state) => ({
          [name]: !state.infinite,
        }));

        break;

      default:
        throw new Error('Wrong case');
    }
  };

  render() {
    const {
      images,
      animationDuration,
      infinite,
      frameSize,
      itemWidth,
      step,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <form className="App__form">
          <label className="App__field">
            Item Width
            <input
              name="itemWidth"
              className="App__input"
              type="number"
              onChange={this.handleInputChange}
              value={itemWidth}
            />
          </label>

          <label className="App__field">
            Frame Size
            <input
              name="frameSize"
              className="App__input"
              type="number"
              onChange={this.handleInputChange}
              value={frameSize}
            />
          </label>

          <label className="App__field">
            Step
            <input
              name="step"
              className="App__input"
              type="number"
              onChange={this.handleInputChange}
              value={step}
            />
          </label>

          <label className="App__field">
            Animation Duration
            <input
              name="animationDuration"
              className="App__input"
              type="number"
              onChange={this.handleInputChange}
              value={animationDuration}
            />
          </label>

          <label className="App__field">
            Infinite
            <input
              type="checkbox"
              name="infinite"
              onChange={this.handleInputChange}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default App;
