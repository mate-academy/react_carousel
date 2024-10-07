import React from 'react';
import { Carousel } from './components/Carousel';
import { TextField } from './components/TextField';
import { Parameters } from './types/Parameters';

interface State {
  images: string[];
  parameters: Parameters;
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
    parameters: {
      step: 3,
      frameSize: 3,
      itemWidth: 130,
      animDuration: 1000,
    },
  };

  handleSetParameters = (property: string, value: number | string) => {
    this.setState({
      parameters: {
        ...this.state.parameters,
        [property]: value,
      },
    });
  };

  render() {
    const {
      images,
      parameters: { step, frameSize, itemWidth, animDuration },
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <TextField
          id="itemId"
          label="Item Width:"
          name="Item Width"
          value={itemWidth}
          onChange={value => this.handleSetParameters('itemWidth', value)}
        />

        <TextField
          id="frameId"
          label="Frame Size:"
          name="Frame Size"
          value={frameSize}
          onChange={value => this.handleSetParameters('frameSize', value)}
        />

        <TextField
          id="stepId"
          label="Step:"
          name="Step"
          value={step}
          onChange={value => this.handleSetParameters('step', value)}
        />

        <TextField
          id="animDurationId"
          label="Animation Duration (ms):"
          name="Animation Duration"
          value={animDuration}
          onChange={value => this.handleSetParameters('animDuration', value)}
        />

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animDuration}
        />
      </div>
    );
  }
}

export default App;
