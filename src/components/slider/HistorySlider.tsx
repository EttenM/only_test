import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/scss";
import style from "./style.module.scss";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Event, HistoryData } from "@/types/history.types";
import MobileNav from "./MobileNav";

type Props = {
  currentDateEvents: Event[];
  data: HistoryData[];
  setCurrentSlideID: (id: string) => void;
  currentSlideID: string;
};

const HistorySlider = ({
  currentDateEvents,
  data,
  currentSlideID,
  setCurrentSlideID,
}: Props) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const handleNextSlide = () => {
    const nextSlideId = +currentSlideID + 1;
    setCurrentSlideID(nextSlideId.toString());
    console.log(currentSlideID);
  };
  const handlePrevSlide = () => {
    const prevSlideId = +currentSlideID - 1;
    setCurrentSlideID(prevSlideId.toString());
  };

  return (
    <div className={style.slider__container}>
      <div className={style.slider__container_navigation}>
        <div className={style.slider__container_navigation_wrapper}>
          <div className={style.slider__navigation_slides}>
            <span className={style.currentSlide}>0{currentSlideID}/</span>
            <span className={style.totalSlide}>0{data?.length}</span>
          </div>
          <div className={style.slider__buttons_wraper}>
            <button
              className={style.slider__button_prev}
              onClick={handlePrevSlide}
              disabled={currentSlideID === "1"}
            >
              <ChevronLeft />
            </button>
            <button
              className={style.slider__button_next}
              onClick={handleNextSlide}
              disabled={+currentSlideID === data?.length}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
        <MobileNav
          data={data}
          setCurrentSlideID={setCurrentSlideID}
          currentSlideID={currentSlideID}
        />
      </div>
      <div className={style.swiper__container}>
        <Swiper
          className={style.mySwiper}
          grabCursor={true}
          slidesPerView={"auto"}
          freeMode={true}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper: any) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          modules={[FreeMode, Navigation]}
        >
          <div className={style.swiper__custom_wrapper}>
            {currentDateEvents &&
              currentDateEvents.map((event) => (
                <SwiperSlide key={event.year}>
                  <div className={style.swiper__slide_inner}>
                    <h5 className={style.swiper__slide_title}>{event.year}</h5>
                    <p className={style.swiper__slide_text}>
                      {event.description}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
          </div>
        </Swiper>
        <button className={style.swiper__button_prev} ref={prevRef}>
          <ChevronLeft />
        </button>
        <button className={style.swiper__button_next} ref={nextRef}>
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default HistorySlider;
