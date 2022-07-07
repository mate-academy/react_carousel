import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

type State = {
  images: string[],
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  transformX: number,
};

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
    transformX: 0,
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      transformX,
    } = this.state;

    const stepWidth = step * itemWidth;

    const changeStyleNext = () => {
      this.setState({
        transformX: transformX - stepWidth,
      });
    };

    const changeStylePrev = () => {
      this.setState({
        transformX: transformX + stepWidth,
      });
    };

    return (
      <div className="App">
        <h1 className="App__title" data-cy="title">Carousel</h1>
        <form action="" className="App__form">
          <div className="App__input-conteiner">
            <label htmlFor="itemWidth">Item size:</label>
            <input
              id="itemWidth"
              className="App__input"
              type="number"
              value={itemWidth}
              min={60}
              max={220}
              step={10}
              onChange={(event) => {
                this.setState({
                  itemWidth: +event.target.value,
                  transformX: 0,
                });
              }}
            />
          </div>

          <div className="App__input-conteiner">
            <label htmlFor="frameSize">Frame size:</label>
            <input
              id="frameSize"
              className="App__input"
              type="number"
              value={frameSize}
              min={1}
              max={10}
              onChange={
                (event) => {
                  this.setState({ frameSize: +event.target.value });
                }
              }
            />
          </div>

          <div className="App__input-conteiner">
            <label htmlFor="step">Step:</label>
            <input
              id="frameSize"
              className="App__input"
              type="number"
              value={step}
              min={1}
              max={10}
              onChange={
                (event) => {
                  this.setState({ step: +event.target.value });
                }
              }
            />
          </div>

          <div className="App__input-conteiner">
            <label htmlFor="animationDuration">Animation Duration:</label>
            <input
              id="animationDuration"
              className="App__input"
              type="number"
              value={animationDuration}
              min={0}
              max={5000}
              step={500}
              onChange={
                (event) => {
                  this.setState({ animationDuration: +event.target.value });
                }
              }
            />
          </div>
        </form>
        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          transformX={transformX}
          nextTransform={changeStyleNext}
          prevTransform={changeStylePrev}
        />
      </div>
    );
  }
}

export default App;
