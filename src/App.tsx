import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';
import { Props } from './type/Props';

class App extends React.Component<{}, Required<Props>> {
  state: Required<Props> = {
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

  render() {
    const { images, itemWidth, frameSize, step, animationDuration, infinite } =
      this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <div className="inputGroup">
          <label htmlFor="itemId">
            Item Width:
            <input
              id="itemId"
              type="number"
              value={itemWidth}
              min={50} // Мінімальна ширина
              max={300} // Максимальна ширина
              onChange={e =>
                this.setState({
                  itemWidth: Math.max(50, Math.min(+e.target.value, 300)),
                })
              }
            />
          </label>
          <label htmlFor="frameId">
            Frame Size:
            <input
              id="frameId"
              type="number"
              value={frameSize}
              min={1}
              max={images.length} // Максимальний розмір кадру не більше кількості зображень
              onChange={e =>
                this.setState({
                  frameSize: Math.max(
                    1,
                    Math.min(+e.target.value, images.length),
                  ),
                })
              }
            />
          </label>
          <label htmlFor="stepId">
            Step:
            <input
              id="stepId"
              type="number"
              value={step}
              min={1} // Крок мінімум 1
              max={frameSize} // Крок не більше ніж розмір кадру
              onChange={e =>
                this.setState({
                  step: Math.max(1, Math.min(+e.target.value, frameSize)),
                })
              }
            />
          </label>
          <label>
            Animation Duration (ms):
            <input
              type="number"
              value={animationDuration}
              min={100} // Мінімальна тривалість анімації
              max={5000} // Максимальна тривалість анімації
              onChange={e =>
                this.setState({
                  animationDuration: Math.max(
                    100,
                    Math.min(+e.target.value, 5000),
                  ),
                })
              }
            />
          </label>
          <label className="checkbox-label">
            Turn on infinite Carousel
            <input
              type="checkbox"
              checked={infinite}
              onChange={e => this.setState({ infinite: e.target.checked })}
            />
          </label>
        </div>
        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
      </div>
    );
  }
}

export default App;
