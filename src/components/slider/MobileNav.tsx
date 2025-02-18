import React from "react";
import style from "./style.module.scss";
import { HistoryData } from "@/types/history.types";

type Props = {
  data: HistoryData[];
  setCurrentSlideID: (id: string) => void;
  currentSlideID: string;
};

function MobileNav({ data, setCurrentSlideID, currentSlideID }: Props) {
  return (
    <div className={style.mobile__navigation}>
      {data &&
        data.map((event) => (
          <button
            key={event.id}
            className={`${style.mobile__navigation_dot} ${
              event.id === currentSlideID
                ? `${style.mobile__navigation_dot}-active`
                : ""
            }`}
            onClick={() => {
              setCurrentSlideID(event.id);
            }}
          ></button>
        ))}
    </div>
  );
}

export default MobileNav;
