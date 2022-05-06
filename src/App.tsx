import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
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
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  handleFrameSizeChange = (event: React.SyntheticEvent<EventTarget>) => {
    this.setState({
      frameSize: +(event.target as HTMLInputElement).value,
    });
  };

  handleItemWidthChange = (event: React.SyntheticEvent<EventTarget>) => {
    this.setState({
      itemWidth: +(event.target as HTMLInputElement).value,
    });
  };

  handleAnimationTimeChange = (event: React.SyntheticEvent<EventTarget>) => {
    this.setState({
      animationDuration: +(event.target as HTMLInputElement).value,
    });
  };

  handleInfiniteChange = () => {
    const { infinite } = this.state;

    this.setState({
      infinite: !infinite,
    });
  };

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        <h1 className="App__title">
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={images}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />
        <form className="App__form">
          <div>
            <span className="App__formTitle1">Count images: </span>
            <input
              type="number"
              min="2"
              max="5"
              step="1"
              value={frameSize}
              onChange={this.handleFrameSizeChange}
              className="App__input"
            />
          </div>

          <div>
            <span>Size image: </span>
            <input
              type="text"
              value={itemWidth}
              placeholder="130"
              onChange={this.handleItemWidthChange}
              className="App__input"
            />
          </div>

          <div>
            <span>Animation time: </span>
            <input
              type="text"
              value={animationDuration}
              placeholder="1000"
              onChange={this.handleAnimationTimeChange}
              className="App__input"
            />
          </div>

          <div>
            <span>Infinite animation: </span>
            <input
              type="checkbox"
              onChange={this.handleInfiniteChange}
              className="App__checkbox"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default App;
