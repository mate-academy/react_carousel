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
  state: Readonly<State> = {
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

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;

    const parsedValue = type === 'checkbox' ? checked : +value;

    this.setState(prev => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  // The page should contain inputs for:
  //  - `itemWidth`
  //  - `frameSize`
  //  - `step`
  //  - `animationDuration`

  render() {
    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 className="App__title" data-cy="title">Carousel with {this.state.images.length} images</h1>

        <form className="App__form" onSubmit={e => e.preventDefault()}>
          <div className="App__input input App__input--itwidth">
            <label className="input__label" htmlFor="itemId">
              Item width:
            </label>
            <input
              id="itemId"
              className="input__field"
              type="number"
              name="itemWidth"
              value={this.state.itemWidth}
              min={130}
              max={260}
              step="10"
              onChange={this.handleChange}
            />
          </div>
          <div className="App__input input App__input--frame">
            <label className="input__label" htmlFor="frameId">
              Frame size:
            </label>
            <input
              id="frameId"
              className="input__field"
              type="number"
              name="frameSize"
              value={this.state.frameSize}
              min={1}
              max={10}
              onChange={this.handleChange}
            />
          </div>
          <div className="App__input App__input--step">
            <label className="input__label" htmlFor="stepId">
              Step:
            </label>
            <input
              id="stepId"
              className="input__field"
              type="number"
              name="step"
              value={this.state.step}
              min={1}
              max={10}
              onChange={this.handleChange}
            />
          </div>
          <div className="App__input App__input--animationdur">
            <label className="input__label" htmlFor="animationDuration">
              Animation duration:
            </label>
            <input
              id="animationDuration"
              className="input__field"
              type="number"
              name="animationDuration"
              value={this.state.animationDuration}
              min={300}
              max={5000}
              step="100"
              onChange={this.handleChange}
            />
          </div>
        </form>

        <div className="App__carusel">
          <Carousel
            images={this.state.images}
            step={this.state.step}
            frameSize={this.state.frameSize}
            itemWidth={this.state.itemWidth}
            animationDuration={this.state.animationDuration}
            infinite={this.state.infinite}
          />
        </div>
      </div>
    );
  }
}

export default App;
