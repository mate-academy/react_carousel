import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel/Carousel';
import { Form } from './components/Form/Form';

export interface State {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  updateStateInput = (value: number, name: string) => {
    switch (name) {
      case 'step':
        this.setState({
          step: value,
        });
        break;

      case 'frameSize':
        this.setState({
          frameSize: value,
        });
        break;

      case 'itemWidth':
        this.setState({
          itemWidth: value,
        });
        break;

      case 'animationDuration':
        this.setState({
          animationDuration: value,
        });
        break;

      default:
        throw new Error('Name not found');
    }
  };

  updateStateCheckBox = (isChecked: boolean) => {
    this.setState({
      infinite: isChecked,
    });
  };

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        <h1
          className="App__title"
          data-cy="title"
        >
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
        />

        <Form
          updateStateInput={this.updateStateInput}
          updateStateCheckBox={this.updateStateCheckBox}
        />
      </div>
    );
  }
}

export default App;
