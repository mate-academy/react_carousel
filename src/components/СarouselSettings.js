import React from 'react';

import './СarouselSettings.scss';

class СarouselSettings extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  onChangeInput(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.props.changeState(name, value);
  }

  render() {
    const {
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
    } = this.props;

    return (
      <div className="controlUnit">
        <h2 className="title">Сarousel settings</h2>
        <div className="inputBox">
          <p className="inputText">Step:</p>
          <input
            className="input"
            type="number"
            name="step"
            value={step}
            onChange={this.onChangeInput}
          />
        </div>
        <div className="inputBox">
          <p className="inputText">Frame size:</p>
          <input
            className="input"
            type="number"
            name="frameSize"
            value={frameSize}
            onChange={this.onChangeInput}
          />
        </div>
        <div className="inputBox">
          <p className="inputText">Image width:</p>
          <input
            className="input"
            type="number"
            name="itemWidth"
            value={itemWidth}
            onChange={this.onChangeInput}
          />
        </div>
        <div className="inputBox">
          <p className="inputText">Animation duration:</p>
          <input
            className="input"
            type="number"
            name="animationDuration"
            value={animationDuration}
            onChange={this.onChangeInput}
          />
        </div>
        <div className="inputBox">
          <p className="inputText">Infinite calousel:</p>
          <input
            className="input"
            type="checkbox"
            name="infinite"
            checked={infinite}
            onChange={this.onChangeInput}
          />
        </div>
      </div>
    );
  }
}

export default СarouselSettings;
