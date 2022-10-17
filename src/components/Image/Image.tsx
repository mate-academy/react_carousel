import React from 'react';

type Props = {
  image: string,
  itemWidth: number,
};

export class Image extends React.Component<Props, {}> {
  alt = parseInt(this.props.image, 10);

  render() {
    const { image, itemWidth } = this.props;

    return (
      <img
        src={image}
        style={{ width: itemWidth }}
        alt={`${this.alt}`}
      />
    );
  }
}
