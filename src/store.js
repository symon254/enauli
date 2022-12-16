import { init } from "@rematch/core";
import loadingPlugin from "@rematch/loading";
import { getStorageData } from "./utils/Storage";
import thunk from "redux-thunk";
import { models } from "./models";

const userInfoFromStorage = getStorageData("userInfo")
  ? getStorageData("userInfo")
  : null;

const initialState = {
  AuthLogin: { userInfo: userInfoFromStorage },
};

const store = init({
  global: true,
  models,
  plugins: [loadingPlugin({ type: "full" })],
  redux: {
    initialState: initialState,
    middlewares: [thunk],
  },
});

export default store;
