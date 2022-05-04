// import { values } from 'cypress/types/lodash';
import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
  rebuildCarousel: boolean,
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
    rebuildCarousel: false,
  };

  changeRebuildProperty = () => {
    return !this.state.rebuildCarousel;
  };

  render() {
    const { images } = this.state;

    return (
      <div className="App">

        <div
          className="CarouselContainer"
        >
          <h1
            className="CarouselTitle"
          >
            Carousel with
            {` ${images.length} `}
            images
          </h1>

          <Carousel
            images={images}
            step={this.state.step}
            frameSize={this.state.frameSize}
            itemWidth={this.state.itemWidth}
            animationDuration={this.state.animationDuration}
            infinite={this.state.infinite}
            rebuildCarousel={this.state.rebuildCarousel}
          />
        </div>

        <h2>Carousel parameters</h2>

        <label
          className="Parameter"
        >
          Step
          <input
            className="ParamValue"
            type="number"
            defaultValue={this.state.step}
            min="1"
            max="10"
            step="1"
            onChange={(event) => this.setState({
              step: +event.target.value,
              rebuildCarousel: this.changeRebuildProperty(),
            })}
          />
        </label>

        <label
          className="Parameter"
        >
          Frame size
          <input
            className="ParamValue"
            type="number"
            defaultValue={this.state.frameSize}
            min="1"
            max="10"
            step="1"
            onChange={(event) => this.setState({
              frameSize: +event.target.value,
              rebuildCarousel: this.changeRebuildProperty(),
            })}
          />
        </label>

        <label
          className="Parameter"
        >
          Item width
          <input
            className="ParamValue"
            type="number"
            defaultValue={this.state.itemWidth}
            min="50"
            max="200"
            step="10"
            onChange={(event) => this.setState({
              itemWidth: +event.target.value,
            })}
          />
        </label>

        <label
          className="Parameter"
        >
          Animation duration
          <input
            className="ParamValue"
            type="number"
            defaultValue={this.state.animationDuration}
            min="0"
            max="3000"
            step="100"
            onChange={(event) => this.setState({
              animationDuration: +event.target.value,
            })}
          />
        </label>

        <label
          className="Parameter"
        >
          Infinite
          <select
            className="ParamValue"
            onChange={(event) => {
              this.setState({
                infinite: event.target.value === 'true',
                rebuildCarousel: this.changeRebuildProperty(),
              });
            }}
            defaultValue="false"
          >
            <option
              value="true"
            >
              Infinite
            </option>
            <option
              value="false"
            >
              Discrete
            </option>
          </select>
        </label>
      </div>
    );
  }
}

export default App;
