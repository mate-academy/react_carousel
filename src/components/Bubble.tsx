import { Component } from 'react';

export class Bubble extends Component<{}, {}> {
  state = {
    arr: new Array(20).fill(0),
  };

  render() {
    return (
      <>
        { /* eslint-disable-next-line */ }
        {this.state.arr.map((_undefined, i) => <div key={i} className="bubble" />)}
      </>
    );
  }
}
