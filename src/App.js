import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.min.css';
import './App.css';
import './reset.css';
import { Carousel } from './components/Carousel/Carousel';
import { Settings } from './components/Settings/Settings';

const images = [
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
const setClones = () => {
  const infiniteImages = [
    ...images.slice(images.length - 1, images.length),
    ...images,
    ...images.slice(0, 1),
  ];

  return infiniteImages;
};

class App extends React.Component {
  state = {
    imageList: setClones(),
    step: 1,
    frameSize: 1,
    itemWidth: 130 + 30,
    animationDuration: 600,
    infinite: true,
    isSettingsOpen: false,
  };

  setSettings = (obj) => {
    this.setState({
      step: obj.step,
      frameSize: obj.frameSize,
      itemWidth: obj.itemWidth + 30,
      animationDuration: obj.animationDuration,
      infinite: obj.infinite,
    });

    this.setState(prevState => ({
      isSettingsOpen: !prevState.isSettingsOpen,
      imageList: prevState.infinite
        ? setClones()
        : [
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
    }));
  };

  handleSettingsOpen = () => {
    this.setState(prevState => ({
      isSettingsOpen: !prevState.isSettingsOpen,
    }));
  }

  render() {
    const {
      isSettingsOpen,
      imageList,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.state;

    return (
      <div className="App">
        <h1 className="App__title">
        Carousel with 10 images
        </h1>
        <button
          className="Controller"
          type="button"
          onClick={this.handleSettingsOpen}
        >
          {isSettingsOpen ? 'Close Settings Bar' : 'Open Settings Bar'}
        </button>
        <Settings
          className={isSettingsOpen ? 'Settings Settings--open' : 'Settings'}
          submitFunc={obj => this.setSettings(obj)}
        />
        <Carousel
          images={imageList}
          frameSize={frameSize}
          step={step}
          infinite={infinite}
          itemWidth={itemWidth}
          animationDuration={animationDuration.toString().trim()}
        />
      </div>
    );
  }
}

export default App;
