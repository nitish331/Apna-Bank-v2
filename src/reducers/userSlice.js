import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  TOKEN_KEY,
  addMoneyToAccount,
  cardBlock,
  cardUnblock,
  createNewDeposit,
  findUserFromToken,
  getAllDeposits,
  getAllTransactions,
  getCVV,
  getUpdatedBalance,
  newCardRequest,
  sendMoneyToAccount,
  updateUserProfile,
  userLogin,
  userSignUp,
} from "../constants/api";
import {
  addItemToLocalStorage,
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  showNotifications,
} from "../constants/helper";

const initialState = {
  loading: false,
  user: {},
  error: null,
  transactions: [],
  fixedDeposits: [],
};

export const fetchReducer = createAsyncThunk("user/Login", async (body) => {
  const user = await fetch(userLogin(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await user.json();
});

export const getUserFromToken = createAsyncThunk("user/find", async () => {
  const token = getItemFromLocalStorage(TOKEN_KEY);
  const user = await fetch(findUserFromToken(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await user.json();
});

export const getUserBalance = createAsyncThunk("user/balance", async () => {
  const token = getItemFromLocalStorage(TOKEN_KEY);
  const user = await fetch(getUpdatedBalance(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await user.json();
});

export const signUpReducer = createAsyncThunk("user/signUp", async (body) => {
  const user = await fetch(userSignUp(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await user.json();
});

export const fetchTransaction = createAsyncThunk(
  "user/getAllTransactions",
  async () => {
    const token = getItemFromLocalStorage(TOKEN_KEY);
    const transactions = await fetch(getAllTransactions(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await transactions.json();
  }
);

export const addMoneyReducer = createAsyncThunk(
  "user/addMoney",
  async (body) => {
    const token = getItemFromLocalStorage(TOKEN_KEY);
    const user = await fetch(addMoneyToAccount(), {
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

export const updateProfileReducer = createAsyncThunk(
  "user/updateProfile",
  async (body) => {
    const token = getItemFromLocalStorage(TOKEN_KEY);
    const user = await fetch(updateUserProfile(), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    return await user.json();
  }
);

export const sendMoneyReducer = createAsyncThunk(
  "user/sendMoney",
  async (body) => {
    const token = getItemFromLocalStorage(TOKEN_KEY);
    const user = await fetch(sendMoneyToAccount(), {
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

export const createDepositReducer = createAsyncThunk(
  "user/createDeposit",
  async (body) => {
    const token = getItemFromLocalStorage(TOKEN_KEY);
    const user = await fetch(createNewDeposit(), {
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

export const getUserDeposits = createAsyncThunk("user/deposits", async () => {
  const token = getItemFromLocalStorage(TOKEN_KEY);
  const user = await fetch(getAllDeposits(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await user.json();
});

export const getCvv = createAsyncThunk("user/getCVV", async (body) => {
  const token = getItemFromLocalStorage(TOKEN_KEY);
  const cvv = await fetch(getCVV(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  return await cvv.json();
});

export const blockCard = createAsyncThunk("user/blockCard", async (body) => {
  const token = getItemFromLocalStorage(TOKEN_KEY);
  const result = await fetch(cardBlock(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  return await result.json();
});

export const unblockCard = createAsyncThunk(
  "user/unblockCard",
  async (body) => {
    const token = getItemFromLocalStorage(TOKEN_KEY);
    const result = await fetch(cardUnblock(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    return await result.json();
  }
);

export const ResetCard = createAsyncThunk("user/ResetCard", async (body) => {
  const token = getItemFromLocalStorage(TOKEN_KEY);
  const data = await fetch(newCardRequest(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  return await data.json();
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      removeItemFromLocalStorage(TOKEN_KEY);
      state.user = {};
      state.transactions = [];
      showNotifications(true, "LogOut Success", "Opps, You LoggedOut!!");
    },
    resetCVV: (state) => {
      state.user.virtualCard.CVV = null;
    },
  },
  extraReducers: (builder) => {
    // -----------login ---------------------------------
    builder.addCase(fetchReducer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchReducer.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.success) {
        state.user = action.payload.data;
        state.error = null;
        showNotifications(true, "Login Success", action.payload.message);
        addItemToLocalStorage(TOKEN_KEY, action.payload.data.token);
      } else {
        state.user = {};
        state.error = action.payload.error;
        showNotifications(false, action.payload.message, action.payload.error);
      }
    });
    builder.addCase(fetchReducer.rejected, (state, action) => {
      state.loading = false;
      state.user = {};
      state.error = action.error.message;
      showNotifications(false, "Unauthorised!!", action.error.message);
    });
    // -------------------fetch User From Token ------------------
    builder.addCase(getUserFromToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserFromToken.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.success) {
        state.user = action.payload.data;
        state.error = null;
      } else {
        state.user = {};
        state.error = action.payload.error;
        showNotifications(false, action.payload.message, action.payload.error);
        removeItemFromLocalStorage(TOKEN_KEY);
      }
    });
    builder.addCase(getUserFromToken.rejected, (state, action) => {
      state.loading = false;
      state.user = {};
      state.error = action.error.message;
      showNotifications(false, "Unauthorised!!", action.error.message);
      removeItemFromLocalStorage(TOKEN_KEY);
    });
    // ---------------------get User Updated Balance-------------
    builder.addCase(getUserBalance.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserBalance.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.success) {
        state.user.balance = action.payload.data;
        state.error = null;
      } else {
        state.error = action.payload.error;
      }
    });
    builder.addCase(getUserBalance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      showNotifications(false, "Unauthorised!!", action.error.message);
    });
    // -------------------signUp----------------------------------
    builder.addCase(signUpReducer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUpReducer.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.success) {
        state.user = action.payload.data;
        state.error = null;
        showNotifications(true, "SignUp Success", action.payload.message);
        addItemToLocalStorage(TOKEN_KEY, action.payload.data.token);
      } else {
        state.user = {};
        state.error = action.payload.error;
        showNotifications(false, action.payload.message, action.payload.error);
      }
    });
    builder.addCase(signUpReducer.rejected, (state, action) => {
      state.loading = false;
      state.user = {};
      state.error = action.error.message;
      showNotifications(false, "Unauthorised!!", action.error.message);
    });
    // ---------------------GET ALL TRANSACTIONS ---------------------------
    builder.addCase(fetchTransaction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTransaction.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.success) {
        state.transactions = action.payload.data;
        state.error = null;
      } else {
        state.transactions = [];
        state.error = action.payload.error;
        showNotifications(false, action.payload.message, action.payload.error);
      }
    });
    builder.addCase(fetchTransaction.rejected, (state, action) => {
      state.loading = false;
      state.transactions = [];
      state.error = action.error.message;
      showNotifications(
        false,
        "Unauthorised!!",
        "Please login to continue furthur"
      );
    });
    // ----------------------add Money to user Account ------------------
    builder.addCase(addMoneyReducer.pending, (state) => {
      state.loading = true;
      showNotifications(true, "Processing", "Adding money to Your account");
    });
    builder.addCase(addMoneyReducer.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.success) {
        state.user.balance = action.payload.data;
        state.error = null;
        showNotifications(true, "Done!!", "Money added succesfully");
      } else {
        state.error = action.payload.error;
        showNotifications(false, action.payload.message, action.payload.error);
      }
    });
    builder.addCase(addMoneyReducer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      showNotifications(false, "Unauthorised!!", action.error.message);
    });
    // ---------------------send money to account------------------------
    builder.addCase(sendMoneyReducer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sendMoneyReducer.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.success) {
        state.user.balance = action.payload.data;
        state.error = null;
        showNotifications(true, "Done!!", "Money transferred succesfully");
      } else {
        state.error = action.payload.error;
        showNotifications(false, action.payload.message, action.payload.error);
      }
    });
    builder.addCase(sendMoneyReducer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      showNotifications(false, "Unauthorised!!", action.error.message);
    });
    // ---------------------update User Profile ------------------------------
    builder.addCase(updateProfileReducer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProfileReducer.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.success) {
        state.user.name = action.payload.data.name;
        state.user.email = action.payload.data.email;
        state.error = null;
        showNotifications(true, "Done!!", "User Data Updated Succesfully");
      } else {
        state.error = action.payload.error;
        showNotifications(false, action.payload.message, action.payload.error);
      }
    });
    builder.addCase(updateProfileReducer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      showNotifications(false, "Unauthorised!!", action.error.message);
    });
    // -------------------------create New Deposits ---------------------
    builder.addCase(createDepositReducer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createDepositReducer.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.success) {
        state.error = null;
        state.fixedDeposits.unshift(action.payload.data);
        state.user.balance = state.user.balance - action.payload.data.amount;
        showNotifications(true, "Done!!", action.payload.message);
      } else {
        state.error = action.payload.error;
        showNotifications(false, action.payload.message, action.payload.error);
      }
    });
    builder.addCase(createDepositReducer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      showNotifications(false, "Unauthorised!!", action.error.message);
    });
    // ------------------------get Users Deposits ----------------------------
    builder.addCase(getUserDeposits.pending, (state) => {
      console.log("pending");
      state.loading = true;
    });
    builder.addCase(getUserDeposits.fulfilled, (state, action) => {
      console.log("fillfilled");
      state.loading = false;
      if (action.payload.success) {
        state.error = null;
        state.fixedDeposits = action.payload.data;
      } else {
        state.error = action.payload.error;
        showNotifications(false, action.payload.message, action.payload.error);
      }
    });
    builder.addCase(getUserDeposits.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      showNotifications(false, "Unauthorised!!", action.error.message);
    });
    // --------------------------get cvv -------------------------------------
    builder.addCase(getCvv.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCvv.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.success) {
        state.error = null;
        state.user.virtualCard.CVV = action.payload.data;
      } else {
        state.error = action.payload.error;
        showNotifications(false, action.payload.message, action.payload.error);
      }
    });
    builder.addCase(getCvv.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      showNotifications(
        false,
        "Invalid Input",
        "Please Enter you Correct Password"
      );
    });
    // -------------------------------------Bloking Card---------------------------------------------
    builder.addCase(blockCard.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(blockCard.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.success) {
        state.user.virtualCard.isActive = false;
        showNotifications(true, "Success", "Card Blocked Successfully!!");
      } else {
        state.error = action.payload.error;
        showNotifications(false, action.payload.message, action.payload.error);
      }
    });
    builder.addCase(blockCard.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      showNotifications(
        false,
        "Invalid Input",
        "Please Enter the correct Password"
      );
    });
    // -----------------------------------UnBlock The Card --------------------------------------------
    builder.addCase(unblockCard.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(unblockCard.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.success) {
        state.user.virtualCard.isActive = true;
        showNotifications(true, "Success", "Card UnBlocked Successfully!!");
      } else {
        state.error = action.payload.error;
        showNotifications(false, action.payload.message, action.payload.error);
      }
    });
    builder.addCase(unblockCard.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      showNotifications(
        false,
        "Invalid Input",
        "Please Enter the correct Password"
      );
    });
    // ----------------------------------- Creating a New Virtual Card -------------------------------------------
    builder.addCase(ResetCard.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ResetCard.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.success) {
        state.user.virtualCard = action.payload.data;
        showNotifications(
          true,
          "Card Requested Successfully",
          "Hurry you new card has been generated, Enjoy our banking facilities!!"
        );
      } else {
        state.error = action.payload.error;
        showNotifications(false, action.payload.message, action.payload.error);
      }
    });
    builder.addCase(ResetCard.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      showNotifications(false, "UnAuthorised", action.error.message);
    });
  },
});

export const { logout, resetCVV } = userSlice.actions;

export default userSlice.reducer;
