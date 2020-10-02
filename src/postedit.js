import React, { useState, useEffect } from "react";
import posState from "./mobxstate";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
const Postedit = observer((props) => {
  let editObj = {};
  useEffect(() => {
    let fromLocal = localStorage.getItem("state");
    if (fromLocal) {
      posState.fillPostData(JSON.parse(fromLocal));
      console.log("filling :", fromLocal);
    }
  }, []);
  let mobxData = toJS(posState.postdata);
  let currentIndex = props.location.id;
  if (!currentIndex) {
    currentIndex = props.location.pathname.split("/")[2];
  }
  if (mobxData && mobxData.length > 0) {
    console.log("mobx data :", mobxData, currentIndex);
    editObj = mobxData[currentIndex] || {};
    handleRefresh(mobxData);
  }
  console.log(editObj);
  return (
    <div>
      <label>
        Title:
        <input
          type="text"
          name="name"
          value={editObj.title || ""}
          onChange={(e) => {
            editObj.title = e.target.value;

            posState.updateOneItem(currentIndex, editObj);
          }}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          name="name"
          value={editObj.body || ""}
          onChange={(e) => {
            editObj.body = e.target.value;

            posState.updateOneItem(currentIndex, editObj);
          }}
        />
      </label>
      <button
        onClick={() => {
          let persist = mobxData;
          persist.length &&
            localStorage.setItem("state", JSON.stringify(persist));
        }}
      >
        <Link to="/">SAVE</Link>
      </button>
    </div>
  );
});
const handleRefresh = (data) => {
  let persist = data;
  window.addEventListener(
    "beforeunload",
    () => {
      console.log(persist);
      persist.length && localStorage.setItem("state", JSON.stringify(persist));
    },
    false
  );
};

export default Postedit;
