import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: string
  itemWidth: string
  frameSize: string
  animationDuration: string
  infinite: boolean
  scrollFn: (arg: number) => void
  scroll: number
}

class App extends React.Component<{}, State> {
  state: Readonly<{
    images: string[]
    step: string
    itemWidth: string
    frameSize: string
    animationDuration: string
    infinite: boolean
    scroll: number
    scrollFn: (arg: number) => void
  }> = {
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
    step: '3',
    frameSize: '3',
    itemWidth: '130',
    animationDuration: '1000',
    infinite: false,
    scroll: 0,
    scrollFn: this.scrollFn.bind(this),
  };

  scrollFn(arg: number) {
    this.setState({ scroll: arg });
  }

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
      scroll,
      scrollFn,
    } = this.state;

    return (
      <div className="carousel">
        {/* eslint-disable-next-line */}
        <h1>Carousel with {images.length} images</h1>

        <form className="carousel__nav">
          <label className="carousel__nav__item" htmlFor="step">
            step
            <input
              id="step"
              type="number"
              className="carousel__input"
              value={step}
              min="1"
              max="5"
              onChange={(e) => {
                if (e.target.value !== null) {
                  this.setState({ step: e.target.value });
                }
              }}
            />
          </label>

          <label className="carousel__nav__item" htmlFor="frameSize">
            frameSize
            <input
              id="frameSize"
              type="number"
              className="carousel__input"
              value={frameSize}
              min="1"
              max="5"
              onChange={(e) => {
                if (e.target.value !== null) {
                  this.setState({ frameSize: e.target.value });
                }
              }}
            />
          </label>

          <label className="carousel__nav__item" htmlFor="itemWidth">
            itemWidth
            <input
              id="itemWidth"
              type="number"
              className="carousel__input"
              value={itemWidth}
              min="100"
              max="300"
              onChange={(e) => {
                if (e.target.value !== null) {
                  this.setState({ itemWidth: e.target.value });
                }
              }}
            />
          </label>

          <label className="carousel__nav__item" htmlFor="animationDuration">
            animationDuration(ms)
            <input
              id="animationDuration"
              type="number"
              className="carousel__input"
              value={animationDuration}
              min="500"
              max="4000"
              onChange={(e) => {
                if (e.target.value !== null) {
                  this.setState({ animationDuration: e.target.value });
                }
              }}
            />
          </label>

          <label className="carousel__nav__item" htmlFor="inite">
            inite
            <input
              id="inite"
              type="checkbox"
              className="carousel__input"
              checked={infinite}
              onChange={(e) => {
                // eslint-disable-next-line no-console
                console.log(e.target.checked);

                if (e.target.checked) {
                  this.setState({ infinite: true });
                } else {
                  this.setState({ infinite: false });
                }
              }}
            />
          </label>
        </form>

        <Carousel
          images={images}
          step={step}
          itemWidth={itemWidth}
          frameSize={frameSize}
          scroll={scroll}
          scrollFn={scrollFn}
          animationDuration={animationDuration}
        />
      </div>
    );
  }
}

export default App;
