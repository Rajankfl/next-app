"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
function profilePage() {
  const router = useRouter();
  const [data, setData] = React.useState("");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successful");
      router.push("/login");
    } catch (error: any) {
      console.log("Logout Unsuccessful", error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/userinfo");
      const id = res.data.data._id;
      console.log(id);
      setData(id);
    } catch (error: any) {
      console.log("Unable to get user details", error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2 className="p-1 rounded bg-green-500  ">
        {data === "" ? (
          "No data"
        ) : (
          <Link href={`/profile/${data}`}>Get Data</Link>
        )}
      </h2>
      <hr />
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={logout}
      >
        Logout
      </button>
      <button
        className="bg-green-600 mt-4 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
        onClick={getUserDetails}
      >
        Get user details
      </button>
    </div>
  );
}

export default profilePage;
