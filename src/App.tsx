import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number,
  infinite: boolean,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
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
    infinite: false,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
  };

  render() {
    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {this.state.images.length} images</h1>

        <Carousel
          images={this.state.images}
          step={this.state.step}
          frameSize={this.state.frameSize}
          itemWidth={this.state.itemWidth}
          animationDuration={this.state.animationDuration}
          infinite={this.state.infinite}
        />

        <div className="inputs">
          <div className="current-info">
            <span className="current-info__title">Current values:</span>

            <ul className="current-info__list">
              <li>
                Images:
                {this.state.images.length}
              </li>

              <li>
                Step:
                {this.state.step}
              </li>

              <li>
                Frame size:
                {this.state.frameSize}
              </li>

              <li>
                Item width:
                {this.state.itemWidth}
              </li>

              <li>
                Animation duration:
                {this.state.animationDuration}
              </li>
            </ul>
          </div>

          <label>
            Step:

            <input
              value={this.state.step}
              type="number"
              onChange={(event) => {
                if (typeof Number(event.target.value) === 'number') {
                  if (Number(event.target.value) < this.state.images.length
                    && Number(event.target.value) > 0) {
                    this.setState({ step: Number(event.target.value) });
                  }
                }
              }}
            />
          </label>

          <label>
            Infinite:

            <input
              type="checkbox"
              onChange={(event) => {
                if (event.target.checked) {
                  this.setState({ infinite: true });
                } else {
                  this.setState({ infinite: false });
                }
              }}
            />
          </label>

          <label>
            Size of slider (from 1 to
            {this.state.images.length}
            )

            <input
              name="frameSize"
              min="1"
              max={this.state.images.length}
              value={this.state.frameSize}
              type="range"
              onChange={(event) => {
                if (typeof Number(event.target.value) === 'number') {
                  this.setState({ frameSize: Number(event.target.value) });
                }
              }}
            />
          </label>

          <label>
            Size of items (from 50 to 200)

            <input
              name="itemWidth"
              min="50"
              max="200"
              value={this.state.itemWidth}
              type="range"
              onChange={(event) => {
                if (typeof Number(event.target.value) === 'number') {
                  this.setState({ itemWidth: Number(event.target.value) });
                }
              }}
            />
          </label>

          <label>
            Animation duration (from 0.5s to 3s)

            <input
              name="frameSize"
              min="500"
              max="3000"
              step="100"
              value={this.state.animationDuration}
              type="range"
              onChange={(event) => {
                if (typeof Number(event.target.value) === 'number') {
                  this.setState({
                    animationDuration: Number(event.target.value),
                  });
                }
              }}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default App;
