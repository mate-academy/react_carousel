import React, { Component } from 'react';
import './App.scss';

import Carousel from './components/Carousel/Carousel';
import CarouselSettings from './components/CarouselSettings/CarouselSettings';

export default class App extends Component {
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
    frameSize: 1,
    step: 1,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
  };

  changeFrameSize = (evt) => {
    evt.preventDefault();

    this.setState({
      frameSize: +evt.target.value,
    });
  }

  changeStep = (evt) => {
    evt.preventDefault();

    this.setState({
      step: +evt.target.value,
    });
  }

  changeItemWidth = (evt) => {
    evt.preventDefault();

    this.setState({
      itemWidth: +evt.target.value,
    });
  }

  changeAnimationDuration = (evt) => {
    evt.preventDefault();

    this.setState({
      animationDuration: +evt.target.value,
    });
  }

  changeFinite = (evt) => {
    this.setState({
      infinite: evt.target.checked,
    });
  }

  render() {
    const { images } = this.state;

    return (
      <div className="App">
        <h1 className="App__header">
          {`Carousel with ${images.length} images`}
        </h1>

        <Carousel
          images={this.state.images}
          frameSize={this.state.frameSize}
          itemWidth={this.state.itemWidth}
          step={this.state.step}
          animationDuration={this.state.animationDuration}
          infinite={this.state.infinite}
        />

        <CarouselSettings
          images={this.state.images}
          frameSize={this.state.frameSize}
          itemWidth={this.state.itemWidth}
          onchangeFrameSize={evt => this.changeFrameSize(evt)}
          onChangeStep={evt => this.changeStep(evt)}
          onChangeItemWidth={evt => this.changeItemWidth(evt)}
          onChangeAnimationDuration={evt => this.changeAnimationDuration(evt)}
          onChangeFinite={evt => this.changeFinite(evt)}
        />
      </div>
    );
  }
}
