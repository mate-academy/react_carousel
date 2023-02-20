import React from 'react';
import './reset.scss';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[]
  itemSize: number
  frameSize: number
  step: number
  animationDuration: number
  infinite: boolean
}

class App extends React.Component<{}, State> {
  state: Readonly<State> = {
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
    itemSize: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  };

  inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(state => ({
      ...state,
      [event.target.name]: +event.target.value,
    }));
  };

  render() {
    const {
      images,
      itemSize,
      frameSize,
      step,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        <h1 className="App__title" data-cy="title">
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={images}
          itemSize={itemSize}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <form
          action="#"
          className="App__parameters"
        >
          <label htmlFor="itemId">
            {'Item size: '}

            <input
              className="App__input"
              name="itemSize"
              type="number"
              id="itemId"
              defaultValue={itemSize}
              min={0}
              max={1000}
              onChange={this.inputHandler}
            />
          </label>

          <label htmlFor="frameId">
            {'Frame size: '}

            <input
              className="App__input"
              id="frameId"
              type="number"
              name="frameSize"
              defaultValue={3}
              min={1}
              max={10}
              onChange={this.inputHandler}
            />
          </label>

          <label htmlFor="stepId">
            {'Step: '}

            <input
              className="App__input"
              id="stepId"
              type="number"
              name="step"
              defaultValue={3}
              min={0}
              max={9}
              onChange={this.inputHandler}
            />
          </label>

          <label>
            {'Animation duration: '}

            <input
              className="App__input"
              type="number"
              name="animationDuration"
              defaultValue={1000}
              min={0}
              max={10000}
              onChange={this.inputHandler}
            />
          </label>

          <label>
            {'Infinite '}

            <input
              className="App__input"
              type="checkbox"
              onChange={(event) => {
                this.setState({
                  infinite: event.currentTarget.checked,
                });
              }}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default App;
