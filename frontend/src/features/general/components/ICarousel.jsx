import React from 'react';
import '@ionic/core';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

//Image Imports
import CreateQuizzesLogoImage from '../../../assets/images/Create-Quizzes-Logo.png';
import AutoGradingLogoImage from '../../../assets/images/Auto-grading_Icon.png';
import SavedQuizzesLogoImage from '../../../assets/images/Saved-Quizzes.png';

import  './ICarousel.css';

function ICarousel() {
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
            <div className="CreateQuizzesFeatureCard">
                <img 
                    src={CreateQuizzesLogoImage} 
                    alt="CreateQuizzes" 
                    className="CreateQuizzesImage" 
                />
                <div className="CreateQuizzesFeatureCardTitle">
                        Create Quizzes
                </div>
                <div className="CreateQuizzesFeatureCardText">
                    Craft engaging quizzes effortlessly with our intuitive quiz creation 
                    tool. Add, edit, and structure quiz questions and solutions to tailor 
                    the learning experience. Leverage our "Configure Filters" 
                    feature to fine-tune the quiz, providing a personalized assessment 
                    that aligns with your teaching approach. 
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="AutoGradingFeatureCard">
                <img 
                    src={AutoGradingLogoImage} 
                    alt="AutoGrading" 
                    className="AutoGradingImage" 
                />
                <div className="AutoGradingFeatureCardTitle">
                        Auto-Grading
                </div>
                <div className="AutoGradingFeatureCardText">
                    Simplify the grading process with our Auto Grading feature. The 
                    system utilizes a relational algebra tree to accurately assess 
                    student answers against the instructor's solution. Instant feedback 
                    enhances the learning journey and enabling a deeper understanding of 
                    SQL concepts.
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="SavedQuizzesFeatureCard">
                <img 
                    src={SavedQuizzesLogoImage} 
                    alt="SavedQuizzes" 
                    className="SavedQuizzesImage" 
                />
                <div className="SavedQuizzesFeatureCardTitle">
                    Saved Quizzes
                </div>
                <div className="SavedQuizzesFeatureCardText">
                Manage all your quizzes in one convenient hub. Access, review, and 
                update quizzes with ease. Revisit questions and download quiz results 
                to improve the learning experience. Save time by having all your quizzes organized and accessible, enabling a 
                seamless teaching and assessment workflow.
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

export default ICarousel;
