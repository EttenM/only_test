import React, { useEffect, useRef, useState } from "react";
import style from "./style.module.scss";
import { HistoryData } from "@/types/history.types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { animateNumberChange } from "@/service/animateNumberChange";

type Props = {
  data: HistoryData[];
  setCurrentSlideID: (id: string) => void;
  currentDate: HistoryData;
  currentSlideID: string;
};

const DateLine = ({
  data,
  setCurrentSlideID,
  currentDate,
  currentSlideID,
}: Props) => {
  const circleRef = useRef(null);
  const tlRef = useRef(null);
  const [dotsTotal, setDotsTotal] = useState(2);
  const dateFromRef = useRef(null);
  const dateToRef = useRef(null);

  const RADIUS = 265; // Радиус круга

  useGSAP(() => {
    const TARGET_ANGLE = 375 / dotsTotal;
    const dots = gsap.utils.toArray(".dot");
    if (!dots) return;

    const angleStep = 360 / dotsTotal;

    const baseAngle = TARGET_ANGLE - +currentSlideID * angleStep;
    if (data?.length > 0) {
      gsap.to(circleRef.current, {
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.1,
        rotate: baseAngle,
      });
      gsap.to(dots, {
        duration: 0.4,
        ease: "power2.inOut",
        rotate: -baseAngle,
      });
    }
  }, [currentSlideID]);

  useEffect(() => {
    if (data?.length > 0) {
      const container = document.querySelector<HTMLElement>(".circle");
      const dotsCount = container.querySelectorAll("button").length;
      setDotsTotal(dotsCount);
      container.style.setProperty("--dots-count", dotsCount.toString());
    }
  }, [data]);
  useEffect(() => {
    if (currentDate) {
      animateNumberChange(dateFromRef.current, currentDate.date_from, 750);
      animateNumberChange(dateToRef.current, currentDate.date_to, 750);
    }
  }, [currentDate]);

  return (
    <div className={style.dateLine}>
      <div className={style.text_wrapper}>
        <h2 className={style.date__from} ref={dateFromRef}></h2>
        <h2 className={style.date__to} ref={dateToRef}></h2>
      </div>
      <hr className={style.hr} />
      <div className={`circle ${style.circle}`} ref={circleRef}>
        {data &&
          data.map((event) => (
            <>
              <button
                key={event.id}
                className={`dot ${style.dot} ${
                  event.id === currentSlideID ? `${style.dot}-active` : ""
                }`}
                onClick={() => {
                  setCurrentSlideID(event.id);
                }}
                data-id={event.id}
              >
                <span id="dot_text" className={`dot_text ${style.dot_text}`}>
                  {event.title}
                </span>
              </button>
            </>
          ))}
      </div>
    </div>
  );
};

export default DateLine;
