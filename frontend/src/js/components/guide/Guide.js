import React from "react";

export default function Guide(props) {
  return (
    <div>
      <h1 className=" colorGold textAlignCenter">READY, SET, BUILD!</h1>
      <div className="guideBlock">
        <div className="guide_left">
          <img
            src="https://www.themvp.in/image/mvp-home/hiw-step-1.png"
            alt=""
          />
        </div>
        <div className="guide_right">
          <p>
            Here we will help you to build you you own pc. from the left hand
            side select from top to bottom parts in sequence. we will calculate
            sum of amount of the products you have selected
          </p>
        </div>
      </div>
      <div className="textAlignCenter">
        <button className="loadmore" onClick={props.setstep}>
          Get Started &gt;&gt;
        </button>
      </div>
    </div>
  );
}
