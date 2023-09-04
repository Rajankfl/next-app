"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

function page({ params }: any) {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const onReset = async () => {
    try {
      if (password.confirmPassword === password.newPassword) {
        console.log(token);
        setLoading(true);
        const res = await axios.post("/api/users/forgetpassword", {
          token,
          password: password.newPassword,
        });

        if (!res) {
          toast.error("Failed to reset password");
        }
        console.log(res);
        toast.success(res.data.message);
        router.push("/login");
      } else {
        toast.error("Password aren't matching, Enter same password");
      }
    } catch (error: any) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      password.confirmPassword.length > 0 &&
      password.newPassword.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [password]);

  useEffect(() => {
    if (!token) {
      setToken(params.token);
      console.log("tpken added");
    }
    console.log(params.token);
  }, []);
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="bg-red-500 p-2 text-2xl text-white rounded">
          {loading ? "Processing" : "Reset Password"}
        </h1>
        <hr />
        <label htmlFor="password">New Password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          type="password"
          id="email"
          value={password.newPassword}
          onChange={(e) => {
            setPassword({ ...password, newPassword: e.target.value });
          }}
          placeholder="Password"
        />
        <label htmlFor="cpassword">Confirm Password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          type="password"
          id="email"
          value={password.confirmPassword}
          onChange={(e) => {
            setPassword({ ...password, confirmPassword: e.target.value });
          }}
          placeholder="Confirm Password"
        />
        <button
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-green-500 hover:bg-green-800 hover:text-white"
          onClick={onReset}
          disabled={buttonDisabled}
        >
          {buttonDisabled ? "No Reset Password" : "Reset Password"}
        </button>
      </div>
    </div>
  );
}

export default page;
