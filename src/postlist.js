import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import posState from "./mobxstate";
import { observer } from "mobx-react";
const Postlist = observer(() => {
  useEffect(() => {
    let fromLocal = localStorage.getItem("state");
    if (fromLocal) {
      posState.fillPostData(JSON.parse(fromLocal));
    } else {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((data) => data.json())
        .then((jsondata) => {
          posState.fillPostData(jsondata);
          console.log(jsondata);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, []);
  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>USERID</th>
            <th>TITLE</th>
            <th>BODY</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>{renderPostData()}</tbody>
      </table>
    </div>
  );
});

function renderPostData() {
  return posState.postdata.map((post, index) => {
    const { id, userId, title, body } = post;
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{userId}</td>
        <td>{title}</td>
        <td>{body}</td>
        <td>
          <Link
            to={{
              pathname: `/postedit/${index}`,
              id: index,
            }}
          >
            Edit
          </Link>
        </td>
      </tr>
    );
  });
}

export default Postlist;
