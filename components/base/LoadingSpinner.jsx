import React from "react";

import style from "../../styles/loadingSpinner.module.css";

export default function LoadingSpinner() {
  return (
    <div className={style["spinner-container"]}>
      <div className={style["loading-spinner"]}></div>
    </div>
  );
}
