import "react-notifications-component/dist/theme.css";
import { Store } from "react-notifications-component";

export const addItemToLocalStorage = (key, token) => {
  localStorage.setItem(key, token);
};

export const getItemFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};

export const removeItemFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const convertDateToLocaleString = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString();
};
export const showNotifications = (type, title, message) => {
  return Store.addNotification({
    title: title,
    message: message,
    type: type ? "success" : "warning",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
  });
};

export const calculatePercentageDaysLeft = (startDate, endDate) => {
  const currentDate = new Date();
  const firstDate = new Date(startDate);
  const lastDate = new Date(endDate);
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

  const diffDays = Math.round(Math.abs((currentDate - firstDate) / oneDay));
  const TotalDays = Math.round(Math.abs((lastDate - firstDate) / oneDay));
  console.log(diffDays, TotalDays);

  return (diffDays / TotalDays) * 100;
};

export const showVirtualCardNo = (cardNo) => {
  const card = [];
  for (let i = 0; i < cardNo.length; i += 4) {
    card.push(cardNo.substring(i, i + 4));
  }

  return card.join(" ");
};
