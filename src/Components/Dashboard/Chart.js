import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getUserDeposits } from "../../reducers/userSlice";
// import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  options: {
    transitions: {
      show: {
        animations: {
          x: {
            from: 0,
          },
          y: {
            from: 0,
          },
        },
      },
      hide: {
        animations: {
          x: {
            to: 0,
          },
          y: {
            to: 0,
          },
        },
      },
    },
  },
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Account Summary",
    },
  },
};

const labels = ["Balance", "Fixed_Deposits"];

export function Chart() {
  const state = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!state.user.name) {
      return navigate("/user/login");
    }
    dispatch(getUserDeposits());
  }, [state.user]);

  const data = {
    labels,
    datasets: [
      {
        label: "Account Details",
        data: {
          Balance: state.user.balance,
          Fixed_Deposits: state.fixedDeposits.reduce(
            (acc, deposit) => acc + deposit.amount,
            0
          ),
        },
        backgroundColor: ["#2B43BE", "#A9B612"],
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
