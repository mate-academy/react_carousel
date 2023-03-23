import { ChangeEvent, Component } from 'react';
import './App.scss';
import { Carousel } from '../Carousel';
import { SettingsContainer } from '../SettingsContainer';

interface State {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

const initialState = {
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
  infinite: false,
  frameSize: 3,
  itemWidth: 130,
  animationDuration: 1000,
  step: 3,
};

class App extends Component<{}, State> {
  state: Readonly<State> = initialState;

  handleItemWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ itemWidth: +event.currentTarget.value });
  };

  handleFrameSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ frameSize: +event.currentTarget.value });
  };

  handleDurationChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ animationDuration: +event.currentTarget.value });
  };

  handleStepChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ step: +event.currentTarget.value });
  };

  handleInfiniteChange = () => {
    this.setState(prevState => {
      return {
        infinite: !prevState.infinite,
      };
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

    const {
      handleItemWidthChange,
      handleFrameSizeChange,
      handleDurationChange,
      handleStepChange,
      handleInfiniteChange,
    } = this;

    const carouselTitle = `Carousel with ${images.length} images`;

    return (
      <div className="app">
        <h1 data-cy="title" className="app__title">{carouselTitle}</h1>

        <Carousel
          images={images}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
          step={step}
        />

        <SettingsContainer
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
          step={step}
          handleItemWidthChange={handleItemWidthChange}
          handleFrameSizeChange={handleFrameSizeChange}
          handleDurationChange={handleDurationChange}
          handleStepChange={handleStepChange}
          handleInfiniteChange={handleInfiniteChange}
        />
      </div>
    );
  }
}

export default App;
