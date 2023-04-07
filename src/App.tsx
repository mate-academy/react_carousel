import React from 'react';
import './App.scss';
import Carousel from './components/Carousel/Carousel';

interface State {
  images: string[];
  configurationFields: ConfigurationFields;
}
interface ConfigurationFields {
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const startValues = {
  step: 3,
  frameSize: 3,
  itemWidth: 130,
  animationDuration: 1000,
  infinite: false,
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
    configurationFields: startValues,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    this.setState((state) => ({
      configurationFields: {
        ...state.configurationFields,
        [name]: value,
      },
    }));
  };

  handleChangeCheckbox = () => {
    this.setState((prevState) => ({
      configurationFields: {
        ...prevState.configurationFields,
        infinite: !prevState.configurationFields.infinite,
      },
    }));
  };

  render() {
    const {
      images,
      configurationFields,
    } = this.state;
    const {
      step,
      itemWidth,
      frameSize,
      animationDuration,
    } = configurationFields;

    return (
      <div className="App">
        <h1 data-cy="title">
          {`Carousel with ${images.length} images`}
        </h1>
        <form action="#" className="configurationForm">
          <label htmlFor="itemId">
            Item Width:
            <input
              type="number"
              name="itemWidth"
              id="itemId"
              defaultValue={itemWidth}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="frameId">
            Frame Size:
            <input
              type="number"
              name="frameSize"
              id="FrameId"
              max={images.length}
              defaultValue={frameSize}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="StepId">
            Step:
            <input
              type="number"
              name="step"
              id="stepId"
              max={frameSize}
              defaultValue={step}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="duration">
            Animation duration:
            <input
              type="number"
              name="animationDuration"
              id="duration"
              defaultValue={animationDuration}
              onChange={this.handleChange}
            />
          </label>
        </form>
        <Carousel
          images={images}
          {...configurationFields}
        />
      </div>
    );
  }
}

export default App;
