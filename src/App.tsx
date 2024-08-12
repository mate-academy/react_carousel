import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  isInfinite: boolean;
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
    isInfinite: false,
  };

  render() {
    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {this.state.images.length} images</h1>

        <>
          <label htmlFor="itemId">Item width: </label>
          <input
            onChange={event =>
              this.setState({ itemWidth: +event.target.value })
            }
            type="number"
            name="itemId"
            id="itemId"
            defaultValue={130}
          />
          <br />

          <label htmlFor="frameId">Frame size: </label>
          <input
            onChange={event =>
              this.setState({ frameSize: +event.target.value })
            }
            type="number"
            name="frameId"
            id="frameId"
            defaultValue={3}
          />
          <br />

          <label htmlFor="stepId">Step: </label>
          <input
            onChange={event => this.setState({ step: +event.target.value })}
            type="number"
            name="stepId"
            id="stepId"
            defaultValue={3}
          />
          <br />

          <label htmlFor="animationDuration">Animation duration: </label>
          <input
            onChange={event =>
              this.setState({ animationDuration: +event.target.value })
            }
            type="number"
            name="animationDuration"
            id="animationDuration"
            defaultValue={1000}
          />
          <br />

          <label htmlFor="infinite">Infinite loop: </label>
          <input
            onClick={() =>
              this.setState({ isInfinite: !this.state.isInfinite })
            }
            type="checkbox"
            name="infinite"
            id="infinite"
            defaultChecked={false}
          />
          <br />
        </>

        <Carousel
          images={this.state.images}
          itemWidth={this.state.itemWidth}
          frameSize={this.state.frameSize}
          animationDuration={this.state.animationDuration}
          step={this.state.step}
          infinite={this.state.isInfinite}
        />
      </div>
    );
  }
}

export default App;
