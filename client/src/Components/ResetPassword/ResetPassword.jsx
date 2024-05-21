import { Button, Input } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../../assets/Images/propshop.svg";
import background from "../../assets/Images/background.jpg";

function ResetPassword(props) {
  const navigateTo = useNavigate();
  const [email, setEmail] = useState("");

  const goToLogin = () => {
    navigateTo("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url(${background})`, // Updated to use backticks and template literals
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "80%",
          maxWidth: "500px",
          padding: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Background color with opacity for glass effect
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img src={logo} alt="Logo" style={{ width: "150px" }} />
        </div>
        <div
          className="text-3xl mb-4 font-semibold"
          style={{ textAlign: "center", color: "#000" }}
        >
          Reset Password
        </div>
        <div
          className="credentials card shadow-lg"
          style={{ border: "none", boxShadow: "none" }}
        >
          <div className="FName my-4">
            <div
              className="text-xl w-full my-2 font-medium"
              style={{ textAlign: "left", color: "#000" }}
            >
              Enter Email
            </div>
            <Input
              placeholder="Email"
              type="text"
              size="large"
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderRadius: "4px" }}
            />
          </div>

          <div className="flex justify-around items-center flex-row">
            <Button type="primary" className="text-black" size="large">
              Send OTP
            </Button>
            <Button type="dashed" size="large" onClick={goToLogin}>
              Go To Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  isLoggedIn: (sendUserInfo) =>
    dispatch({ type: "LOGGEDIN", payload: sendUserInfo }),
});

export default connect(null, mapDispatchToProps)(ResetPassword);
