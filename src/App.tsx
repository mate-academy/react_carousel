import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  itemWidth: number;
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
  };

  handleItemWidthChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const nextRaw = Number(e.target.value);

    if (Number.isFinite(nextRaw)) {
      const next = Math.max(130, Math.min(600, nextRaw));

      this.setState({ itemWidth: next });
    }
  };

  render() {
    const { images, itemWidth } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1>Carousel with {images.length} images</h1>

        <label>
          Item width (px):
          <input
            type="number"
            value={itemWidth}
            min={130}
            max={600}
            step={1}
            onChange={this.handleItemWidthChange}
          />
        </label>

        <Carousel images={images} itemWidth={itemWidth} />
      </div>
    );
  }
}

export default App;
