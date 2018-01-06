import React, { Component } from 'react';
import { Carousel } from 'antd'

const carouselImage1 = require('../images/carouselImage1.jpg');
const carouselImage2 = require('../images/carouselImage2.jpg');
const carouselImage3 = require('../images/carouselImage3.jpg');
const carouselImage4 = require('../images/carouselImage4.jpg');

class Carousels extends Component {
    render() {
        return (
            <Carousel autoplay className="caro">
                <div
                    style={{ background: "rgb(254, 206, 20)" }}
                ><img src={carouselImage1} /></div>
                <div
                    style={{ background: "rgb(37, 33, 94)" }}
                ><img src={carouselImage2} /></div>
                <div
                    style={{ background: "rgb(71, 80, 89)" }}
                ><img src={carouselImage3} /></div>
                <div
                    style={{ background: "rgb(1, 198, 217)" }}
                ><img src={carouselImage4} /></div>
            </Carousel>
        );
    }
}

export default Carousels;
