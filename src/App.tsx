import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  frameSize: number;
  step: number;
  itemWidth: string;
  animationDuration: string;

  inputs: {
    itemWidth: string;
    frameSize: string;
    step: string;
    animationDuration: string;
  };
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
    frameSize: 3,
    step: 3,
    itemWidth: '130',
    animationDuration: '1000',

    inputs: {
      itemWidth: '',
      frameSize: '',
      step: '',
      animationDuration: '',
    },
  };

  render() {
    const { images } = this.state;
    const applySettings = () => {
      const { itemWidth, frameSize, step } = this.state.inputs;

      this.setState({
        itemWidth: itemWidth || this.state.itemWidth,
        frameSize: frameSize ? Number(frameSize) : this.state.frameSize,
        step: step ? Number(step) : this.state.step,
        animationDuration: this.state.animationDuration,
        inputs: {
          itemWidth: '',
          frameSize: '',
          step: '',
          animationDuration: '',
        },
      });
    };

    return (
      <div className="App">
        <h1>Carousel with {this.state.frameSize} images</h1>

        <Carousel
          images={images}
          frameSize={this.state.frameSize}
          step={this.state.step}
          itemWidth={this.state.itemWidth + 'px'}
          animation={this.state.animationDuration + 'ms'}
        />
        <div className="inputs--wrapper">
          <input
            className="input--width"
            type="text"
            placeholder="img width"
            onChange={e => {
              this.setState({
                inputs: { ...this.state.inputs, itemWidth: e.target.value },
              });
            }}
          />
          <div>
            <input
              type="text"
              placeholder="frame size"
              onChange={e => {
                this.setState({
                  inputs: { ...this.state.inputs, frameSize: e.target.value },
                });
              }}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="step"
              onChange={e => {
                this.setState({
                  inputs: { ...this.state.inputs, step: e.target.value },
                });
              }}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Animation duration (ms)"
              value={this.state.inputs.animationDuration}
              onChange={e =>
                this.setState({
                  inputs: {
                    ...this.state.inputs,
                    animationDuration: e.target.value,
                  },
                })
              }
            />
          </div>
          <button onClick={applySettings}>confirm</button>
        </div>
      </div>
    );
  }
}

export default App;
