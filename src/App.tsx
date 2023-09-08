import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';

interface State {
  images: string[];
  stepChange: number;
  frameSizeChange: number;
  itemWidthChange: number;
  duration: number;
  infiniteImg: boolean;
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
    stepChange: 3,
    frameSizeChange: 3,
    itemWidthChange: 130,
    duration: 1000,
    infiniteImg: false,
  };

  handleStepChange = (value: number) => {
    this.setState({ stepChange: value });
  };

  handleFrameSizeChange = (value: number) => {
    this.setState({ frameSizeChange: value });
  };

  handleItemWidthChange = (value: number) => {
    this.setState({ itemWidthChange: value });
  };

  handleDurationChange = (value: number) => {
    this.setState({ duration: value });
  };

  handleInfiniteChange = (value: boolean) => {
    this.setState({ infiniteImg: value });
  };

  render() {
    const {
      images,
      stepChange,
      frameSizeChange,
      itemWidthChange,
      duration,
      infiniteImg,
    } = this.state;

    return (
      <div className="App">
        <h1 className="App__title">{`Carousel with ${images.length} images`}</h1>

        <Carousel
          images={images}
          step={stepChange}
          frameSize={frameSizeChange}
          itemWidth={itemWidthChange}
          animationDuration={duration}
          infinite={infiniteImg}
        />
        <form>
          <label htmlFor="step">Choose a step:</label>
          <input
            id="step"
            min={2}
            max={4}
            type="number"
            onChange={(e) => {
              this.handleStepChange(parseInt(e.target.value, 10));
            }}
            value={stepChange}
          />
          <label htmlFor="frameSize">Choose a size frame:</label>
          <input
            id="frameSize"
            min={2}
            max={5}
            type="number"
            onChange={(e) => {
              this.handleFrameSizeChange(parseInt(e.target.value, 10));
            }}
            value={frameSizeChange}
          />
          <label htmlFor="itemWidth">Choose a width item:</label>
          <input
            id="itemWidth"
            min={130}
            max={150}
            type="number"
            onChange={(e) => {
              this.handleItemWidthChange(parseInt(e.target.value, 10));
            }}
            value={itemWidthChange}
          />
          <label htmlFor="duration">Choose a duration animation:</label>
          <input
            id="duration"
            type="number"
            min={1000}
            max={5000}
            step={50}
            onChange={(e) => {
              this.handleDurationChange(parseInt(e.target.value, 10));
            }}
            value={duration}
          />
          <label htmlFor="checkbox">infinite</label>
          <input
            id="checkbox"
            type="checkbox"
            onChange={(e) => {
              this.handleInfiniteChange(e.target.checked);
            }}
            checked={infiniteImg}
          />
        </form>
      </div>
    );
  }
}

export default App;
