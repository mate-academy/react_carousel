import React from 'react';
import './App.scss';
import { DEFAULT_CAROUSEL_STATE } from './constants/constants';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  isInfinite: boolean;
}

class App extends React.Component<{}, State> {
  state = DEFAULT_CAROUSEL_STATE;

  handleItemWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: Number(event.target.value) });
  };

  handleFrameSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: Number(event.target.value) });
  };

  handleStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: Number(event.target.value) });
  };

  handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: Number(event.target.value) });
  };

  handleInfiniteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ isInfinite: event.target.checked });
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      isInfinite,
    } = this.state;

    return (
      <div className="App" data-cy="title">
        <div className="App__content">
          <h1>
            {`Carousel with ${images.length} images`}
          </h1>

          <div className="App__carousel">
            <Carousel
              images={images}
              step={step}
              frameSize={frameSize}
              itemWidth={itemWidth}
              animationDuration={animationDuration}
              infinite={isInfinite}
            />
          </div>

          <form className="form">
            <label htmlFor="itemId" className="form__field">
              ItemWidth
              <input
                type="number"
                className="form__input"
                id="itemId"
                value={itemWidth}
                min={1}
                max={800}
                onChange={this.handleItemWidthChange}
              />
            </label>

            <label htmlFor="frameId" className="form__field">
              FrameSize
              <input
                type="number"
                className="form__input"
                id="frameId"
                value={frameSize}
                min={1}
                max={images.length}
                onChange={this.handleFrameSizeChange}
              />
            </label>

            <label htmlFor="stepId" className="form__field">
              Step
              <input
                type="number"
                className="form__input"
                id="stepId"
                value={step}
                min={1}
                max={images.length}
                onChange={this.handleStepChange}
              />
            </label>

            <label htmlFor="DurationId" className="form__field">
              Duration
              <input
                type="number"
                className="form__input"
                id="DurationId"
                value={animationDuration}
                min={50}
                onChange={this.handleDurationChange}
              />
            </label>

            <label htmlFor="InfiniteId" className="form__field">
              Is infinite?
              <input
                type="checkbox"
                className="form__input"
                id="InfiniteId"
                checked={isInfinite}
                onChange={this.handleInfiniteChange}
              />
            </label>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
