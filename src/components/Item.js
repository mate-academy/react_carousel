import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './Item.scss';

class Item extends PureComponent {
  render() {
    const { imageSrc, itemWidth } = this.props;

    return (
      <li className="carousel__item">
        <img
          className="carousel__img"
          src={imageSrc}
          style={{ width: `${itemWidth}px` }}
          alt={imageSrc.replace(/(^\.\/img\/|\.png$)/g, '')}
        />
      </li>
    );
  }
}

Item.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  itemWidth: PropTypes.number.isRequired,
};

export default Item;
