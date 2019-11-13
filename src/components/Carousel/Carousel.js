import React, { Component } from 'react';
import './Carousel.css';
import imagesArr from './img/img';
import Form from './Form/Form';

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: imagesArr.length,
      imgSize: 100,
      step: 3,
      frameLength: 3,
      speed: 1000,
      listPosition: 0,
      imgArr: imagesArr,
      finite: false,
    };
    this.counter = 0;
    this.booster = this.state.listPosition / 10;
  }

  updateState = () => {
    this.setState((prev) => {
      this.counter = 0;
      this.booster = this.state.listPosition / 10;
      if (prev.frameLength > 5) {
        return {
          imgArr: [...imagesArr, ...imagesArr],
          finishPosition: prev.imgSize * (prev.amount * 2 - prev.frameLength),
          listPosition: 0,
        };
      }

      return {
        imgArr: imagesArr,
        finishPosition: prev.imgSize * (prev.amount - prev.frameLength),
        listPosition: 0,
      };
    });
  }

  componentDidMount() {
    this.setState((prev) => {
      if (prev.frameLength > 5) {
        return {
          imgArr: [...imagesArr, ...imagesArr],
          finishPosition: prev.imgSize * (prev.amount * 2 - prev.frameLength),
        };
      }

      return {
        finishPosition: prev.imgSize * (prev.amount - prev.frameLength),
      };
    });
  }

  changer = (name, value) => {
    this.setState({
      [name]: value,
    });
    this.updateState();
  }

  createList = () => (
    <ul className="carousel__list" style={{ left: `${-this.state.listPosition}px` }}>
      {this.state.imgArr.map((img, i) => (
        <li className="carousel__item" style={{ width: `${this.state.imgSize}px` }}><img src={img} alt={i + 1} /></li>
      ))}
    </ul>
  )

  slideRight = () => {
    const animation = setInterval(() => {
      this.setState((prev) => {
        if (prev.listPosition
          === prev.finishPosition) {
          if (this.state.finite === true) {
            clearInterval(animation);
            this.booster = 0;
            this.counter = 0;

            return {
              listPosition: prev.finishPosition,
            };
          }

          const newArr = [...prev.imgArr];

          newArr.push(
            ...newArr.filter((img, i) => i < prev.step)
          );
          newArr.splice(0, prev.step);

          return {
            imgArr: newArr,
            listPosition: prev.listPosition - prev.imgSize * prev.step,
          };
        }

        if (this.booster % (prev.imgSize / 10 * prev.step) === 0 && this.counter !== 0) {
          clearInterval(animation);
          this.counter = 0;
        } else {
          this.counter++;
          this.booster++;

          return { listPosition: prev.listPosition += 10 };
        }
      });
    }, 10 - ((this.state.speed - 1000) / 100));
  }

  slideLeft = () => {
    const animation = setInterval(() => {
      this.setState((prev) => {
        if (prev.listPosition
        === 0) {
          if (this.state.finite === true) {
            clearInterval(animation);
            this.booster = 0;
            this.counter = 0;

            return {
              listPosition: 0,
            };
          }

          const newArr = [...prev.imgArr];

          newArr.unshift(
            ...newArr.filter((img, i) => i + 1 > newArr.length - prev.step)
          );
          newArr.splice(newArr.length - prev.step, prev.step);

          return {
            imgArr: newArr,
            listPosition: prev.listPosition + prev.imgSize * prev.step,
          };
        }

        if (this.booster % (prev.imgSize / 10 * prev.step) === 0 && this.counter !== 0) {
          clearInterval(animation);
          this.counter = 0;
        } else {
          this.counter++;
          this.booster++;

          return { listPosition: prev.listPosition -= 10 };
        }
      });
    }, 10 - ((this.state.speed - 1000) / 100));
  }

  render() {
    return (
      <>
        <div className="carousel">
          <button type="button" className="carousel__button carousel__button_prev" onClick={this.slideLeft} />
          <div
            className="carousel__slide-wrapper"
            style={{
              width: `${this.state.imgSize * this.state.frameLength}px`,
              height: `${this.state.imgSize}px`,
            }}
          >
            {this.createList()}
          </div>
          <button type="button" className="carousel__button carousel__button_next" onClick={this.slideRight} />
        </div>
        <Form changer={this.changer} />
      </>
    );
  }
}

export default Carousel;
