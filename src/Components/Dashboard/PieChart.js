import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart() {
  const user = useSelector((state) => state.user.user);

  let data = {
    labels: ["Balance", "Loan Amount"],
    datasets: [
      {
        label: "Loan Details",
        data: [user.balance, user.loanAmount],
        backgroundColor: ["#c24d2c", "#a7bcb9"],
        borderColor: ["#fcff82", "#f8b400"],
        borderWidth: 2,
      },
    ],
  };

  return <Pie data={data} />;
}
