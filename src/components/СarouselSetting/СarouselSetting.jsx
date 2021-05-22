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
  };

  formList = [
    {
      id: 'itemWidth',
    },
    {
      id: 'frameSize',
    },
    {
      id: 'step',
    },
    {
      id: 'animationDuration',
    },
  ];

  changeSetting(event) {
    const { id, checked, value, type } = event.target;
    const { infinite } = this.state;

    if (type !== 'checkbox' && infinite) {
      alert("You can't change setting when infinite checked");

      return;
    }

    switch (id) {
      case 'itemWidth':
        if (value < 0 || value > 500) {
          alert('max 500, min 0');

          return;
        }

        break;

      case 'frameSize':
      case 'step':
        if (value > 5) {
          alert('max 5');

          return;
        }

        break;

      default:
    }

    if (event.target.id === 'infinite') {
      this.setState({ [id]: checked });
    } else {
      this.setState({ [id]: Number(value) });
    }
  }

  render() {
    return (
      <div className="app">
        <Carousel {...this.state} roots={this.props.roots} />
        <form action="get" className="form">
          {this.formList.map(({ id }) => (
            <label htmlFor={id} className="label" key={id}>
              <span>
                {id}
                :
              </span>
              <input
                className="input"
                id={id}
                type="number"
                value={this.state[id] === 0 ? '' : this.state[id]}
                onChange={event => this.changeSetting(event)}
              />
            </label>
          ))}
          <label htmlFor="infinite" className="label">
            infinite :
            <input
              className="input"
              type="checkbox"
              id="infinite"
              onChange={event => this.changeSetting(event)}
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
