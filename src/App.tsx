import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel';

interface State {
  images: string[];
  stepInput: string;
  frameSizeInput: string;
  itemWidthInput: string;
  animationDurationInput: string;
}

type InputField =
  | 'stepInput'
  | 'frameSizeInput'
  | 'itemWidthInput'
  | 'animationDurationInput';

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
    stepInput: '',
    frameSizeInput: '',
    itemWidthInput: '',
    animationDurationInput: '',
  };

  componentDidMount() {
    document.title = 'Carousel';
  }

  handleChange =
    (field: InputField) => (e: React.ChangeEvent<HTMLInputElement>) => {
      this.setState(prev => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  render() {
    const {
      images,
      stepInput,
      frameSizeInput,
      itemWidthInput,
      animationDurationInput,
    } = this.state;

    // Значения по умолчанию
    const defaultStep = 3;
    const defaultFrameSize = 3;
    const defaultItemWidth = 130;
    const defaultanimationDuration = 1000;

    // Преобразование строк в числа, если введено
    const step = parseInt(stepInput) || defaultStep;
    const frameSize = parseInt(frameSizeInput) || defaultFrameSize;
    const itemWidth = parseInt(itemWidthInput) || defaultItemWidth;
    const animationDuration =
      parseInt(animationDurationInput) || defaultanimationDuration;

    return (
      <div className="App">
        <h1 data-cy="title">Carousel with {images.length} images</h1>

        <div className="input-wrapper">
          <label htmlFor="stepId">Step</label>
          <input
            id="stepId"
            name="stepId"
            type="number"
            placeholder={`(default ${defaultStep})`}
            value={stepInput}
            onChange={this.handleChange('stepInput')}
          />
          <label htmlFor="frameId">Frame Size</label>
          <input
            id="frameId"
            name="frameId"
            type="number"
            placeholder={`(default ${defaultFrameSize})`}
            value={frameSizeInput}
            onChange={this.handleChange('frameSizeInput')}
          />
          <label htmlFor="itemId">Item Width</label>
          <input
            id="itemId"
            name="itemId"
            type="number"
            placeholder={`(default ${defaultItemWidth})`}
            value={itemWidthInput}
            onChange={this.handleChange('itemWidthInput')}
          />
          <label htmlFor="animationDuration">Animation Duration</label>
          <input
            name="animationDuration"
            type="number"
            placeholder={`(default ${defaultanimationDuration}ms)`}
            value={animationDurationInput}
            onChange={this.handleChange('animationDurationInput')}
          />
        </div>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={false}
        />
      </div>
    );
  }
}

export default App;
