import { observable, configure, action } from "mobx";
configure({ enforceActions: true });
const postState = observable({
  postdata: [],

  fillPostData: action((posts) => {
    postState.postdata = posts;
  }),
  updateOneItem: action((index, obj) => {
    postState.postdata[index] = obj;
  }),
});

export default postState;
