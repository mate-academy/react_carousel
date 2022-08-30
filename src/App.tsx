import { Component } from 'react';
import { InputControl } from './components/InputControl';
import { CheckboxControl } from './components/CheckboxControl';
import { Carousel } from './components/Carousel';

import CarouselType from './types/CarouselType';
import { NumberInput, Checkbox } from './types/Controls';

import './App.scss';

type Controls = (NumberInput | Checkbox);
interface State {
  carousel: CarouselType,
  controls: Controls[],
}

const controlsData: Controls[] = [
  {
    title: 'Item width',
    name: 'itemWidth',
    type: 'number',
    value: 130,
    min: 10,
    step: 1,
  },
  {
    title: 'Frame size',
    name: 'frameSize',
    type: 'number',
    value: 3,
    min: 1,
    step: 1,
  },
  {
    title: 'Step',
    name: 'step',
    type: 'number',
    value: 3,
    min: 1,
    step: 1,
  },
  {
    title: 'Animation duration',
    name: 'animationDuration',
    type: 'number',
    value: 1000,
    min: 0,
    max: 5000,
    step: 100,
  },
  {
    title: 'Infinite',
    name: 'infinite',
    type: 'checkbox',
    value: false,
  },
];

const imagesData: string[] = [
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
];

class App extends Component<{}, State> {
  state: Readonly<State> = {
    carousel: {
      images: imagesData,
      step: 3,
      frameSize: 3,
      itemWidth: 130,
      itemGap: 20,
      carouselMaxWidth: 1300,
      animationDuration: 1000,
      infinite: false,
    },
    controls: controlsData,
  };

  handleControlChange = (name: string, value: number | boolean) => {
    if (!(name in this.state.carousel)) {
      return;
    }

    this.setState((prevState: State) => ({
      carousel: {
        ...prevState.carousel,
        [name]: value,
      },
    }));
  };

  render() {
    const { carousel, controls } = this.state;

    return (
      <div className="App">
        <h1
          className="App__title"
          data-cy="title"
        >
          {`Carousel with ${carousel.images.length} images`}
        </h1>

        <div className="App__controls">
          {controls.map(control => {
            const key = control.name as keyof CarouselType;

            switch (control.type) {
              case 'number': {
                const value = Number((key in carousel
                  ? carousel[key]
                  : control.value
                ) || 0);

                return (
                  <InputControl
                    {...control}
                    value={value}
                    key={control.name}
                    handleControlChange={this.handleControlChange}
                  />
                );
              }

              case 'checkbox': {
                const value = Boolean((key in carousel
                  ? carousel[key]
                  : control.value
                ) || false);

                return (
                  <CheckboxControl
                    {...control}
                    value={value}
                    key={control.name}
                    handleControlChange={this.handleControlChange}
                  />
                );
              }

              default:
                return null;
            }
          })}
        </div>

        <Carousel {...carousel} />
      </div>
    );
  }
}

export default App;
