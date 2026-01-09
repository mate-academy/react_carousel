import './App.scss';
import Carousel from './components/Carousel';
import React from 'react';

interface State {
  images: string[]; // total de imagens
  step: number; // total de imagens que podem ser puladas
  frameSize: number; // número de imagens exibidas simultaneamente
  itemWidth: number; // personalizar o tamanho das imagens
  animationDuration: number; // duraçao da animaçao
  infinite: boolean; // torna o carrosel ciclico\
  currentPage: number; // atual page
}

export class App extends React.Component<{}, State> {
  state: State = {
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
    currentPage: 1,
  };

  handleUpdateWidth = (value: number) => {
    this.setState({ itemWidth: value });
  };

  handleUpdateFrameSize = (value: number) => {
    this.setState({ frameSize: value });
  };

  handleUpdateStep = (value: number) => {
    this.setState({ step: value });
  };

  handleUpdateAnimation = (value: number) => {
    this.setState({ animationDuration: value });
  };

  handleCurrentPage = (value: number) => {
    this.setState({ currentPage: value });
  };

  render() {
    const { images, step, frameSize, itemWidth, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <form onSubmit={e => e.preventDefault()} method="post">
          <div>
            write the new width in px
            <input
              className="Carousel__input-button"
              type="number"
              value={this.state.itemWidth}
              onChange={e => {
                this.handleUpdateWidth(
                  Math.max(1, Math.trunc(Number(e.target.value) || 0)),
                );
              }}
            />
          </div>
          <div>
            number of scrolled images
            <input
              className="Carousel__input-button"
              type="number"
              value={this.state.step}
              onChange={e => {
                this.handleUpdateStep(
                  Math.max(1, Math.trunc(Number(e.target.value) || 0)),
                );
                this.setState({ currentPage: 1 });
              }}
            />
          </div>
          <div>
            Write the number of images.
            <input
              className="Carousel__input-button"
              type="number"
              value={this.state.frameSize}
              onChange={e => {
                this.handleUpdateFrameSize(
                  Math.max(1, Math.trunc(Number(e.target.value) || 0)),
                );
                this.setState({ currentPage: 1 });
              }}
            />
          </div>
          <div>
            animation duration
            <input
              className="Carousel__input-button"
              type="number"
              value={this.state.animationDuration}
              onChange={e => {
                this.handleUpdateAnimation(
                  Math.max(1, Math.trunc(Number(e.target.value) || 0)),
                );
              }}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default App;
