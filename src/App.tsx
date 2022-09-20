import React from 'react';
import 'bulma/css/bulma.css';
import { Form } from './components/Form/Form';
import { Carousel } from './components/Carousel/Carousel';

type Image = string;

interface State {
  images: Image[]
  itemWidth: string;
  frameSize: string;
  step: string;
  animationDuration: string;
  // infinite: boolean;
  position: string;
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
    itemWidth: '130',
    frameSize: '3',
    step: '3',
    animationDuration: '1000',
    // infinite: false,
    position: '0',
  };

  handleMoveForvard = () => {
    const {
      itemWidth, step, frameSize, images,
    } = this.state;
    const moveValue = +itemWidth * +step;
    const maxValue = +itemWidth * (images.length - +frameSize);

    this.setState(prevState => ({
      position: Math.abs(+prevState.position - moveValue) > Math.abs(maxValue)
        ? String(-maxValue)
        : String(+prevState.position - moveValue),
    }));
  };

  handleMoveBack = () => {
    const moveValue = +this.state.itemWidth * +this.state.step;

    this.setState(prevState => ({
      position: (+prevState.position + moveValue) > 0
        ? '0'
        : String(+prevState.position + moveValue),
    }));
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const { itemWidth } = this.state;

    this.setState(prevState => {
      let corectedPosition;

      switch (name) {
        case 'itemWidth':
          corectedPosition
            = String(+prevState.position * (+value / +prevState.itemWidth));
          break;

        case 'frameSize':
          corectedPosition
            = prevState.position === '0'
              ? prevState.position
              : String(+prevState.position + +itemWidth);
          break;

        default:
          corectedPosition = prevState.position;
          break;
      }

      return ({
        [name]: value,
        position: name === 'itemWidth' || name === 'frameSize'
          ? corectedPosition
          : prevState.position,
      }) as never;
    });
  };

  // handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { checked } = event.target;

  //   this.setState({ infinite: checked });
  // };

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      // infinite,
      position,
    } = this.state;

    return (
      <div className="App">
        {/* eslint-disable-next-line */}
        <h1 data-cy="title" className="title mt-5 has-text-info has-text-centered">
          {`Carousel with ${images.length} images`}
        </h1>

        <Form
          itemWidth={itemWidth}
          frameSize={frameSize}
          step={step}
          animationDuration={animationDuration}
          // infinite={infinite}
          length={images.length}
          onChange={this.handleChange}
          // onChecked={this.handleChecked}
        />

        <Carousel
          images={images}
          itemWidth={itemWidth}
          frameSize={frameSize}
          // step={step}
          animationDuration={animationDuration}
          // infinite={infinite}
          position={position}
          onNext={this.handleMoveForvard}
          onPrev={this.handleMoveBack}
        />
      </div>
    );
  }
}

export default App;
