export const TOKEN_KEY = "token";

export const userLogin = () => {
  return "/user/login";
};

export const userSignUp = () => {
  return "/user/register";
};

export const getAllTransactions = () => {
  return "/user/getAllTransactions";
};

export const addMoneyToAccount = () => {
  return "/user/addMoney";
};

export const sendMoneyToAccount = () => {
  return "/user/transferMoney";
};

export const findUserFromToken = () => {
  return "/user/find";
};

export const updateUserProfile = () => {
  return "/user/updateProfile";
};

export const createNewDeposit = () => {
  return "/user/createNewDeposit";
};

export const getAllDeposits = () => {
  return "/user/deposits";
};

export const createNewRequest = () => {
  return "/user/createNewPaymentRequest";
};

export const getUserRequests = () => {
  return "/user/getRequestByUser";
};

export const getFriendsRequest = () => {
  return "/user/getRequestFromOtherUsers";
};

export const deleteUrl = (id) => {
  return `/user/deleteRequest/${id}`;
};

export const rejectRequestUrl = (id) => {
  return `/user/rejectRequest/${id}`;
};

export const acceptPayment = () => {
  return "/user/acceptPayment";
};

export const getUpdatedBalance = () => {
  return "/user/balance";
};

export const getCVV = () => {
  return "/user/card/getCVV";
};

export const cardBlock = () => {
  return "/user/card/blockCard";
};

export const cardUnblock = () => {
  return "/user/card/unblockCard";
};

export const newCardRequest = () => {
  return "/user/card/newCardRequest";
};
