import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number | '';
  frameSize: number | '';
  step: number | '';
  animationDuration: number | '';
}

class App extends React.Component<{}, State> {
  state: State = {
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

  componentDidMount() {
    document.title = 'Carousel';
  }

  handleInputChange = <K extends keyof Omit<State, 'images'>>(
    name: K,
    value: string,
  ) => {
    if (value === '') {
      this.setState({ [name]: '' } as Pick<State, K>);

      return;
    }

    const numValue = parseInt(value, 10);

    if (!isNaN(numValue)) {
      this.setState({ [name]: numValue } as Pick<State, K>);
    }
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration } =
      this.state;

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
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          itemWidth={itemWidth === '' ? undefined : itemWidth}
          frameSize={frameSize === '' ? undefined : frameSize}
          step={step === '' ? undefined : step}
          animationDuration={
            animationDuration === '' ? undefined : animationDuration
          }
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
