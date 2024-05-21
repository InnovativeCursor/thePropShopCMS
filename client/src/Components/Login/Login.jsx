import { Button, Input } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { postAxiosCall } from "../../Axios/UniversalAxiosCalls";
import CryptoJS from "crypto-js";
import logo from "../../assets/Images/propshop.svg"; // Adjust the path to your logo file
import background from "../../assets/Images/background.jpg"; // Adjust the path to your background image

function Login(props) {
  const navigateTo = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const onRegister = async () => {
    navigateTo("/resetpassword");
  };

  const onLogin = async () => {
    try {
      const encryptedEmail = CryptoJS.AES.encrypt(
        email,
        process.env.REACT_APP_ENCRYPTION
      ).toString();
      const encryptedPassword = CryptoJS.AES.encrypt(
        password,
        process.env.REACT_APP_ENCRYPTION
      ).toString();
      const answer = await postAxiosCall("/login", {
        encryptedEmail,
        encryptedPassword,
      });
      if (answer) {
        localStorage.setItem("access_token", answer?.token);
        props.isLoggedIn(answer?.sendUserInfo);
        navigateTo("/home");
      } else {
        console.error("Login error");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "Alright!",
        allowOutsideClick: false,
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url(${background})`, // Add your background image URL here
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
          Login
        </div>
        <div
          className="credentials card shadow-lg"
          style={{ border: "none", boxShadow: "none" }}
        >
          <div className="uName my-4">
            <div
              className="text-xl w-full my-2 font-medium"
              style={{ textAlign: "left", color: "#000" }}
            >
              Email
            </div>
            <Input
              placeholder="Email"
              type="text"
              size="large"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              style={{ borderRadius: "4px" }}
            />
          </div>
          <div className="password my-4">
            <div
              className="text-xl my-2 font-medium"
              style={{ textAlign: "left", color: "#000" }}
            >
              Password
            </div>
            <Input
              placeholder="Password"
              type="password"
              size="large"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              style={{ borderRadius: "4px" }}
            />
          </div>
          <div className="flex justify-around items-center flex-row mt-6">
            <Button
              type="primary"
              className="text-black"
              size="large"
              onClick={onLogin}
              style={{
                width: "45%",
                borderRadius: "4px",
                backgroundColor: "#000",
                borderColor: "#000",
                color: "white",
              }}
            >
              Login
            </Button>
            <Button
              type="dashed"
              size="large"
              onClick={onRegister}
              style={{
                width: "45%",
                borderRadius: "4px",
                color: "#000",
                borderColor: "#000",
              }}
            >
              Forgot Password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    isLoggedIn: (sendUserInfo) =>
      dispatch({ type: "LOGGEDIN", payload: sendUserInfo }),
  };
};

export default connect(null, mapDispatchToProps)(Login);
