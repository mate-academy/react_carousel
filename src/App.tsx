import React from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { Controls } from './components/Controls';

interface State {
  images: string[];
  frameSize: number;
  itemWidth: number;
  step: number;
  duration: number;
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
    frameSize: 3,
    itemWidth: 130,
    step: 3,
    duration: 1000,
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (value !== '') {
      this.setState({
        [name]: +value,
      } as unknown as Pick<State, keyof State>);
    }
  };

  render() {
    const { images, frameSize, itemWidth, step, duration } = this.state;

    return (
      <div className="App">
        <div className="container">
          <h1 data-cy="title">Carousel with {images.length} images</h1>

          <Carousel
            images={images}
            step={step}
            frameSize={frameSize}
            itemWidth={itemWidth}
            animationDuration={Number(duration)}
            infinite={false}
          />

          <Controls
            itemWidth={itemWidth}
            frameSize={frameSize}
            step={step}
            duration={duration}
            handleChange={this.handleInputChange}
            // setImageWidth={this.handleInputChange('itemWidth')}
            // setFrameSize={this.handleInputChange('frameSize')}
            // setStep={this.handleInputChange('step')}
            // setDurantion={this.handleInputChange('duration')}
          />
        </div>
      </div>
    );
  }
}

export default App;
