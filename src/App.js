import React from 'react';
import './App.scss';

import Carousel from './components/Carousel';
import SettingsForm from './components/SettingsForm';

class App extends React.Component {
  state = {
    infinite: false,
    itemWidth: 130,
    frameSize: 3,
    step: 3,
  };

  onChangeSettings = ({ target }) => {
    const { name, value, type } = target;

    if (type === 'checkbox') {
      this.setState(state => ({
        infinite: !state.infinite,
      }));
    } else if (name === 'frameSize') {
      this.setState({
        [name]: value,
        step: value,
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  }

  render() {
    const { images, infinite, frameSize, itemWidth, step } = this.state;

    return (
      <div className="app">
        <h1>Carousel with images</h1>

        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={1000}
          infinite={infinite}
        />
        <SettingsForm
          infinite={infinite}
          toggleInfinite={this.toggleInfinite}
          onChangeSettings={this.onChangeSettings}
        />
      </div>
    );
  }
}

export default App;
