import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number
  infinite: boolean,
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  handleChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(changeEvent.target.value);
    const name: keyof State = changeEvent.target.name as keyof State;

    /*
      * I know that this implementation is strange but if I do it simpler the linter starts to whine and gives this comlicated error that I don't know how to fix
      * Argument of type '{ [x: string]: number; }' is not assignable to parameter of type 'State | ((prevState: Readonly<State>, props: Readonly<{}>) => State | Pick<State, keyof State> | null) | Pick<...> | null'.
      * Type '{ [x: string]: number; }' is missing the following properties from type 'Pick<State, keyof State>': images, step, frameSize, itemWidth, and 2 more.
    */

    switch (name) {
      case 'step':
        this.setState({ [name]: value });
        break;
      case 'itemWidth':
        this.setState({ [name]: value });
        break;
      case 'frameSize':
        this.setState({ [name]: value });
        break;
      case 'animationDuration':
        this.setState({ [name]: value });
        break;
      case 'infinite':
        this.setState({ [name]: changeEvent.target.checked });
        break;
      default:
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
        <h1 data-cy="title">
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <form className="App__form">
          <label className="App__label">
            {'Item width: '}
            <input
              type="numner"
              min={10}
              name="itemWidth"
              value={itemWidth}
              onChange={this.handleChange}
            />
          </label>

          <label className="App__label">
            {'Frame size: '}
            <input
              type="numner"
              min={1}
              max={10}
              name="frameSize"
              value={frameSize}
              onChange={this.handleChange}
            />
          </label>

          <label className="App__label">
            {'Step: '}
            <input
              type="numner"
              min={1}
              max={9}
              name="step"
              value={step}
              onChange={this.handleChange}
            />
          </label>

          <label className="App__label">
            {'Animation duration: '}
            <input
              type="numner"
              min={0}
              name="animationDuration"
              value={animationDuration}
              onChange={this.handleChange}
            />
          </label>

          <label className="App__label">
            {'Infinite: '}
            <input
              type="checkbox"
              name="infinite"
              checked={infinite}
              onChange={this.handleChange}
            />
          </label>
        </form>
      </div>
    );
  }
}

export default App;
