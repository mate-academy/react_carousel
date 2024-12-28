import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  width: number;
  frameSize: number;
  step: number;
  animationDuration: number;
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
    width: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
  };

  handleChange =
    (field: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value, 10);

      if (!isNaN(value)) {
        this.setState({ [field]: value } as unknown as Pick<
        State,
        keyof State
        >);
      }
    };

  render() {
    const { images, width, frameSize, step, animationDuration } = this.state;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="inputs">
          <div>
            <label className="inputs__label" htmlFor="itemId">
              Input width
            </label>
            <input
              id="itemId"
              className="inputs__input"
              type="number"
              value={width}
              onChange={this.handleChange('width')}
            />
          </div>

          <div>
            <label className="inputs__label" htmlFor="frameId">
              Input frameSize
            </label>
            <input
              id="frameId"
              className="inputs__input"
              type="number"
              value={frameSize}
              onChange={this.handleChange('frameSize')}
            />
          </div>

          <div>
            <label className="inputs__label" htmlFor="stepId">
              Input step
            </label>
            <input
              id="stepId"
              className="inputs__input"
              type="number"
              value={step}
              onChange={this.handleChange('step')}
            />
          </div>

          <div>
            <label className="inputs__label" htmlFor="animationDurationId">
              Input animationDuration
            </label>
            <input
              className="inputs__input"
              type="number"
              value={animationDuration}
              onChange={this.handleChange('animationDuration')}
            />
          </div>
        </div>

        <Carousel
          imagesArray={images}
          step={step}
          frameSize={frameSize}
          itemWidth={width}
          animationDuration={animationDuration}
          infinite={false}
        />
      </div>
    );
  }
}

export default App;
