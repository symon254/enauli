import api from "../utils/api";
import { setStorageData } from "../utils/Storage";

export const AuthLogin = {
  state: {},
  reducers: {
    USER_LOGIN_REQUEST: (state, payload) => {
      return {
        loading: true,
      };
    },
    USER_LOGIN_SUCCESS(state, payload) {
      return {
        loading: false,
        userInfo: payload,
      };
    },
    USER_LOGIN_FAIL: (state, payload) => {
      return {
        loading: false,
        error: payload.response
          ? payload.response.data?.message
          : payload.message,
      };
    },
    USER_LOGOUT: (state, payload) => {
      return {};
    },
  },
  effects: (dispatch) => {
    const { AuthLogin } = dispatch;
    return {
      async login(formData) {
        try {
          AuthLogin.USER_LOGIN_REQUEST();

          const { data } = await api.post(`/auth/agentSignIn`, formData);
          const dataItem = data.data[0];

          if (data?.success) {
            setStorageData("userInfo", data);
            setStorageData("name", dataItem.name);
            setStorageData("userId", dataItem.userId);

            AuthLogin.USER_LOGIN_SUCCESS(data);
          } else {
            dispatch.AuthLogout.logout();
          }
        } catch (error) {
          AuthLogin.USER_LOGIN_FAIL(error);
        }
      },
    };
  },
};

export const AuthSaccos = {
  state: {
    Saccos: [],
    totalCount: 0,
    error: undefined,
    loading: false,
  },
  reducers: {
    REQUEST: (state, payload) => {
      return {
        ...state,
        loading: true,
      };
    },
    SUCCESS: (state, payload) => {
      return {
        loading: false,
        Saccos: payload?.data,
        totalCount: payload?.count ? payload?.count : payload?.data.length,
      };
    },
    FAIL: (state, payload) => {
      return {
        loading: false,
        Saccos: null,
        error: payload.response
          ? payload.response.data?.message
          : payload.message,
      };
    },
  },
  effects: (dispatch) => {
    return {
      async getSaccos(params) {
        if (params.userId) {
          try {
            this.REQUEST();
            const { data } = await api.get(`/auth/${params.userId}/saccos`);

            this.SUCCESS(data);
            Promise.resolve(data);
          } catch (error) {
            this.FAIL(error);
          }
        }
      },
    };
  },
};

export const AuthLogout = {
  state: {},
  reducers: {
    USER_LOGOUT: (state, payload) => {
      return {
        userInfo: payload,
      };
    },
  },
  effects: (dispatch) => {
    const { AuthLogout } = dispatch;
    return {
      async logout() {
        document.location.href = "/login";
        localStorage.clear();
        AuthLogout.USER_LOGOUT({});
      },
    };
  },
};
