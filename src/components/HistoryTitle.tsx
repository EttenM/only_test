import React from "react";
import style from "./style.module.scss";

type Props = {};

const HistoryTitle = (props: Props) => {
  return (
    <h1 className={style.history__title}>
      Исторические <br /> даты
    </h1>
  );
};

export default HistoryTitle;
