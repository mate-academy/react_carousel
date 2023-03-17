import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface Field {
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
  step: number;
}
interface State extends Field {
  images: string[];
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
    frameSize: 3,
    animationDuration: 1000,
    step: 3,
    itemWidth: 130,
    infinite: false,
  };

  getSettingsFromForm = () => {
    const form: HTMLFormElement = document
      .querySelector('#form') as HTMLFormElement;

    const data: FormData = new FormData(form);

    [...data.entries()].forEach(item => {
      const [inputName, value] = item;

      this.setState((prevState) => ({
        ...prevState,
        [inputName]: value,
      }));
    });
  };

  render() {
    const {
      images,
      animationDuration,
      itemWidth,
      step,
      frameSize,
      infinite,
    } = this.state;

    return (
      <div className="App">
        <h1 className="title" data-cy="title">
          {`Carousel with ${images.length} images`}
        </h1>

        <form id="form" className="form">
          <div className="form__field">
            <label htmlFor="itemWidth" className="form__label">
              Item width
            </label>

            <span>{itemWidth}</span>

            <input
              type="range"
              name="itemWidth"
              id="itemWidth"
              max="300"
              value={itemWidth}
              min="50"
              onChange={this.getSettingsFromForm}
            />
          </div>

          <div className="form__field">
            <label htmlFor="frameSize" className="form__label">
              Frame Size
            </label>

            <span>{frameSize}</span>

            <input
              type="range"
              name="frameSize"
              id="frameSize"
              min="1"
              max="5"
              value={frameSize}
              onChange={this.getSettingsFromForm}
            />
          </div>

          <div className="form__field">
            <label htmlFor="step" className="form__label">
              Step
            </label>

            <span>{step}</span>

            <input
              type="range"
              name="step"
              id="step"
              min="1"
              max="5"
              value={step}
              onChange={this.getSettingsFromForm}
            />
          </div>

          <div className="form__field">
            <label htmlFor="animationDuration" className="form__label">
              Animation Duration
            </label>

            <span>{animationDuration}</span>

            <input
              type="range"
              name="animationDuration"
              id="animationDuration"
              max="3000"
              min="500"
              value={animationDuration}
              onChange={this.getSettingsFromForm}
            />
          </div>

          <div className="form__field">
            <label htmlFor="infinite">
              infinite
            </label>

            <input
              id="infinite"
              name="infinite"
              type="checkbox"
              checked={infinite}
              onChange={() => this.setState({ infinite: !infinite })}
            />
          </div>
        </form>

        <Carousel
          images={images}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          step={step}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
