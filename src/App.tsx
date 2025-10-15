import './App.scss';
import Carousel from './components/Carousel';
import React from 'react';

interface State {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
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
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
  };

  componentDidMount(): void {
    document.title = 'Carousel';
  }

  render() {
    const { images, itemWidth, frameSize, step, animationDuration } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <Carousel
          images={this.state.images}
          frameSize={frameSize} // кількість зображень, що відображаються одночасно
          itemWidth={itemWidth}
          step={step} // кількість зображень, що прокручуються за клік
          animationDuration={animationDuration} //час у мс для відображення нової порції зображень
          infinite={false} //для циклічного відображення каруселі
        />

        <input
          id="itemId"
          type="number"
          placeholder="itemWidth"
          value={itemWidth}
          onChange={e => this.setState({ itemWidth: Number(e.target.value) })}
        />
        <input
          id="frameId"
          type="number"
          placeholder="frameSize"
          value={frameSize}
          onChange={e => this.setState({ frameSize: Number(e.target.value) })}
        />
        <input
          id="stepId"
          type="number"
          placeholder="step"
          value={step}
          onChange={e => this.setState({ step: Number(e.target.value) })}
        />
        <input
          id="durationId"
          type="number"
          placeholder="animationDuration"
          value={animationDuration}
          onChange={e =>
            this.setState({ animationDuration: Number(e.target.value) })
          }
        />
      </div>
    );
  }
}

export default App;
