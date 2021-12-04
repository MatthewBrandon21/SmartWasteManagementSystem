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

const Carousel = props => {

  return (
    <SliderButton>
      <div className="carousel-box">
        <Slider {...settings}>

          {
            props.data.map((item, index) => (
              <div className="col-6" key={index}>
                <div className='carousel-content'>
                  <div className="carousel__iconn">
                    <i className={item.tempat_sampah_isfull == true ? "bx bxs-trash" : "bx bx-trash"}></i>
                  </div>
                  <div className="carousel__infoo">
                    <i className={item.tempat_sampah_isfull == true ? "bx bxs-trash" : "bx bx-trash"}></i>
                    <h1>{item.tempat_sampah_name}</h1>
                    <br />
                    <li>Region : {item.tempat_sampah_region}</li>
                    <li>Type : {item.tempat_sampah_jenis}</li>
                    <li>Current weight : {item.tempat_sampah_current.tempat_sampah_currentcapacity} kg</li>
                    <li>Max capacity : {item.tempat_sampah_maxcapacity} kg</li>
                    <br />
                    {
                      item.tempat_sampah_isfull == true ? (
                        <li><b>[[READY]]</b></li>
                      ) : null
                    }
                  </div>
                </div>
              </div>
            ))
          }

        </Slider>
      </div>
    </SliderButton>
  )
}

export default Carousel