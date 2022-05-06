import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';
import { Sizes } from './types/Sizes';

type State = Sizes & {
  images: string[];
};

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
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: true,
  };

  submitChanges = () => {
    const form = document.querySelector('form') as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form).entries());
    let infiniteFlag = false;

    if (data.infinite === 'true') {
      infiniteFlag = true;
    }

    this.setState({
      itemWidth: +data.itemWidth || 130,
      frameSize: +data.frameSize || 3,
      step: +data.step || 3,
      animationDuration: +data.animationDuration || 1000,
      infinite: infiniteFlag,
    });

    form.reset();
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 className="App__title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <form
          method="get"
          className="controlls"
        >
          Change properties:
          <label>
            <input
              name="itemWidth"
              type="number"
              placeholder="Images Width (px)"
              required
              className="controlls__input"
            />
          </label>

          <label>
            <input
              name="frameSize"
              type="number"
              placeholder="Frame Size"
              required
              className="controlls__input"
            />
          </label>

          <label>
            <input
              name="step"
              type="number"
              placeholder="Scroll Step"
              required
              className="controlls__input"
            />
          </label>

          <label>
            <input
              name="animationDuration"
              type="number"
              placeholder="Animation Duration (ms)"
              required
              className="controlls__input"
            />
          </label>

          <label>
            <select
              name="infinite"
              required
              className="controlls__input"
            >
              <option disabled selected>Choose option</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </label>

          <button
            type="submit"
            onClick={(event) => {
              event.preventDefault();

              this.submitChanges();
            }}
            className="controlls__submit"
          >
            SUBMIT
          </button>
        </form>
      </div>
    );
  }
}

export default App;
