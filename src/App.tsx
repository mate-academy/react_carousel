import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  offset: number,
  maxOffset: number,
  infinite: boolean,
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
    offset: 0,
    maxOffset: 0,
    infinite: false,
  };

  componentDidMount() {
    this.setState(prevState => ({ maxOffset: prevState.itemWidth * (10 - prevState.step) }));
  }

  makeMove = (direction: string) => {
    const {
      offset,
      itemWidth,
      step,
      maxOffset,
      infinite,
    } = this.state;

    const pointBack = (infinite && offset === 0) ? -maxOffset : 0;
    const pointForward = (infinite && offset === -maxOffset) ? 0 : -maxOffset;

    if (direction === 'back') {
      this.setState({
        offset: offset + (itemWidth * step) <= 0
          ? offset + (itemWidth * step)
          : pointBack,
      });
    }

    if (direction === 'forward') {
      this.setState({
        offset: offset - (itemWidth * step) >= -maxOffset
          ? offset - (itemWidth * step)
          : pointForward,
      });
    }
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
      offset,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 className='Carousel__title'>Carousel</h1>
        <div className="container">
          <button
            className="button"
            type="button"
            disabled={!this.state.infinite && this.state.offset === 0}
            onClick={() => {
              this.makeMove('back');
            }}
          >
            press for
            <br />
            <br />
            <strong>PREV</strong>
          </button>

          <Carousel
            imagesList={images}
            frameSize={frameSize}
            itemWidth={itemWidth}
            animationDuration={animationDuration}
            offset={offset}
          />
          <button
            className="button"
            type="button"
            disabled={!this.state.infinite
              && this.state.offset === -this.state.maxOffset}
            onClick={() => {
              this.makeMove('forward');
            }}
          >
            press for
            <br />
            <br />
            <strong>NEXT</strong>
          </button>
        </div>
        <div className="input__container">
          <div className="input__label">
            Choose the number of scrolled images
          </div>
          <label htmlFor="step">
            <input
              placeholder="3 images"
              min={1}
              max={10}
              id="step"
              className="input input__step"
              type="number"
              onChange={(event) => {
                this.setState({ step: +event.target.value });
              }}
            />
          </label>
        </div>
        <div className="input__container">
          <div className="input__label">
            Set the number of displayed pictures
          </div>
          <label htmlFor="frameSize">
            <input
              placeholder="3 images"
              min={1}
              max={10}
              id="frameSize"
              className="input input__frameSize"
              type="number"
              onChange={(event) => {
                this.setState({ frameSize: +event.target.value });
              }}
            />
          </label>
        </div>
        <div className="input__container">
          <div className="input__label">Set the size of the picture</div>
          <label htmlFor="frameSize">
            <input
              placeholder="130 px"
              min={30}
              max={500}
              step={10}
              id="frameSize"
              className="input input__frameSize"
              type="number"
              onChange={(event) => {
                this.setState({ itemWidth: +event.target.value });
              }}
            />
          </label>
        </div>
        <div className="input__container">
          <div className="input__label">Set animation duration</div>
          <label htmlFor="frameSize">
            <input
              placeholder="1000 ms"
              min={1000}
              max={10000}
              step={1000}
              id="frameSize"
              className="input input__frameSize"
              type="number"
              onChange={(event) => {
                this.setState({ animationDuration: +event.target.value });
              }}
            />
          </label>
        </div>
        <div className="input__infinite">
          Infinite moving
          <label htmlFor="infinite">
            <input
              id="infinite"
              type="checkbox"
              onChange={() => {
                this.setState(prevState => ({ infinite: !prevState.infinite }));
              }}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default App;
