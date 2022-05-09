/* eslint-disable import/no-useless-path-segments */
import React from 'react';
import './App.scss';
import { Carousel } from './components/Carousel/';
import { InputForm } from './components/InputForm/';
import { CaruselSettings } from './types/CaruselSettings';

type State = {
  images: Array<string>,
  caruselSettings: CaruselSettings,
};

export class App extends React.Component<{}, State> {
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
    caruselSettings: {
      frameSize: 3,
      itemWidth: 100,
      stepCount: 3,
      animationDuration: 1000,
      isInfinite: false,
    },
  };

  updateSettings: (event: React.FormEvent<HTMLInputElement>) => void = (e) => {
    const { name, value } = e.currentTarget;

    // eslint-disable-next-line default-case
    switch (name) {
      case 'itemWidth':
        this.setState((prevState) => (
          {
            ...prevState,
            caruselSettings: {
              ...prevState.caruselSettings,
              itemWidth: Number(value),
            },
          }
        ));
        break;
      case 'frameSize':
        this.setState((prevState) => (
          {
            ...prevState,
            caruselSettings: {
              ...prevState.caruselSettings,
              frameSize: Number(value),
            },
          }
        ));
        break;
      case 'stepCount':
        this.setState((prevState) => (
          {
            ...prevState,
            caruselSettings: {
              ...prevState.caruselSettings,
              stepCount: Number(value),
            },
          }
        ));
        break;
      case 'animationDuration':
        this.setState((prevState) => (
          {
            ...prevState,
            caruselSettings: {
              ...prevState.caruselSettings,
              animationDuration: Number(value),
            },
          }
        ));
        break;
      case 'isInfinite':
        this.setState((prevState) => (
          {
            ...prevState,
            caruselSettings: {
              ...prevState.caruselSettings,
              isInfinite: !prevState.caruselSettings.isInfinite,
            },
          }
        ));
        break;
    }
  };

  render() {
    const {
      images,
      caruselSettings,
    } = this.state;

    return (
      <div className="app">
        <InputForm
          images={images}
          caruselSettings={caruselSettings}
          updateSettings={this.updateSettings}
        />

        <Carousel
          images={images}
          caruselSettings={caruselSettings}
        />
      </div>
    );
  }
}
