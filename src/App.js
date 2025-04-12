import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import NavBar from "./Components/NavBar/Navbar";
import SignUp from "./Components/SignUp/SignUp";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import { useSelector } from "react-redux";
import TransferMoney from "./Components/TransferMoney/TransferMoney";
import Profile from "./Components/UserProfile/Profile";
import DepositDashboard from "./Components/UserDeposits/DepositDashboard";
import CreateDeposit from "./Components/UserDeposits/CreateDeposits";
import RequestDashboard from "./Components/paymentRequest/RequestDashboard";
import CreateNewRequest from "./Components/paymentRequest/CreateNewRequest";

function App() {
  // const state = useSelector((state) => state.user);
  return (
    <div className="App">
      <ReactNotifications />
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/user/login" element={<Login />} />
        <Route exact path="/user/register" element={<SignUp />} />
        <Route exact path="/user/dashboard" element={<Dashboard />} />
        <Route exact path="/user/transferMoney" element={<TransferMoney />} />
        <Route exact path="/user/profile" element={<Profile />} />
        <Route exact path="/user/deposits" element={<DepositDashboard />} />
        <Route exact path="/user/Createdeposit" element={<CreateDeposit />} />
        <Route exact path="/user/requests" element={<RequestDashboard />} />
        <Route
          exact
          path="/user/createRequest"
          element={<CreateNewRequest />}
        />
      </Routes>
    </div>
  );
}

export default App;
