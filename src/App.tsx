import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  step: number;
  frameSize: number,
  itemWidth: number,
  count: number,
  animationDuration: number;
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
    count: 7,
    animationDuration: 1000,
  };

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      frameSize: +event.target.value,
    });
    this.setState(prevState => ({
      count: prevState.count - prevState.images.length,
    }));
  }

  widthItem(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ itemWidth: +event.target.value });
  }

  stepChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ step: +event.target.value });
  }

  animationChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ animationDuration: +event.target.value });
  }

  countChange(value: number) {
    this.setState({ count: value });
  }

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      count,
      animationDuration,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <form className="App__form" action="/">
          <label htmlFor="item">
            Number of images

            <input
              className="App__input"
              type="number"
              value={frameSize}
              min={3}
              max={10}
              name="input1"
              onChange={(event) => this.handleChange(event)}
            />
          </label>

          <label htmlFor="item2">
            Item Width

            <input
              className="App__input"
              type="number"
              value={itemWidth}
              name="input2"
              onChange={(event) => this.widthItem(event)}
            />
          </label>

          <label htmlFor="item">
            Number of images scrolled

            <input
              className="App__input"
              type="number"
              value={step}
              min={1}
              max={9}
              name="input1"
              onChange={(event) => this.stepChange(event)}
            />
          </label>

          <label htmlFor="item">
            Animation Duration

            <input
              className="App__input"
              type="number"
              value={animationDuration}
              name="input1"
              onChange={(event) => this.animationChange(event)}
            />
          </label>
        </form>
        <Carousel
          images={images}
          frameSize={frameSize}
          itemWidth={itemWidth}
          step={step}
          count={count}
          animationDuration={animationDuration}
          countChange={(value) => this.countChange(value)}
        />
      </div>
    );
  }
}

export default App;
