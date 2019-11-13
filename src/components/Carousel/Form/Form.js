import React, { Component } from 'react';
import './Form.css';
import imagesArr from '../img/img';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgSize: 100,
      step: 3,
      frameLength: 3,
      speed: 1000,
      finite: false,
    };
  }

  lengthChange = (event) => {
    event.preventDefault();
    this.setState({
      frameLength: event.target.value,
    });
    this.props.changer('frameLength', event.target.value);
  }

  stepChange = (event) => {
    event.preventDefault();
    this.setState({
      step: event.target.value,
    });
    this.props.changer('step', event.target.value);
  }

  speedChange = (event) => {
    event.preventDefault();
    this.setState({
      speed: event.target.value,
    });
    this.props.changer('speed', event.target.value);
  }

  imgSizeChange = (event) => {
    event.preventDefault();
    this.setState({
      imgSize: event.target.value,
    });
    this.props.changer('imgSize', event.target.value);
  }

  finiteChange = (event) => {
    this.setState({
      finite: event.target.checked,
    });
    this.props.changer('finite', event.target.checked);
  }

  render() {
    return (
      <form className="carousel__settings settings" method="POST" action="#">
        <label className="settings__label">
      Select slider length:
          <select className="settings__select" value={this.state.frameLength} onChange={this.lengthChange}>
            {imagesArr.map((img, i) => (
              <option key={img} value={i + 1}>{i + 1}</option>
            ))}
          </select>
      Slider length is
          {' '}
          {this.state.frameLength}
          {' '}
now
        </label>
        <label className="settings__label">
      Select slider step:
          <select className="settings__select" value={this.state.step} onChange={this.stepChange}>
            {imagesArr.map((img, i) => (
              i < this.state.frameLength
                ? <option key={img} value={i + 1}>{i + 1}</option>
                : null
            ))}
          </select>
      Slider step is
          {' '}
          {this.state.step}
          {' '}
now
        </label>
        <label className="settings__label">
      Select slider speed:
          <input className="settings__input" type="range" min="1000" max="2000" step="100" value={this.state.speed} onChange={this.speedChange} />
      Slider speed is
          {' '}
          {this.state.speed}
          {' '}
now
        </label>
        <label className="settings__label">
          <span>Select images size:</span>
          <input className="settings__input" type="range" min="80" max="260" step="10" value={this.state.imgSize} onChange={this.imgSizeChange} />
          <span>
Images size is
            {this.state.imgSize}
            {' '}
now
          </span>
        </label>
        <label className="settings__label settings__label_check">
          <span>Is finite?</span>
          <input className="settings__input settings__input_check" type="checkbox" onChange={this.finiteChange} />
        </label>
      </form>
    );
  }
}

export default Form;
