import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  TOKEN_KEY,
  acceptPayment,
  createNewRequest,
  deleteUrl,
  getFriendsRequest,
  getUserRequests,
  rejectRequestUrl,
} from "../constants/api";
import {
  getItemFromLocalStorage,
  showNotifications,
} from "../constants/helper";

const initialState = {
  loading: false,
  requests: [],
  error: null,
};

export const newRequestReducer = createAsyncThunk(
  "user/createRequest",
  async (body) => {
    const token = getItemFromLocalStorage(TOKEN_KEY);
    const user = await fetch(createNewRequest(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    return await user.json();
  }
);

export const getYourRequest = createAsyncThunk("user/userRequest", async () => {
  const token = getItemFromLocalStorage(TOKEN_KEY);
  const user = await fetch(getUserRequests(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await user.json();
});

export const getOtherRequest = createAsyncThunk(
  "user/otherRequest",
  async () => {
    const token = getItemFromLocalStorage(TOKEN_KEY);
    const user = await fetch(getFriendsRequest(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await user.json();
  }
);
export const deleteRequest = createAsyncThunk(
  "user/deleteRequest",
  async (id) => {
    const token = getItemFromLocalStorage(TOKEN_KEY);
    const user = await fetch(deleteUrl(id), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await user.json();
  }
);

export const rejectRequest = createAsyncThunk(
  "user/rejectRequest",
  async (id) => {
    const token = getItemFromLocalStorage(TOKEN_KEY);
    const user = await fetch(rejectRequestUrl(id), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await user.json();
  }
);

export const acceptPaymentRequest = createAsyncThunk(
  "user/acceptRequest",
  async (body) => {
    const token = getItemFromLocalStorage(TOKEN_KEY);
    const user = await fetch(acceptPayment(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    return await user.json();
  }
);

const paymentRequestSlice = createSlice({
  name: "paymentRequest",
  initialState,
  extraReducers: (builder) => {
    //--------------------------------------creating new payment request --------------------------------
    builder.addCase(newRequestReducer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(newRequestReducer.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.success) {
        state.error = null;
        showNotifications(
          true,
          "Request send succesfully",
          action.payload.message
        );
      } else {
        state.error = action.payload.error;
        showNotifications(false, action.payload.message, action.payload.error);
      }
    });
    builder.addCase(newRequestReducer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      showNotifications(false, "Unauthorised!!", action.error.message);
    });
    // -----------------------get All Request Created By User --------------------------------------
    builder.addCase(getYourRequest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getYourRequest.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.success) {
        state.requests = action.payload.data;
        state.error = null;
      } else {
        state.error = action.payload.error;
        showNotifications(false, action.payload.message, action.payload.error);
      }
    });
    builder.addCase(getYourRequest.rejected, (state, action) => {
      state.loading = false;
      state.requests = [];
      state.error = action.error.message;
      showNotifications(false, "Unauthorised!!", action.error.message);
    });
    // ----------------getRequestByOtherRequest-------------------------
    builder.addCase(getOtherRequest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOtherRequest.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.success) {
        state.requests = action.payload.data;
        state.error = null;
      } else {
        state.error = action.payload.error;
        showNotifications(false, action.payload.message, action.payload.error);
      }
    });
    builder.addCase(getOtherRequest.rejected, (state, action) => {
      state.loading = false;
      state.requests = [];
      state.error = action.error.message;
      showNotifications(false, "Unauthorised!!", action.error.message);
    });
    // ------------------------------delete request----------------------------
    builder.addCase(deleteRequest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteRequest.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.success) {
        state.requests = state.requests.filter(
          (request) => request._id !== action.payload.data._id
        );
        state.error = null;
        showNotifications(true, "Done!!", action.payload.message);
      } else {
        state.error = action.payload.error;
        showNotifications(false, action.payload.message, action.payload.error);
      }
    });
    builder.addCase(deleteRequest.rejected, (state, action) => {
      state.loading = false;
      state.requests = [];
      state.error = action.error.message;
      showNotifications(false, "Unauthorised!!", action.error.message);
    });
    // ----------------------reject request reducer--------------------------------
    builder.addCase(rejectRequest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(rejectRequest.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.success) {
        const filteredRequest = state.requests.filter(
          (request) => request.id == action.payload.data.id
        );
        const requestIndex = state.requests.indexOf(filteredRequest);
        state.requests[requestIndex] = action.payload.data;
        state.error = null;
        showNotifications(true, "Done!!", action.payload.message);
      } else {
        state.error = action.payload.error;
        showNotifications(false, action.payload.message, action.payload.error);
      }
    });
    builder.addCase(rejectRequest.rejected, (state, action) => {
      state.loading = false;
      state.requests = [];
      state.error = action.error.message;
      showNotifications(false, "Unauthorised!!", action.error.message);
    });
    // --------------------accept payment request ---------------------------------
    builder.addCase(acceptPaymentRequest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(acceptPaymentRequest.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.success) {
        state.requests = state.requests.filter(
          (request) => request._id !== action.payload.data._id
        );
        state.error = null;
        showNotifications(true, "Done!!", action.payload.message);
      } else {
        state.error = action.payload.error;
        showNotifications(false, action.payload.message, action.payload.error);
      }
    });
    builder.addCase(acceptPaymentRequest.rejected, (state, action) => {
      state.loading = false;
      state.requests = [];
      state.error = action.error.message;
      showNotifications(false, "Unauthorised!!", action.error.message);
    });
  },
});

export default paymentRequestSlice.reducer;
