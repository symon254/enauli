import api from "../utils/api";

export const getVehicles = {
  state: {
    vehicles: [],
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
        vehicles: payload?.data,
        totalCount: payload?.count ? payload?.count : payload?.data.length,
      };
    },
    FAIL: (state, payload) => {
      return {
        loading: false,
        error: payload,
        vehicles: null,
      };
    },
  },
  effects: (dispatch) => {
    const { getVehicles } = dispatch;
    return {
      async Get(params) {
        try {
          this.REQUEST();

          const { data } = await api.get(
            `/fleet?saccoId=${params.saccoId}&page=${params.page}&pageSize=${params.pageSize}`
          );

          this.SUCCESS(data);
        } catch (error) {
          this.FAIL(error);
        }
      },
    };
  },
};

export const addVehicle = {
  state: {
    vehicles: {},
    loading: false,
    error: undefined,
    success: undefined,
  },
  reducers: {
    REQUEST: (state, payload) => {
      return {
        loading: true,
      };
    },
    SUCCESS: (state, payload) => {
      return {
        loading: false,
        vehicles: payload?.data,
        success: payload.message.includes("successfully")
          ? payload.message
          : null,
      };
    },
    FAIL: (state, payload) => {
      return {
        loading: false,
        vehicles: null,
        error: payload.response
          ? payload.response.data?.message
          : payload.message,
      };
    },
    RESET: () => {
      return {
        vehicles: {},
      };
    },
  },
  effects: (dispatch) => {
    const { addVehicle } = dispatch;
    return {
      async Add(formData) {
        try {
          this.REQUEST();

          const { data } = await api.post(`/fleet/addVehicle`, formData);

          this.SUCCESS(data);
        } catch (error) {
          this.FAIL(error);
        }
      },
    };
  },
};

export const updateVehicle = {
  state: {
    vehicles: {},
    loading: false,
    error: undefined,
    success: undefined,
  },
  reducers: {
    REQUEST: (state, payload) => {
      return {
        loading: true,
      };
    },
    SUCCESS: (state, payload) => {
      return {
        loading: false,
        vehicles: payload?.data,
        success: payload.message.includes("successfully")
          ? payload.message
          : null,
      };
    },
    FAIL: (state, payload) => {
      return {
        loading: false,
        vehicles: null,
        error: payload.response
          ? payload.response.data?.message
          : payload.message,
      };
    },
    RESET: () => {
      return {
        vehicles: {},
      };
    },
  },
  effects: (dispatch) => {
    const { updateVehicle } = dispatch;
    return {
      async Update(params) {
        try {
          this.REQUEST();

          const formData = {
            saccoId: params.saccoId,
            plateNumber: params.plateNumber,
            seatingCapacity: params.seatingCapacity,
          };

          const { data } = await api.put(
            `/fleet/${params.vehicleId}`,
            formData
          );

          this.SUCCESS(data);
        } catch (error) {
          this.FAIL(error);
        }
      },
    };
  },
};

export const vehicleStatus = {
  state: {
    status: {},
    loading: false,
    error: undefined,
    success: undefined,
  },
  reducers: {
    REQUEST: (state, payload) => {
      return {
        loading: true,
      };
    },
    SUCCESS: (state, payload) => {
      return {
        loading: false,
        status: payload?.data,
        success: payload.message.includes("successfully")
          ? payload.message
          : null,
      };
    },
    FAIL: (state, payload) => {
      return {
        loading: false,
        status: null,
        error: payload.response
          ? payload.response.data?.message
          : payload.message,
      };
    },
    RESET: () => {
      return {
        status: {},
      };
    },
  },
  effects: (dispatch) => {
    const { vehicleStatus } = dispatch;
    return {
      async UpdateStatus(params) {
        try {
          this.REQUEST();

          const formData = {
            status: params.status,
          };

          const { data } = await api.put(
            `/fleet/${params.vehicleId}/status`,
            formData
          );

          this.SUCCESS(data);
        } catch (error) {
          this.FAIL(error);
        }
      },
    };
  },
};
