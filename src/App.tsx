import { Component } from 'react';
import Carousel from './components/Carousel';
import { Form } from './components/Form';
import { State, ChangeStateType } from './Types';

import './App.scss';

class App extends Component<{}, State> {
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

  changeState: ChangeStateType = (name, value, bool) => {
    switch (name) {
      case 'frameSize':
        this.setState({ frameSize: value });
        break;

      case 'step':
        this.setState({ step: value });
        break;

      case 'itemWidth':
        this.setState({ itemWidth: value });
        break;

      case 'animationDuration':
        this.setState({ animationDuration: value });
        break;

      case 'infinite':
        this.setState({ infinite: bool });
        break;

      default:
        throw new Error('no name');
    }
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title">
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel {...this.state} />

        <Form
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          imagesLength={images.length}
          changeState={this.changeState}
        />
      </div>
    );
  }
}

export default App;
