import { Component } from 'react';
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
          data-cy="title"
          className="App__title"
        >
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
          <Input label="Step" option={step} />

          <Input label="Frame size" option={frameSize} />

          <Input label="Item width" option={itemWidth} />

          <Input label="Animation duration" option={animationDuration} />

          <CheckBox />
        </Form>
      </div>
    );
  }
}

export default App;
