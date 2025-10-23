import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
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
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
  };

  componentDidMount() {
    document.title = 'Carousel';
  }

  handleChange =
    (field: 'itemWidth' | 'frameSize' | 'step' | 'animationDuration') =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(1, Number(event.target.value) || 0);

      this.setState({ [field]: value } as Pick<State, keyof State>);
    };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration } =
      this.state;

    return (
      <div className="App">
        <h1 data-cy="title" className="App__title">
          Carousel with {images.length} images
        </h1>

        <div className="App__controls">
          <label htmlFor="itemId">
            Item width:
            <input
              id="itemId"
              type="number"
              value={itemWidth}
              onChange={this.handleChange('itemWidth')}
              min={1}
            />
          </label>

          <label htmlFor="frameId">
            Frame Size:
            <input
              id="frameId"
              type="number"
              value={frameSize}
              onChange={this.handleChange('frameSize')}
              min={1}
            />
          </label>

          <label htmlFor="stepId">
            Step:
            <input
              id="stepId"
              type="number"
              value={step}
              onChange={this.handleChange('step')}
              min={1}
            />
          </label>

          <label htmlFor="animationId">
            Animation Duration (ms):
            <input
              id="animationId"
              type="number"
              value={animationDuration}
              onChange={this.handleChange('animationDuration')}
              min={100}
            />
          </label>
        </div>

        <div className="App__carousel">
          <Carousel
            images={images}
            itemWidth={itemWidth}
            frameSize={frameSize}
            step={step}
            animationDuration={animationDuration}
            infinite={false}
          />
        </div>
      </div>
    );
  }
}

export default App;
