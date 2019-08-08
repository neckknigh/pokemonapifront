import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';

class CarrouselComponent extends Component<{}, {}> {
  public render() {
    return (
      <Carousel indicators={false}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://placeimg.com/1500/220/nature"
            alt="First slide"
          />

        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://placeimg.com/1500/220/nature"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://placeimg.com/1500/220/nature"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    )
  }
}

export default CarrouselComponent;
