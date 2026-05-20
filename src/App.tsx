import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
}

class App extends React.Component<{}, State> {
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
    itemWidth: 130,

    frameSize: 3,
    step: 3,
    animationDuration: 1000,
  };

  // Універсальний обробник для всіх числових інпутів
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState({
      [name]: Number(value),
    } as unknown as Pick<State, keyof State>);
  };

  render() {
    const { images, itemWidth, frameSize, step, animationDuration } =
      this.state;

    return (
      <div className="App">
        {/* Тест шукає слово "Carousel" англійською */}
        <h1 data-cy="title">Carousel</h1>

        <div className="Settings">
          {/* Додаємо htmlFor та id="itemId" */}
          <label htmlFor="itemId">
            itemWidth (px):
            <input
              type="number"
              id="itemId"
              name="itemWidth"
              value={itemWidth}
              onChange={this.handleChange}
            />
          </label>

          {/* Додаємо htmlFor та id="frameId" */}
          <label htmlFor="frameId">
            frameSize:
            <input
              type="number"
              id="frameId"
              name="frameSize"
              value={frameSize}
              onChange={this.handleChange}
            />
          </label>

          {/* Додаємо htmlFor та id="stepId" */}
          <label htmlFor="stepId">
            step:
            <input
              type="number"
              id="stepId"
              name="step"
              value={step}
              onChange={this.handleChange}
            />
          </label>

          <label>
            animationDuration (ms):
            <input
              type="number"
              name="animationDuration"
              value={animationDuration}
              onChange={this.handleChange}
            />
          </label>
        </div>

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite // Залишаємо, якщо це не ламає інші тести
        />
      </div>
    );
  }
}

export default App;
