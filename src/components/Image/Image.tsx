import React from 'react';

type Props = {
  image: string,
  itemWidth: number,
};

export class Image extends React.Component<Props, {}> {
  alt = this.props.image.replace(/[^0-9]/g, '');

  render() {
    const { image, itemWidth } = this.props;

    return (
      <img
        src={image}
        style={{ width: `${itemWidth}px` }}
        alt={`${this.alt}`}
      />
    );
  }
}
