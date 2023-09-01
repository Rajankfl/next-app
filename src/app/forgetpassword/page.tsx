"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
function page() {
  const [email, setEmail] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const getResetMail = await axios.post(
        "/api/users/request-password-reset",
        { email }
      );

      if (!getResetMail) {
        toast.error("Failed to send reset email");
      }

      console.log(getResetMail);
      toast.success(getResetMail.data.message);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="bg-red-500 p-2 text-2xl text-white rounded">
        {loading ? "Processing" : "Forget Password"}
      </h1>
      <hr />
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="text"
        id="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Email"
      />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-green-500 hover:bg-green-800 hover:text-white"
        onClick={onSubmit}
        disabled={buttonDisabled}
      >
        {buttonDisabled ? "No Sent Mail" : "Sent Mail"}
      </button>
    </div>
  );
}

export default page;
