import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';
import { Form } from './components/Form';
import { Sizes } from './types/Sizes';

type State = Sizes & {
  images: string[];
};

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

  submitChanges = (event: {
    target: { name: string; value: string; };
  }) => {
    const { value } = event.target;
    const targetName = event.target.name;

    switch (targetName) {
      case 'itemWidth':
        this.setState({ itemWidth: +value });
        break;
      case 'frameSize':
        this.setState({ frameSize: +value });
        break;
      case 'step':
        this.setState({ step: +value });
        break;
      case 'animationDuration':
        this.setState({ animationDuration: +value });
        break;

      case 'infinite':
        this.setState(state => ({ infinite: !state.infinite }));
        break;

      default:
        break;
    }
  };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
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
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <Form
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          submitFuction={this.submitChanges}
        />
      </div>
    );
  }
}

export default App;
