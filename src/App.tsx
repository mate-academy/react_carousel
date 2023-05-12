import React from 'react';
import Carousel from './components/Carousel';

import './App.scss';

class App extends React.Component<{}> {
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

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name, value, type, checked,
    } = e.target;

    this.setState({
      [name]: type === 'checkbox' ? checked : Number(value),
    });
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

        <h1 className="App__title title">
          Carousel with
          {images.length}
          images
        </h1>
        <div
          className="carusel-wrapper"
          style={{ width: `${itemWidth * frameSize}px` }}
        >
          <Carousel
            images={images}
            step={step}
            frameSize={frameSize}
            itemWidth={itemWidth}
            animationDuration={animationDuration}
            infinite={infinite}
          />
        </div>

        <div className="footer">
          <section className="footer__option">
            <h3 className="footer__title title">Step</h3>
            <input
              className="footer__input"
              name="step"
              type="number"
              min="1"
              max="5"
              value={this.state.step}
              onChange={this.handleChange}
            />
          </section>

          <section className="footer__option">
            <h3 className="footer__title title">Frame Size</h3>
            <input
              className="footer__input"
              name="frameSize"
              type="number"
              min="2"
              max="9"
              value={this.state.frameSize}
              onChange={this.handleChange}
            />
          </section>

          <section className="footer__option">
            <h3 className="footer__title title">item width</h3>
            <input
              className="footer__input"
              name="itemWidth"
              type="number"
              min="100"
              max="500"
              step={10}
              value={this.state.itemWidth}
              onChange={this.handleChange}
            />
          </section>

          <section className="footer__option">
            <h3 className="footer__title title">animation duration</h3>
            <input
              className="footer__input"
              name="animationDuration"
              type="number"
              min="1000"
              max="5000"
              step={500}
              value={this.state.animationDuration}
              onChange={this.handleChange}
            />
          </section>

          <section className="footer__option">
            <label
              htmlFor="infinite"

            >
              <h3 className="footer__title title">
                infinite
              </h3>

            </label>
            <input
              className="footer__input"
              name="infinite"
              id="infinite"
              type="checkbox"
              checked={this.state.infinite}
              onChange={this.handleChange}
            />
          </section>

        </div>
      </div>
    );
  }
}

export default App;
