import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
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
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
  };

  handleInputChange = (name: keyof Omit<State, 'images'>, value: string) => {
    const numValue = parseInt(value);

    this.setState({
      [name]: numValue,
    } as unknown as Pick<State, keyof State>);
  };

  render() {
    const { images } = this.state;

    const inputs = [
      { name: 'itemWidth', placeholder: 'Item width', id: 'itemId' },
      { name: 'frameSize', placeholder: 'Frame size', id: 'frameId' },
      { name: 'step', placeholder: 'Step', id: 'stepId' },
      {
        name: 'animationDuration',
        placeholder: 'Animation duration',
        id: 'durationId',
      },
    ] as const;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          itemWidth={this.state.itemWidth}
          frameSize={this.state.frameSize}
          step={this.state.step}
          animationDuration={this.state.animationDuration}
          infinite={true}
        />
        {inputs.map(({ name, placeholder, id }) => {
          return (
            <label key={name} htmlFor={id}>
              {placeholder}
              <input
                id={id}
                type="number"
                placeholder={placeholder}
                value={this.state[name]}
                onChange={event =>
                  this.handleInputChange(name, event.target.value)
                }
              />
            </label>
          );
        })}
      </div>
    );
  }
}

export default App;
