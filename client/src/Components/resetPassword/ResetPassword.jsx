// components/ResetPassword.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { postAxiosCall } from "../../Axios/UniversalAxiosCalls";
import loginbkg from "../../assets/Images/Loginbkg.webp";
import { Button, Input } from "antd";
import Swal from "sweetalert2";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const NavigateTo = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire({
        title: "Error",
        text: "Passwords do not match",
        icon: "error",
        confirmButtonText: "Alright!",
        allowOutsideClick: false,
      });
      return;
    }
    if (!password || !confirmPassword) {
      Swal.fire({
        title: "Error",
        text: "Please fill in password and confirm Password",
        icon: "error",
        confirmButtonText: "Alright!",
        allowOutsideClick: false,
      });
      return;
    }
    try {
      const response = await postAxiosCall("/resetPassword", {
        resetToken: token,
        newPassword: password,
      });

      if (response) {
        Swal.fire({
          title: "Error",
          text: response?.message,
          icon: "success",
          confirmButtonText: "Alright!",
          allowOutsideClick: false,
        }).then(() => {
          NavigateTo("/");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error?.message,
        icon: "error",
        confirmButtonText: "Alright!",
        allowOutsideClick: false,
      });
    }
  };

  return (
    <div
      className="bg-cover h-screen"
      style={{ backgroundImage: `url(${loginbkg})` }}
    >
      <div className="flex flex-row justify-end align-middle items-center w-full h-screen px-80">
        <div className="card bg-cyan-400">
          <div className="flex flex-col justify-center items-center">
            <div className="text-3xl mb-4 font-semibold">Change Password</div>
            <div className="credentials card shadow-lg w-96 ">
              <div className="uName my-4">
                <div className="password my-4">
                  <div className="text-xl my-2 font-medium">New Password</div>
                  <Input
                    placeholder="Password"
                    type="password"
                    size="large"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="password my-4">
                  <div className="text-xl my-2 font-medium">
                    Confirm Password
                  </div>
                  <Input
                    placeholder="Password"
                    type="password"
                    size="large"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="flex justify-center items-center flex-row">
                  <Button
                    type="primary"
                    className="text-black"
                    size="large"
                    onClick={handleSubmit}
                  >
                    Change Password
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
