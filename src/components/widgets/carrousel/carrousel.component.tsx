import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';

class CarrouselComponent extends Component<{}, {}> {
  public render() {
    return (
      <Carousel indicators={false}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/1500x220.png"
            alt="First slide"
          />

        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/1500x220.png"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/1500x220.png"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    )
  }
}

export default CarrouselComponent;
