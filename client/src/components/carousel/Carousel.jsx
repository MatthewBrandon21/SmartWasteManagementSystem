import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

import './carousel.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const SliderButton = styled.div`
      .slick-prev:before, .slick-next:before {
        font-size: 2rem;
        color: var(--main-color);
      }

      .slick-prev:before {
        margin-left: 0.1rem;
      }
      
      .slick-next:before {
        margin-left: -1rem;
      }
    `;

const settings = {
  infinite: true,
  autoplay: true,
  autoplaySpeed: 10000,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const Carousel = () => {

  return (
    <SliderButton>
      <div className="carousel-box">
        <Slider {...settings}>

          <div className="col-6">
            <div className='carousel-content'>
              <div className="carousel__iconn">
                <i className="bx bx-trash"></i>
              </div>
              <div className="carousel__infoo">
                <i className="bx bx-trash"></i>
                <h1>Anggrek3</h1>
                <br />
                <li>Id : 519</li>
                <li>Type : Organic</li>
                <li>Current weight : 5 kg</li>
                <li>Max capacity : 50 kg</li>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className='carousel-content'>
              <div className="carousel__iconn">
                <i className="bx bxs-trash"></i>
              </div>
              <div className="carousel__infoo">
                <i className="bx bxs-trash"></i>
                <h1>Anggrek3</h1>
                <br />
                <li>Id : 519</li>
                <li>Type : Organic</li>
                <li>Current weight : 5 kg</li>
                <li>Max capacity : 50 kg</li>
                <br />
                <li><b>[[READY]]</b></li>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className='carousel-content'>
              <div className="carousel__iconn">
                <i className="bx bx-trash"></i>
              </div>
              <div className="carousel__infoo">
                <i className="bx bx-trash"></i>
                <h1>Anggrek3</h1>
                <br />
                <li>Id : 519</li>
                <li>Type : Organic</li>
                <li>Current weight : 5 kg</li>
                <li>Max capacity : 50 kg</li>
              </div>
            </div>
          </div>

        </Slider>
      </div>
    </SliderButton>
  )
}

export default Carousel