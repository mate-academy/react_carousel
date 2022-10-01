import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  duration: number;
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
    step: 2,
    frameSize: 3,
    itemWidth: 130,
    duration: 1000,
    infinite: false,
  };

  handerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let valueInput = Number(e.currentTarget.value);
    const { id } = e.currentTarget;

    if (valueInput < 130 && id === 'itemId') {
      valueInput = 130;
    }

    if (valueInput === 0 && id === 'frameSize') {
      return;
    }

    switch (id) {
      case 'stepId':
        this.setState({
          step: valueInput,
        });
        break;
      case 'frameSize':
        this.setState({
          frameSize: valueInput,
        });
        break;
      case 'itemId':
        this.setState({
          itemWidth: valueInput,
        });
        break;
      case 'animationDuration':
        this.setState({
          duration: valueInput,
        });
        break;
      case 'infinite':
        this.setState(prevState => (
          {
            infinite: !prevState.infinite,
          }));
        break;
      default: break;
    }
  };

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 className="App__title" data-cy="title">Carousel with {images.length} images</h1>

        <div className="App__inputs">
          <label htmlFor="stepId" className="App__label">
            <span className="App__inputName">Step: </span>
            <input
              type="number"
              id="stepId"
              defaultValue={2}
              className="App__input"
              onChange={this.handerInput}
            />
          </label>
          <label htmlFor="frameSize" className="App__label">
            <span className="App__inputName">FrameSize: </span>
            <input
              type="number"
              id="frameSize"
              defaultValue={3}
              className="App__input"
              onChange={this.handerInput}
            />
          </label>
          <label htmlFor="itemId" className="App__label">
            <span className="App__inputName">ItemWidth: </span>
            <input
              type="number"
              id="itemId"
              defaultValue={130}
              className="App__input"
              onChange={this.handerInput}
            />
          </label>
          <label htmlFor="animationDuration" className="App__label">
            <span className="App__inputName">Duration: </span>
            <input
              type="number"
              id="animationDuration"
              defaultValue={1000}
              className="App__input"
              onChange={this.handerInput}
            />
          </label>
          <label htmlFor="infinite" className="App__label">
            <span className="App__inputName">Infinite: </span>
            <input
              type="checkbox"
              id="infinite"
              className="App__checkbox"
              onChange={this.handerInput}
            />
            <span />
          </label>
        </div>

        <Carousel
          images={images}
          step={this.state.step}
          frameSize={this.state.frameSize}
          itemWidth={this.state.itemWidth}
          animationDuration={this.state.duration}
          infinite={this.state.infinite}
        />
      </div>
    );
  }
}

export default App;
