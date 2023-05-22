import { Component } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
}

export class App extends Component<{}, State> {
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

  handleChange = (name: string, value: string) => {
    this.setState((state) => {
      return { ...state, [name]: value };
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
        <h1 data-cy="title">{`Carousel with ${images.length} images`}</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <form className="form">
          <label htmlFor="itemId" className="form__label">
            Item width
            <br />
            <input
              type="number"
              id="itemWidth"
              name="itemWidth"
              defaultValue={130}
              min={130}
              onChange={(e) => (
                this.handleChange(e.target.name, e.target.value)
              )}
            />
          </label>
          <label htmlFor="frameId" className="form__label">
            Frame size
            <br />
            <input
              type="number"
              id="frameSize"
              name="frameSize"
              defaultValue={3}
              min={1}
              onChange={(e) => (
                this.handleChange(e.target.name, e.target.value)
              )}
            />
          </label>
          <label htmlFor="stepId" className="form__label">
            Step
            <br />
            <input
              type="number"
              id="step"
              name="step"
              defaultValue={3}
              min={1}
              onChange={(e) => (
                this.handleChange(e.target.name, e.target.value)
              )}
            />
          </label>
          <label htmlFor="animationDuration" className="form__label">
            Animation duration
            <br />
            <input
              type="number"
              id="animationDuration"
              name="animationDuration"
              defaultValue={1000}
              min={0}
              step="1000"
              onChange={(e) => (
                this.handleChange(e.target.name, e.target.value)
              )}
            />
          </label>
          <label htmlFor="infinite" className="form__label">
            Infinite
            <br />
            <input
              type="checkbox"
              id="infinite"
              name="infinite"
              onChange={(e) => (
                this.handleChange(e.target.name, e.target.value)
              )}
            />
          </label>
        </form>
      </div>
    );
  }
}
