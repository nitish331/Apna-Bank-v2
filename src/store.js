import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import paymentRequestReducer from "./reducers/paymentRequestSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    paymentRequests: paymentRequestReducer,
  },
});

export default store;
