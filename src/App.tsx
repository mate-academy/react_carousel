import { Component } from 'react';
import './App.scss';
import Carousel from './components/Carousel';
import { AppState } from './types';
import { Form } from './components/Form';

class App extends Component<{}, AppState> {
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
    step: 2,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  handleStepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'infinite') {
      this.setState(prev => ({ infinite: !prev.infinite }));
    } else {
      this.setState(prev => ({ ...prev, [name]: +value }));
    }
  };

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">Carousel with {images.length} images</h1>
        <Carousel {...this.state} />
        <Form images={images} handleStepChange={this.handleStepChange} />
      </div>
    );
  }
}

export default App;
