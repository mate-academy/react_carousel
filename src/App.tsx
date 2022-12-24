import { ChangeEvent, Component } from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';
import { Container } from './components/Container';
import { Form } from './components/Form';
import { Input } from './components/Input';
import { CheckBox } from './components/CheckBox';

export interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1,
    infinite: false,
  };

  stepChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === ''
      || Number(event.target.value) < 1
      || Number.isNaN(Number(event.target.value))) {
      this.setState({
        step: 1,
      });
    }

    this.setState({
      step: Number(event.target.value),
    });
  };

  frameSizeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.value === ''
      || Number(event.target.value) < 1
      || Number.isNaN(Number(event.target.value))
    ) {
      this.setState({
        frameSize: 1,
      });
    }

    this.setState({
      frameSize: Number(event.target.value),
    });
  };

  itemWidthHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.value === ''
      || Number(event.target.value) < 90
      || Number.isNaN(Number(event.target.value))
    ) {
      this.setState({
        itemWidth: 90,
      });
    }

    this.setState({
      itemWidth: Number(event.target.value),
    });
  };

  animationDurationHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.value === ''
      || Number(event.target.value) < 1
      || Number.isNaN(Number(event.target.value))
    ) {
      this.setState({
        animationDuration: 1,
      });
    }

    this.setState({
      animationDuration: Number(event.target.value),
    });
  };

  infiniteHandler = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      infinite: event.target.checked,
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
        <h1 data-cy="title" className="App__title">
          {`Carousel with ${images.length} images`}
        </h1>

        <Container>
          <Carousel
            images={images}
            step={step}
            frameSize={frameSize}
            itemWidth={itemWidth}
            animationDuration={animationDuration}
            infinite={infinite}
          />
        </Container>

        <Form>
          <Input
            label="Step"
            option={step}
            changeHandler={this.stepChangeHandler}
          />

          <Input
            label="Frame size"
            option={frameSize}
            changeHandler={this.frameSizeChangeHandler}
          />

          <Input
            label="Item width"
            option={itemWidth}
            changeHandler={this.itemWidthHandler}
          />

          <Input
            label="Animation duration"
            option={animationDuration}
            changeHandler={this.animationDurationHandler}
          />

          <CheckBox
            infinite={infinite}
            changeHandler={this.infiniteHandler}
          />
        </Form>
      </div>
    );
  }
}

export default App;
