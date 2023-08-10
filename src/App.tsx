import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  render() {
    const {
      images, step, frameSize, itemWidth, animationDuration,
    } = this.state;

    const handleStep
      = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({
        step: +event.target.value,
      });
    const handleFrameSize
      = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({
        frameSize: +event.target.value,
      });
    const handleItemWidth
      = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({
        itemWidth: +event.target.value,
      });
    const handleAnimationDuration
      = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({
        animationDuration: +event.target.value,
      });
    const handleInfinite
      = () => {
        if (this.state.infinite === false) {
          this.setState({
            infinite: true,
          });
        } else {
          this.setState({
            infinite: false,
          });
        }
      };

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={this.state.images}
          step={this.state.step}
          frameSize={this.state.frameSize}
          itemWidth={this.state.itemWidth}
          animationDuration={this.state.animationDuration}
          infinite={this.state.infinite}
        />
        <div className="input-container">
          <h1>
            item - width
            <input type="text" onChange={handleItemWidth} value={itemWidth} />
          </h1>
          <h1>
            frame-size
            <input type="text" onChange={handleFrameSize} value={frameSize} />
          </h1>
          <h1>
            step
            <input type="text" onChange={handleStep} value={step} />
          </h1>
          <h1>
            animation-duration
            <input
              type="text"
              onChange={handleAnimationDuration}
              value={animationDuration}
            />
          </h1>
          {this.state.infinite === false
            ? (
              <button type="button" onClick={handleInfinite}>
                Infinite - false
              </button>
            )
            : (
              <button type="button" onClick={handleInfinite}>
                Infinite - true
              </button>
            )}
        </div>
      </div>
    );
  }
}

export default App;
