import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
}

class App extends React.Component<{}, State> {
  state = {
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
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
  };

  handleInputChange(key: string, value: number) {
    this.setState(prev => ({
      ...prev,
      [key]: value,
    }));
  }

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy='title'>Carousel with {images.length} images</h1>
        <div className="Options">
          <div className="Options__item">
            <label htmlFor="stepId">Step</label>
            <input
              id="stepId"
              className="Options__input"
              placeholder="Step"
              type="number"
              min={1}
              value={this.state.step}
              onChange={(e) => this.handleInputChange('step', +e.target.value)}
            />
          </div>
          <div className="Options__item">
            <label htmlFor="frameId">Frame Size</label>
            <input
              id="frameId"
              className="Options__input"
              placeholder="Frame Size"
              type="number"
              min={1}
              value={this.state.frameSize}
              onChange={(e) => {
                this.handleInputChange('frameSize', +e.target.value);
              }}
            />
          </div>
          <div className="Options__item">
            <label htmlFor="itemId">Item Width (px)</label>
            <input
              id="itemId"
              className="Options__input"
              placeholder="Item Width"
              type="number"
              min={65}
              value={this.state.itemWidth}
              onChange={(e) => {
                this.handleInputChange('itemWidth', +e.target.value);
              }}
            />
          </div>
          <div className="Options__item">
            <label htmlFor="duration">Animation Duration (ms)</label>
            <input
              id="duration"
              className="Options__input"
              placeholder="Animation Duration"
              type="number"
              min={0}
              value={this.state.animationDuration}
              onChange={(e) => {
                this.handleInputChange('animationDuration', +e.target.value);
              }}
            />
          </div>
        </div>

        <Carousel
          images={images}
          step={this.state.step}
          frameSize={this.state.frameSize}
          itemWidth={this.state.itemWidth}
          animationDuration={this.state.animationDuration}
        />
      </div>
    );
  }
}

export default App;
