import style from "./style.module.scss";
import HistoryTitle from "./HistoryTitle";
import DateLine from "./date-line/DateLine";
import { useEffect, useRef, useState } from "react";
import HistorySlider from "./slider/HistorySlider";
import { Event, HistoryData } from "@/types/history.types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type Props = {};

const HistoryLayout = (props: Props) => {
  const [data, setData] = useState<HistoryData[]>();
  const [currentDate, setCurrentDate] = useState<HistoryData>();
  const [currentDateEvents, setcurrentDateEvents] = useState<Event[]>();
  const [currentSlideID, setCurrentSlideID] = useState("1");
  const tlRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:3030/history-data")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setCurrentDate(data[0]);
        setcurrentDateEvents(data[0].event);
      });
  }, []);

  useGSAP(() => {
    tlRef.current = gsap.timeline({});

    if (data?.length > 0) {
      const result = data.find(({ id }) => id === currentSlideID);
      setCurrentDate(result);
      tlRef.current
        .to(".swiper-wrapper", {
          duration: 0.75,
          opacity: 0,
          onComplete: () => {
            setcurrentDateEvents(result.event);
          },
        })
        .to(".swiper-wrapper", {
          duration: 1,
          opacity: 1,
          y: 0,
        });
    }
  }, [currentSlideID]);

  return (
    <section className={style.history__layout}>
      <HistoryTitle />
      <DateLine
        data={data}
        setCurrentSlideID={setCurrentSlideID}
        currentSlideID={currentSlideID}
        currentDate={currentDate}
      />
      <HistorySlider
        currentDateEvents={currentDateEvents}
        data={data}
        setCurrentSlideID={setCurrentSlideID}
        currentSlideID={currentSlideID}
      />
    </section>
  );
};

export default HistoryLayout;
