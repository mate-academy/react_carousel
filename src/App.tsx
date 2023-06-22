import React from 'react';
import './App.scss';
import './carouselSetup.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
}

const imagesArray = [
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

class App extends React.Component<{}, State> {
  state = {
    images: imagesArray,
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  componentDidMount() {
    const { itemWidth } = this.state;

    if (window.matchMedia('(max-width: 600px)').matches) {
      this.setState({
        frameSize: Math.floor(window.innerWidth / itemWidth) - 1,
      });
    }
  }

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state;

    window.onresize = () => {
      if (window.matchMedia('(max-width: 600px)').matches) {
        this.setState({
          frameSize: Math.floor(window.innerWidth / itemWidth) - 1,
        });
      }
    };

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">
          Carousel with
          <br />
          {`${images.length} images`}
        </h1>

        <Carousel {...this.state} />

        <form className="carouselSetup">
          <div className="carouselSetup__field">
            <label htmlFor="step">Step:</label>
            <input
              type="number"
              id="step"
              name="Step"
              min="1"
              max={images.length}
              value={step}
              onChange={({ target }) => {
                this.setState({ step: Number(target.value) });
              }}
            />
          </div>
          <div className="carouselSetup__field">
            <label htmlFor="frameSize">Frame Size:</label>
            <input
              type="number"
              id="frameSize"
              name="Frame Size"
              min="1"
              max={images.length}
              value={frameSize}
              onChange={({ target }) => {
                this.setState({ frameSize: Number(target.value) });
              }}
            />
          </div>
          <div className="carouselSetup__field">
            <label htmlFor="itemWidth">Item Width:</label>
            <input
              type="number"
              id="itemWidth"
              name="Item Width"
              min="0"
              value={itemWidth}
              onChange={({ target }) => {
                this.setState({ itemWidth: Number(target.value) });
              }}
            />
          </div>
          <div className="carouselSetup__field">
            <label htmlFor="animationDuration">Animation Duration:</label>
            <input
              type="number"
              id="animationDuration"
              name="Animation Duration"
              min="0"
              value={animationDuration}
              onChange={({ target }) => {
                this.setState({ animationDuration: Number(target.value) });
              }}
            />
          </div>
          <div className="carouselSetup__field carouselSetup__field--checkbox">
            <input
              type="checkbox"
              id="infinite"
              name="Infinite"
              checked={infinite}
              onChange={({ target }) => {
                this.setState({ infinite: target.checked });
              }}
            />
            <label htmlFor="infinite">Infinite:</label>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
