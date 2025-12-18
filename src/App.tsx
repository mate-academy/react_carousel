import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
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
    infinite: false,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    this.setState(prev => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}

        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <div className="carousel-settings">
          <div className="carousel-settings__field">
            <label htmlFor="itemId" className="carousel-settings__field-name">
              Tamanho da Imagem
            </label>
            <input
              className="carousel-settings__input"
              id="itemId"
              name="itemWidth"
              type="number"
              value={itemWidth}
              onChange={this.handleChange}
            ></input>
          </div>
          <div className="carousel-settings__field">
            <label htmlFor="frameId" className="carousel-settings__field-name">
              Tamanho do carrossel
            </label>
            <input
              className="carousel-settings__input"
              id="frameId"
              name="frameSize"
              type="number"
              value={frameSize}
              onChange={this.handleChange}
            ></input>
          </div>
          <div className="carousel-settings__field">
            <label htmlFor="stepId" className="carousel-settings__field-name">
              Quantas imagens passar
            </label>
            <input
              className="carousel-settings__input"
              id="stepId"
              name="step"
              type="number"
              value={step}
              onChange={this.handleChange}
            ></input>
          </div>
          <div className="carousel-settings__field">
            <label
              htmlFor="animationDurationId"
              className="carousel-settings__field-name"
            >
              Duração da animação
            </label>
            <input
              className="carousel-settings__input"
              id="animationDurationId"
              name="animationDuration"
              type="number"
              value={animationDuration}
              onChange={this.handleChange}
            ></input>
          </div>
          <div className="carousel-settings__field">
            <label
              htmlFor="infiniteId"
              className="carousel-settings__field-name"
            >
              Carrossel infinito
            </label>
            <input
              className="carousel-settings__input"
              id="infiniteId"
              name="infinite"
              type="checkbox"
              checked={!!infinite}
              onChange={() =>
                this.setState(prev => ({
                  infinite: !prev.infinite,
                }))
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
