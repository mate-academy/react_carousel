/* eslint-disable no-param-reassign */
import React from 'react';

import Carousel from './Carousel';
import './CarouselSetting.scss';

export class CarouselSetting extends React.Component {
  state = {
    images: [
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
    step: 3,
    frameSize: 3,
    itemWidth: 130,
    animationDuration: 1000,
    infinite: false,
    indexFrame: 0,
  };

  setNewIndex = (index) => {
    this.setState({
      indexFrame: index,
    });
  }

  validUrl = (str) => {
    // eslint-disable-next-line max-len
    const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

    if (regexp.test(str)) {
      return true;
    }

    return false;
  }

  handleAddImages = (event) => {
    const newImage = event.target.parentNode.previousSibling.children[0];

    if (this.validUrl(newImage.value)) {
      const updateImages = [...this.state.images, newImage.value];

      this.setState({
        images: [...updateImages],
      });
    }

    this.validUrl(newImage.value)
      ? newImage.className = ''
      : newImage.className = 'not-valid-url';
  }

  handleGetValue = (event, item) => {
    this.setState({
      [item]: Number(event.target.value),
    });
  }

  handleChecked = (event) => {
    this.setState({
      infinite: !!event.target.value,
    });
  }

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
      indexFrame,
    } = this.state;

    return (
      <>
        <Carousel
          images={images}
          step={step}
          frameSize={frameSize}
          itemWidth={itemWidth}
          animationDuration={animationDuration}
          infinite={infinite}
          indexFrame={indexFrame}
          setNewIndex={this.setNewIndex}
        />

        <div className="CarouselSetting">
          <form>
            <table>
              <tbody>
                <tr>
                  <td>
                    Image
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="image"
                      // eslint-disable-next-line no-return-assign
                      onFocus={event => event.target.value = ''}
                    />
                  </td>
                  <td>
                    <input
                      type="button"
                      value="+"
                      onClick={this.handleAddImages}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Step</td>
                  <td>
                    <input
                      name="step"
                      type="range"
                      value={step}
                      step="1"
                      min="1"
                      max={images.length}
                      onChange={event => this.handleGetValue(event, 'step')}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Frame size</td>
                  <td>
                    <input
                      name="frameSize"
                      type="range"
                      value={frameSize}
                      min="1"
                      max="9"
                      onChange={
                        event => this.handleGetValue(event, 'frameSize')
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td>Item width</td>
                  <td>
                    <input
                      name="width"
                      type="range"
                      value={itemWidth}
                      min="130"
                      max="260"
                      step="130"
                      onChange={
                        event => this.handleGetValue(event, 'itemWidth')
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td>Animation duration</td>
                  <td>
                    <input
                      name="animation"
                      type="range"
                      min="100"
                      max="2000"
                      step="100"
                      value={animationDuration}
                      onChange={
                        event => this.handleGetValue(event, 'animationDuration')
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <td>Infinite</td>
                  <td>
                    <label>
                      <input
                        type="checkbox"
                        value="false"
                        onClick={this.handleChecked}
                      />
                      True
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </>
    );
  }
}
