import React from 'react';
import './App.scss';
import Carousel from './components/Carousel/Carousel';
import CarouselSetings from './components/Carusel-setings/Carousel-setings';
import { State } from './Types';

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
    settings: {
      width: 130,
      frameSize: 3,
      step: 3,
      speed: 1000,
    },
  };

  setSetings = (e:React.FormEvent<HTMLInputElement>, param:string):void => {
    const newValue:number = +e.currentTarget.value;

    this.setState(({ settings }) => {
      const newSettings = { ...settings };

      newSettings[param] = newValue;

      return { settings: newSettings };
    });
  };

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        <CarouselSetings
          settings={this.state.settings}
          changeInput={(e, param) => {
            this.setSetings(e, param);
          }}
        />
        <Carousel
          images={images}
          settings={this.state.settings}
        />
      </div>
    );
  }
}

export default App;
