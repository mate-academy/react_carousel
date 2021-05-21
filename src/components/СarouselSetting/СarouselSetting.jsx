import React from 'react';
import './СarouselSetting.scss';
import PropTypes from 'prop-types';
import Carousel from '../Сarousel/Carousel';

class CarouselSetting extends React.Component {
  state = {
    itemWidth: 130,
    frameSize: 3,
    step: 3,
    animationDuration: 1000,
    infinite: false,
  }

  formList = [
    {
      id: 'itemWidth', min: 0, max: 500,
    },
    {
      id: 'frameSize', min: 1, max: 5,
    },
    {
      id: 'step', min: 1, max: 5,
    },
    {
      id: 'animationDuration', min: 1000, max: 10000,
    },
  ]

  changeSet(event) {
    if (event.target.id === 'infinite') {
      this.setState({ [event.target.id]: event.target.checked });
    } else {
      this.setState({ [event.target.id]: Number(event.target.value) });
    }
  }

  render() {
    return (
      <div className="app">
        <Carousel {...this.state} roots={this.props.roots} />
        <form action="get" className="form">
          {this.formList.map(({ id, min, max }) => (
            <label htmlFor={id} className="label" key={id}>
              <span>
                {id}
                {' '}
                :
              </span>
              <input
                className="input"
                type="number"
                id={id}
                defaultValue={this.state[id]}
                min={min}
                max={max}
                onChange={event => this.changeSet(event)}
              />
            </label>
          ))}
          <label htmlFor="infinite" className="label">
            infinite :
            <input
              className="input"
              type="checkbox"
              id="infinite"
              onChange={event => this.changeSet(event)}
            />
          </label>
        </form>
      </div>
    );
  }
}

CarouselSetting.propTypes = {
  roots: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CarouselSetting;
