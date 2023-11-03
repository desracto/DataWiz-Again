import React from 'react';
import '@ionic/core';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

//Image Imports
import SchemaSelectionLogoImage from '../../../assets/images/Schema-Selection-2.png';
import QueryAnimationLogoImage from '../../../assets/images/Animation.png';
import SavedQueryAnimationLogoImage from '../../../assets/images/Saved-Animations.png';

import  './LCarousel.css';

function LCarousel() {
  return (
    <>
    <div className="container">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        <SwiperSlide>
          <div className="SchemaSelectionFeatureCard">
              <img 
                  src={SchemaSelectionLogoImage} 
                  alt="SchemanSelection" 
                  className="SchemaSelectionImage" 
              />
              <div className="SchemaSelectionFeatureCardTitle">
                  Schema Selection
              </div>
              <div className="SchemaSelectionFeatureCardText">
                  Embark on your SQL learning adventure by choosing from a diverse
                  set of schemas. Craft your query, and witness the magic as
                  DataWiz animates the intricate steps taken within the database
                  to reach the final result. Select, query, animate, and grasp SQL
                  concepts visually and interactively.
              </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="QueryAnimationFeatureCard">
              <img 
                  src={QueryAnimationLogoImage} 
                  alt="QueryAnimation" 
                  className="QueryAnimationImage" 
              />
              <div className="QueryAnimationFeatureCardTitle">
                  Query Animation
              </div>
              <div className="QueryAnimationFeatureCardText">
                  Explore the intricate steps behind SQL queries with our Query Animation. 
                  Select from a range of schemas, craft your query, and witness a 
                  captivating animation that unveils how the database processes your query 
                  to derive the final result. An interactive and visual learning experience 
                  like never before.
              </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="SavedQueryAnimationFeatureCard">
              <img 
                  src={SavedQueryAnimationLogoImage} 
                  alt="SavedQueryAnimation" 
                  className="SavedQueryAnimationImage" 
              />
              <div className="SavedQueryAnimationFeatureCardTitle">
                  Saved Query Animations
              </div>
              <div className="SavedQueryAnimationFeatureCardText">
                  Never lose your valuable query animations with our efficient saving 
                  system. Access and manage all your previously animated queries in one 
                  organized location. Re-view and analyze previous animations, and if 
                  any adjustments or updates, editing is just a click away. Once 
                  satisfied, re-save or download the animation for your records.
              </div>
          </div>
        </SwiperSlide>

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
    </>
  );
}

export default LCarousel;
